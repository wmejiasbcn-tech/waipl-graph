import { Seal } from "@/components/seal";
import { HoloButton } from "@/components/holo";
import { HistoryNav } from "@/components/history-nav";
import { SoundToggle } from "@/components/ambient";
import { useEco } from "@/lib/store";

function unlockSpeech() {
  try {
    const s = window.speechSynthesis;
    if (!s) return;
    s.getVoices();
    const u = new SpeechSynthesisUtterance(" ");
    u.volume = 0;
    s.speak(u);
    s.cancel();
  } catch {
    /* ignore */
  }
}

function goIn() {
  if (useEco.getState().entered) return;
  unlockSpeech();
  useEco.getState().enter({ view: "mapa" });
}

export function PortalView() {
  const entered = useEco((s) => s.entered);
  const cursor = useEco((s) => s.cursor);
  const stackLen = useEco((s) => s.stack.length);
  const showHistory = !entered && (cursor > 0 || cursor < stackLen - 1);

  return (
    <div
      className="absolute inset-0 z-20 flex cursor-pointer flex-col overflow-hidden"
      onPointerDown={(e) => {
        const t = e.target as HTMLElement | null;
        if (t?.closest("[data-keep]")) return;
        e.preventDefault();
        goIn();
      }}
    >
      <img
        src="/stills/city-wide.jpg"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-55"
      />
      <img
        src="/stills/ribbons.jpg"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-14"
      />
      <div className="pointer-events-none absolute inset-0 portal-tint" />
      <div className="pointer-events-none absolute inset-0 portal-veil" />

      {showHistory ? (
        <div data-keep className="pointer-events-auto absolute left-3 top-3 z-30 rounded-xl bg-void/70">
          <HistoryNav light />
        </div>
      ) : null}

      <div data-keep className="pointer-events-auto absolute right-3 top-3 z-30 rounded-xl bg-void/70">
        <SoundToggle light />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center px-5 py-10 md:justify-center">
        <Seal />
        <p className="portal-copy mt-5 text-center text-xs font-medium uppercase tracking-[0.32em] text-gold">
          Will-AI · Project Lab
        </p>
        <h1 className="portal-copy mt-2 max-w-xl text-center text-3xl font-medium leading-[1.15] sm:text-5xl">
          Ecosistema Digital Inmersivo
        </h1>
        <p className="portal-copy mt-3 max-w-md text-center text-sm leading-relaxed sm:text-base">
          ¿Quieres una experiencia única?
        </p>

        <div className="mt-auto flex w-full max-w-md flex-col items-center gap-4 md:mt-10">
          <HoloButton
            data-testid="entrar"
            type="button"
            active
            className="relative z-30 min-h-12 w-full max-w-xs px-8 text-base"
            onPointerDown={(e) => {
              e.stopPropagation();
              e.preventDefault();
              goIn();
            }}
            onClick={(e) => {
              e.stopPropagation();
              goIn();
            }}
          >
            Entrar
          </HoloButton>
        </div>
      </div>
    </div>
  );
}
