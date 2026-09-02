import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, X } from "lucide-react";
import { Holo, HoloButton, SectionLabel } from "@/components/holo";
import { LinkedText } from "@/components/term";
import { neighborsOf, NODE_MAP, TYPE_LABEL, TYPE_TINT, VERIFY_HINT, VERIFY_LABEL, VERIFY_TINT } from "@/lib/graph-data";
import { useEco } from "@/lib/store";

function pickVoice(synth: SpeechSynthesis): SpeechSynthesisVoice | undefined {
  const voices = synth.getVoices();
  const score = (v: SpeechSynthesisVoice) => {
    const n = `${v.name} ${v.lang}`.toLowerCase();
    if ((n.includes("google") || n.includes("natural") || n.includes("neural")) && n.includes("es")) return 12;
    if (n.includes("microsoft") && /helena|elvira|sabina|pablo|álvaro|alvaro/.test(n)) return 10;
    if (/paulina|mónica|monica|jorge|juan|lucia|lucía/.test(n)) return 9;
    if (v.lang.toLowerCase().startsWith("es-es")) return 7;
    if (v.lang.toLowerCase().startsWith("es")) return 5;
    return 0;
  };
  return [...voices].sort((a, b) => score(b) - score(a))[0];
}

function phrasesOf(parts: string[]): string[] {
  const out: string[] = [];
  for (const part of parts) {
    const text = part.trim();
    if (!text) continue;
    const bits = text
      .split(/(?<=[.!?…])\s+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 1);
    if (!bits.length) {
      out.push(text);
      continue;
    }
    let buf = "";
    for (const bit of bits) {
      if (buf && buf.length + bit.length > 280) {
        out.push(buf);
        buf = bit;
      } else {
        buf = buf ? `${buf} ${bit}` : bit;
      }
    }
    if (buf) out.push(buf);
  }
  return out;
}

function speakNow(
  synth: SpeechSynthesis,
  phrases: string[],
  onDone: () => void,
) {
  synth.cancel();
  const voice = pickVoice(synth);
  const last = phrases.length - 1;
  phrases.forEach((text, i) => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = voice?.lang || "es-ES";
    if (voice) u.voice = voice;
    u.rate = 0.94;
    u.pitch = 0.98;
    u.volume = 1;
    if (i === last) {
      u.onend = onDone;
      u.onerror = onDone;
    }
    synth.speak(u);
  });
  try {
    synth.resume();
  } catch {
    /* ignore */
  }
}

export function NodePanel() {
  const selectedId = useEco((s) => s.selectedId);
  const select = useEco((s) => s.select);
  const node = selectedId ? NODE_MAP[selectedId] : null;
  const [speaking, setSpeaking] = useState(false);
  const run = useRef({ cancelled: false });

  const stop = () => {
    run.current.cancelled = true;
    window.speechSynthesis?.cancel();
    setSpeaking(false);
  };

  useEffect(() => {
    stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  useEffect(() => {
    return () => {
      run.current.cancelled = true;
      window.speechSynthesis?.cancel();
    };
  }, []);

  if (!node) return null;

  const neighbors = neighborsOf(node.id);
  const tint = TYPE_TINT[node.type];

  const speak = () => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    if (speaking) {
      stop();
      return;
    }
    run.current = { cancelled: false };
    const intro = [node.name, TYPE_LABEL[node.type], node.platform ? `Plataforma: ${node.platform}` : ""]
      .filter(Boolean)
      .join(". ");
    const phrases = phrasesOf([intro, node.funcion, node.importancia, node.arquitectura]);
    if (!phrases.length) return;
    setSpeaking(true);
    speakNow(synth, phrases, () => {
      if (!run.current.cancelled) setSpeaking(false);
    });
  };

  return (
    <Holo
      strong
      data-testid="ficha"
      className="pointer-events-auto absolute inset-x-3 bottom-32 z-40 flex max-h-[62dvh] w-auto flex-col overflow-hidden p-0 md:inset-x-auto md:bottom-8 md:right-24 md:max-h-[72dvh] md:w-[22rem]"
    >
      <div className="flex items-start justify-between gap-3 px-4 pt-4">
        <div>
          <SectionLabel>Información del nodo</SectionLabel>
          <h2 className="mt-1 text-lg font-medium leading-tight text-ink">{node.name}</h2>
        </div>
        <button
          type="button"
          aria-label="Cerrar ficha"
          onClick={() => select(null)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-muted hover:text-ink"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="hud-scroll min-h-0 flex-1 px-4">
        <dl className="mt-3 grid grid-cols-[7.5rem_1fr] gap-x-3 gap-y-1.5 text-sm">
          <dt className="text-muted">Círculo</dt>
          <dd className="flex items-center gap-2 font-medium text-ink">
            <span className="inline-block h-2 w-2 rounded-full" style={{ background: tint }} />
            <LinkedText text={node.community} />
          </dd>
          {node.platform ? (
            <>
              <dt className="text-muted">Plataforma</dt>
              <dd className="text-ink">
                <LinkedText text={node.platform} />
              </dd>
            </>
          ) : null}
          <dt className="text-muted">Verificación</dt>
          <dd className="flex items-center gap-2 text-ink">
            <span className="inline-block h-2 w-2 rounded-full" style={{ background: VERIFY_TINT[node.verify] }} />
            {VERIFY_LABEL[node.verify]}
          </dd>
        </dl>

        <p className="mt-2 text-xs leading-relaxed text-muted">
          <LinkedText text={VERIFY_HINT[node.verify]} />
        </p>

        <div className="mt-3 space-y-2.5">
          <div>
            <SectionLabel>Función</SectionLabel>
            <p className="mt-1 text-sm leading-relaxed text-ink/85">
              <LinkedText text={node.funcion} />
            </p>
          </div>
          <div>
            <SectionLabel>Por qué importa</SectionLabel>
            <p className="mt-1 text-sm leading-relaxed text-ink/85">
              <LinkedText text={node.importancia} />
            </p>
          </div>
          {node.arquitectura ? (
            <div>
              <SectionLabel>Arquitectura operativa</SectionLabel>
              <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-ink/85">
                <LinkedText text={node.arquitectura} />
              </p>
            </div>
          ) : null}
        </div>

        <div className="mt-3 pb-1">
          <SectionLabel>Vecinos</SectionLabel>
          <ul className="mt-2 flex flex-col gap-1">
            {neighbors.map((n) => (
              <li key={n.id}>
                <button
                  type="button"
                  onClick={() => select(n.id)}
                  className="flex min-h-11 w-full items-center gap-2 rounded-md px-2 text-left text-sm text-ink hover:bg-fog/60"
                >
                  <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: n.color }} />
                  <span className="truncate">{n.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 px-4 py-3">
        <HoloButton onClick={speak} className="min-h-11 flex-1 text-sm">
          {speaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          {speaking ? "Silenciar" : "Leer en voz alta"}
        </HoloButton>
      </div>
    </Holo>
  );
}
