import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, X } from "lucide-react";
import { Holo, HoloButton, SectionLabel } from "@/components/holo";
import { LinkedText } from "@/components/term";
import {
  neighborsOf,
  NODE_MAP,
  TYPE_LABEL,
  TYPE_TINT,
  VERIFY_HINT,
  VERIFY_LABEL,
  VERIFY_TINT,
  type GraphNode,
} from "@/lib/graph-data";
import { useEco } from "@/lib/store";

let cachedVoice: SpeechSynthesisVoice | undefined;

function pickVoice(synth: SpeechSynthesis): SpeechSynthesisVoice | undefined {
  if (cachedVoice) return cachedVoice;
  const voices = synth.getVoices();
  if (!voices.length) return undefined;
  const score = (v: SpeechSynthesisVoice) => {
    const n = `${v.name} ${v.lang}`.toLowerCase();
    if ((n.includes("google") || n.includes("natural") || n.includes("neural")) && n.includes("es")) return 12;
    if (n.includes("microsoft") && /helena|elvira|sabina|pablo|álvaro|alvaro/.test(n)) return 10;
    if (/paulina|mónica|monica|jorge|juan|lucia|lucía/.test(n)) return 9;
    if (v.lang.toLowerCase().startsWith("es-es")) return 7;
    if (v.lang.toLowerCase().startsWith("es")) return 5;
    return 0;
  };
  cachedVoice = [...voices].sort((a, b) => score(b) - score(a))[0];
  return cachedVoice;
}

if (typeof window !== "undefined" && window.speechSynthesis) {
  pickVoice(window.speechSynthesis);
  window.speechSynthesis.addEventListener("voiceschanged", () => {
    cachedVoice = undefined;
    pickVoice(window.speechSynthesis);
  });
}

function spokenOf(node: GraphNode): string {
  const circle = TYPE_LABEL[node.type];
  const parts = [`${node.name}.`, `${circle}.`];
  if (node.platform) parts.push(`Está en ${node.platform}.`);
  parts.push(node.funcion.trim());
  parts.push(node.importancia.trim());
  return parts
    .join(" ")
    .replace(/\bSNC\b/g, "sistema nervioso central")
    .replace(/\s+,/g, ",")
    .replace(/\s+\./g, ".")
    .replace(/\.\s*\./g, ".")
    .replace(/\s+/g, " ")
    .trim();
}

function speakNow(synth: SpeechSynthesis, text: string, onDone: () => void) {
  synth.cancel();
  const voice = pickVoice(synth);
  const u = new SpeechSynthesisUtterance(text);
  u.lang = voice?.lang || "es-ES";
  if (voice) u.voice = voice;
  u.rate = 1;
  u.pitch = 1.04;
  u.volume = 1;
  u.onend = onDone;
  u.onerror = onDone;
  synth.speak(u);
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
  const lastSpeak = useRef(0);

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
    const now = performance.now();
    if (now - lastSpeak.current < 280) return;
    lastSpeak.current = now;
    const synth = window.speechSynthesis;
    if (!synth) return;
    if (speaking) {
      stop();
      return;
    }
    const text = spokenOf(node);
    if (!text) return;
    run.current = { cancelled: false };
    setSpeaking(true);
    speakNow(synth, text, () => {
      if (!run.current.cancelled) setSpeaking(false);
    });
  };

  return (
    <Holo
      strong
      data-testid="ficha"
      className="pointer-events-auto absolute inset-x-3 bottom-32 z-40 flex max-h-[46dvh] w-auto flex-col overflow-hidden p-0 md:inset-x-auto md:bottom-8 md:right-24 md:w-[22rem]"
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
        <HoloButton
          onPointerDown={(e) => {
            e.preventDefault();
            speak();
          }}
          className="min-h-11 flex-1 text-sm"
        >
          {speaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          {speaking ? "Silenciar" : "Leer en voz alta"}
        </HoloButton>
      </div>
    </Holo>
  );
}
