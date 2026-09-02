import { BookOpen, X } from "lucide-react";
import { Holo, HoloButton, SectionLabel } from "@/components/holo";
import { GLOSSARY, glossaryOf } from "@/lib/glossary";
import { useEco } from "@/lib/store";
import { cn } from "@/lib/cn";

export function GlossaryPanel() {
  const id = useEco((s) => s.glossaryId);
  const openGlossary = useEco((s) => s.openGlossary);
  const closeGlossary = useEco((s) => s.closeGlossary);
  if (!id) return null;

  const entry = glossaryOf(id);
  const index = id === "index" || !entry;

  return (
    <Holo
      strong
      className={cn(
        "pointer-events-auto absolute z-50 flex max-h-[42dvh] w-auto flex-col overflow-hidden p-0",
        "inset-x-3 bottom-[min(52dvh,28rem)] md:inset-x-auto md:bottom-8 md:left-4 md:w-[22rem]",
      )}
      role="dialog"
      aria-label="Glosario"
    >
      <div className="flex items-start justify-between gap-3 px-4 pt-4">
        <div>
          <SectionLabel>Glosario</SectionLabel>
          <h2 className="mt-1 text-lg font-medium leading-tight text-ink">
            {index ? "Palabras del mapa" : entry.term}
          </h2>
        </div>
        <button
          type="button"
          aria-label="Cerrar glosario"
          onClick={closeGlossary}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-muted hover:text-ink"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="hud-scroll min-h-0 flex-1 px-4 pb-3">
        {index ? (
          <ul className="mt-3 flex flex-col gap-1">
            {GLOSSARY.map((e) => (
              <li key={e.id}>
                <button
                  type="button"
                  onClick={() => openGlossary(e.id)}
                  className="flex min-h-11 w-full items-center rounded-md px-2 text-left text-sm text-ink hover:bg-fog/60"
                >
                  {e.term}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <>
            <p className="mt-3 text-sm leading-relaxed text-ink/85">{entry.def}</p>
            <button
              type="button"
              onClick={() => openGlossary("index")}
              className="mt-4 min-h-11 text-left text-xs font-medium uppercase tracking-[0.18em] text-muted hover:text-ink"
            >
              Ver todas las palabras
            </button>
          </>
        )}
      </div>
    </Holo>
  );
}

export function GlossaryButton({ className }: { className?: string }) {
  const openGlossary = useEco((s) => s.openGlossary);
  return (
    <HoloButton
      type="button"
      onClick={() => openGlossary("index")}
      className={cn("min-h-11 text-sm", className)}
    >
      <BookOpen className="h-4 w-4" />
      Glosario
    </HoloButton>
  );
}
