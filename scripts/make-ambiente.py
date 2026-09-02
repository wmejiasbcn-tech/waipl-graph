#!/usr/bin/env python3
"""Original seamless ambient bed: quiet new-age pads, sparse flute, distant pulse."""

from __future__ import annotations

import math
from pathlib import Path

import numpy as np

SR = 44100
DUR = 240.0
FADE = 10.0
N = int(SR * DUR)
EXTRA = int(SR * FADE)
TOTAL = N + EXTRA


def midi_hz(m: float) -> float:
    return 440.0 * (2.0 ** ((m - 69.0) / 12.0))


def cents(freq: float, c: float) -> float:
    return freq * (2.0 ** (c / 1200.0))


def time_axis(n: int) -> np.ndarray:
    return np.arange(n, dtype=np.float64) / SR


def sine(freq: float | np.ndarray, n: int, phase: float = 0.0) -> np.ndarray:
    t = time_axis(n)
    if np.isscalar(freq):
        return np.sin(2.0 * math.pi * float(freq) * t + phase)
    phase_acc = np.cumsum(2.0 * math.pi * np.asarray(freq, dtype=np.float64) / SR)
    return np.sin(phase_acc + phase)


def smoothstep(x: np.ndarray) -> np.ndarray:
    x = np.clip(x, 0.0, 1.0)
    return x * x * (3.0 - 2.0 * x)


def gate(n: int, start: float, end: float, fade: float) -> np.ndarray:
    t = time_axis(n)
    a = smoothstep((t - start) / max(fade, 1e-6))
    b = smoothstep((end - t) / max(fade, 1e-6))
    return a * b


def adsr(n: int, attack: float, decay: float, sustain: float, release: float, hold: float) -> np.ndarray:
    t = time_axis(n)
    env = np.zeros(n, dtype=np.float64)
    a_end = attack
    d_end = attack + decay
    s_end = attack + decay + hold
    r_end = s_end + release
    env += np.clip(t / max(attack, 1e-6), 0.0, 1.0) * (t < a_end)
    dec = 1.0 + (sustain - 1.0) * np.clip((t - a_end) / max(decay, 1e-6), 0.0, 1.0)
    env += dec * ((t >= a_end) & (t < d_end))
    env += sustain * ((t >= d_end) & (t < s_end))
    rel = sustain * (1.0 - np.clip((t - s_end) / max(release, 1e-6), 0.0, 1.0))
    env += rel * ((t >= s_end) & (t < r_end))
    return env


def fft_filter(x: np.ndarray, cutoff: float, order: int = 4, kind: str = "lp") -> np.ndarray:
    spec = np.fft.rfft(x)
    freqs = np.fft.rfftfreq(x.size, 1.0 / SR)
    ratio = np.maximum(freqs, 1e-6) / max(cutoff, 1.0)
    if kind == "lp":
        h = 1.0 / (1.0 + ratio ** order)
    else:
        h = 1.0 / (1.0 + (1.0 / ratio) ** order)
    y = np.fft.irfft(spec * h, n=x.size)
    return y.astype(np.float64)


def fft_convolve(x: np.ndarray, ir: np.ndarray) -> np.ndarray:
    n = x.size + ir.size - 1
    nfft = 1 << (n - 1).bit_length()
    y = np.fft.irfft(np.fft.rfft(x, nfft) * np.fft.rfft(ir, nfft), nfft)
    return y[: x.size]


def choir_tone(freq: float, n: int, rng: np.random.Generator) -> np.ndarray:
    sig = np.zeros(n, dtype=np.float64)
    for det, amp in ((-8.0, 0.38), (0.0, 0.55), (11.0, 0.32), (19.0, 0.12)):
        f = cents(freq, det + float(rng.normal(0, 0.4)))
        sig += amp * sine(f, n, phase=float(rng.uniform(0, 2 * math.pi)))
        sig += amp * 0.22 * sine(f * 2.0, n, phase=float(rng.uniform(0, 2 * math.pi)))
        sig += amp * 0.07 * sine(f * 3.0, n, phase=float(rng.uniform(0, 2 * math.pi)))
    # Slow vocal-like shimmer, not a tide.
    t = time_axis(n)
    shimmer = 0.86 + 0.14 * np.sin(2.0 * math.pi * t / 13.7 + freq * 0.01)
    return fft_filter(sig * shimmer, 2400.0, order=3)


def flute_note(freq: float, dur: float, rng: np.random.Generator) -> np.ndarray:
    n = int(SR * dur)
    t = time_axis(n)
    vib = 1.0 + 0.0028 * np.sin(2.0 * math.pi * 4.8 * t)
    tone = sine(freq * vib, n)
    tone += 0.18 * sine(freq * 2.0 * vib, n, phase=0.4)
    tone += 0.05 * sine(freq * 3.0, n, phase=1.1)
    breath = fft_filter(rng.standard_normal(n), 1800.0) * 0.06
    env = adsr(n, 0.09, 0.18, 0.72, min(0.85, dur * 0.35), max(0.05, dur - 1.12))
    return (tone + breath) * env


def harp_pluck(freq: float, dur: float, rng: np.random.Generator) -> np.ndarray:
    n = int(SR * dur)
    t = time_axis(n)
    decay = np.exp(-t * 2.4)
    click = fft_filter(rng.standard_normal(n), 4200.0) * np.exp(-t * 28.0) * 0.08
    body = sine(freq, n) * decay
    body += 0.35 * sine(freq * 2.0, n) * np.exp(-t * 3.2)
    body += 0.12 * sine(freq * 3.0, n) * np.exp(-t * 4.5)
    return (body + click) * 0.9


def drum_hit(rng: np.random.Generator) -> np.ndarray:
    n = int(SR * 0.9)
    t = time_axis(n)
    thump = np.sin(2.0 * math.pi * 62.0 * t) * np.exp(-t * 7.5)
    thump += 0.35 * np.sin(2.0 * math.pi * 96.0 * t) * np.exp(-t * 9.0)
    skin = fft_filter(rng.standard_normal(n), 900.0) * np.exp(-t * 18.0) * 0.22
    return (thump + skin) * 0.55


def shaker_grain(n: int, rng: np.random.Generator, density: np.ndarray) -> np.ndarray:
    noise = rng.standard_normal(n)
    band = fft_filter(fft_filter(noise, 6000.0, kind="lp"), 2500.0, kind="hp")
    return band * density


def place(dest: np.ndarray, src: np.ndarray, at: float) -> None:
    i = int(at * SR)
    if i >= dest.size:
        return
    j = min(src.size, dest.size - i)
    dest[i : i + j] += src[:j]


def reverb_ir(rng: np.random.Generator, seconds: float, decay: float, cutoff: float) -> np.ndarray:
    n = int(SR * seconds)
    t = time_axis(n)
    ir = rng.standard_normal(n) * np.exp(-t / decay)
    ir[0] = 0.0
    return fft_filter(ir, cutoff, order=2)


def main() -> None:
    n = TOTAL
    rng = np.random.default_rng(1971)
    t = time_axis(n)
    left = np.zeros(n, dtype=np.float64)
    right = np.zeros(n, dtype=np.float64)

    # --- drone (always) ---
    drone_env = 0.55 + 0.45 * (0.5 + 0.5 * np.sin(2.0 * math.pi * t / 37.0))
    for midi, amp, pan in ((38, 0.16, 0.0), (45, 0.11, -0.15), (50, 0.09, 0.15)):
        tone = choir_tone(midi_hz(midi), n, rng) * amp * drone_env
        left += tone * (0.72 - pan)
        right += tone * (0.72 + pan)

    # --- evolving pads ---
    chords = [
        (0.0, 48.0, [50, 53, 57, 60, 64]),      # Dm9
        (40.0, 88.0, [53, 57, 60, 65]),         # F
        (80.0, 128.0, [57, 60, 64, 67]),        # Am7
        (120.0, 168.0, [48, 52, 55, 62]),       # Cadd9
        (160.0, 208.0, [55, 60, 62, 67]),       # Gsus
        (196.0, DUR + FADE, [50, 53, 57, 60, 64]),  # Dm9 return
    ]
    for start, end, notes in chords:
        g = gate(n, start, end, 9.0)
        for i, m in enumerate(notes):
            pan = -0.28 + 0.14 * (i % 5)
            tone = choir_tone(midi_hz(m), n, rng) * (0.085 if m > 60 else 0.11) * g
            left += tone * (0.7 - pan)
            right += tone * (0.7 + pan)

    # air harmonic
    air = sine(midi_hz(86), n) * (0.012 + 0.008 * np.sin(2.0 * math.pi * t / 23.0))
    air = fft_filter(air, 3500.0) * gate(n, 8.0, DUR + FADE - 6.0, 12.0)
    left += air * 0.85
    right += air * 1.0

    # --- sparse harp ---
    harp_notes = [
        (22.0, 62), (24.6, 69), (27.4, 74), (31.0, 67), (34.8, 72),
        (38.5, 69), (42.0, 62), (64.0, 67), (67.2, 72), (71.0, 74),
        (186.0, 62), (189.0, 67), (192.4, 72), (196.0, 69), (200.5, 74),
        (205.0, 67), (210.0, 62),
    ]
    harp_l = np.zeros(n)
    harp_r = np.zeros(n)
    for at, m in harp_notes:
        pluck = harp_pluck(midi_hz(m), 2.8, rng) * 0.11
        place(harp_l if m % 2 == 0 else harp_r, pluck, at)
        place(harp_r if m % 2 == 0 else harp_l, pluck * 0.55, at)
    left += harp_l
    right += harp_r

    # --- flute phrases (space between them) ---
    flute_l = np.zeros(n)
    flute_r = np.zeros(n)
    phrases = [
        # descending sigh
        (50.0, [(74, 2.4), (69, 2.2), (67, 3.1), (64, 2.0), (62, 4.6)]),
        (72.5, [(69, 2.0), (72, 2.2), (74, 3.4), (69, 5.2)]),
        # later, higher, different contour
        (126.0, [(65, 2.0), (67, 2.1), (69, 3.0), (72, 2.2), (74, 4.4)]),
        (146.0, [(72, 2.0), (69, 2.4), (67, 3.2), (65, 2.0), (62, 5.0)]),
    ]
    for start, notes in phrases:
        cursor = start
        for m, dur in notes:
            note = flute_note(midi_hz(m), dur + 0.35, rng) * 0.13
            place(flute_l, note, cursor)
            place(flute_r, note * 0.92, cursor + 0.012)
            cursor += dur
    left += flute_l
    right += flute_r

    # --- distant tribal pulse (one section only, felt more than heard) ---
    pulse = np.zeros(n)
    for at in (158.0, 166.8, 175.6, 184.4, 193.2, 202.0):
        place(pulse, drum_hit(rng) * 0.045, at)
    pulse *= gate(n, 150.0, 214.0, 8.0)
    left += pulse * 0.95
    right += pulse * 1.05

    # soft shaker dust in the same window
    dust_env = gate(n, 154.0, 208.0, 10.0) * (0.012 + 0.01 * (0.5 + 0.5 * np.sin(2.0 * math.pi * t * 1.4)))
    dust = shaker_grain(n, rng, dust_env)
    left += dust * 0.9
    right += dust * 1.1

    # --- space ---
    ir_l = reverb_ir(rng, 3.4, 1.85, 4200.0)
    ir_r = reverb_ir(rng, 3.5, 1.95, 3900.0)
    wet_l = fft_convolve(left, ir_l)
    wet_r = fft_convolve(right, ir_r)
    dry = 0.62
    wet = 0.48
    left = dry * left + wet * wet_l
    right = dry * right + wet * wet_r

    stereo = np.stack([left, right], axis=1)

    # seamless loop
    fade = EXTRA
    w = np.sin(np.linspace(0.0, math.pi / 2.0, fade)) ** 2
    head = stereo[:fade]
    tail = stereo[N : N + fade]
    stereo[N : N + fade] = tail * (1.0 - w)[:, None] + head * w[:, None]
    out = stereo[:N].copy()
    out[:fade] = stereo[N : N + fade]

    # keep it quiet — accompaniment, not a performance
    peak = float(np.max(np.abs(out))) or 1.0
    out = (out / peak) * 0.42

    windows = 12
    step = N // windows
    rms = [float(np.sqrt(np.mean(out[i * step : (i + 1) * step] ** 2))) for i in range(windows)]

    pcm = np.clip(out * 32767.0, -32767, 32767).astype(np.int16)
    wav_path = Path("/tmp/waipl-audio/ambiente.wav")
    wav_path.parent.mkdir(parents=True, exist_ok=True)
    import wave

    with wave.open(str(wav_path), "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(pcm.tobytes())
    print(f"wrote {wav_path} peak={peak:.3f} dur={N / SR:.1f}s rms={['%.3f' % r for r in rms]}")


if __name__ == "__main__":
    main()
