import { useEffect } from "react";
import { BarChart3, ChevronRight, House, Map, ScanSearch } from "lucide-react";
import { SoundToggle } from "@/components/ambient";
import { GlossaryPanel } from "@/components/glossary-panel";
import { AnalisisOverlay, InicioOverlay, MapaChrome, VerificacionOverlay } from "@/components/overlays";
import { HistoryNav } from "@/components/history-nav";
import { type EcoView, useEco } from "@/lib/store";
import { cn } from "@/lib/cn";

const NAV: { id: EcoView; label: string; short: string; icon: typeof House }[] = [
  { id: "inicio", label: "Inicio", short: "Inicio", icon: House },
  { id: "mapa", label: "Mapas", short: "Mapas", icon: Map },
  { id: "verificacion", label: "Verificación", short: "Verificar", icon: ScanSearch },
  { id: "analisis", label: "Análisis", short: "Análisis", icon: BarChart3 },
];

const TITLES: Record<Exclude<EcoView, "config">, { kicker: string; title: string }> = {
  inicio: { kicker: "Will-AI", title: "Graphy" },
  mapa: { kicker: "Graphy", title: "Mapa" },
  verificacion: { kicker: "Graphy", title: "Verificación" },
  analisis: { kicker: "Graphy", title: "Análisis" },
};

export function Shell() {
  const rawView = useEco((s) => s.view);
  const view = rawView === "config" ? "inicio" : rawView;
  const setView = useEco((s) => s.setView);
  const select = useEco((s) => s.select);
  const goBack = useEco((s) => s.goBack);
  const goForward = useEco((s) => s.goForward);
  const selectedId = useEco((s) => s.selectedId);
  const glossaryId = useEco((s) => s.glossaryId);
  const closeGlossary = useEco((s) => s.closeGlossary);
  const title = TITLES[view];

  useEffect(() => {
    if (rawView === "config") setView("inicio");
  }, [rawView, setView]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (glossaryId) {
          closeGlossary();
          return;
        }
        if (selectedId) select(null);
        else goBack();
        return;
      }
      if (e.altKey && e.key === "ArrowLeft") {
        e.preventDefault();
        goBack();
      }
      if (e.altKey && e.key === "ArrowRight") {
        e.preventDefault();
        goForward();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [select, selectedId, glossaryId, closeGlossary, goBack, goForward]);

  return (
    <div className="pointer-events-none absolute inset-0 z-30">
      <header className="pointer-events-auto absolute inset-x-3 top-3 z-40 flex items-center gap-3 md:inset-x-4 md:right-72">
        <div className="holo-strong flex min-h-14 flex-1 items-center gap-1 rounded-xl py-1 pr-1 pl-1">
          <HistoryNav />
          <div className="min-w-0 flex-1 text-left px-2">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted">{title.kicker}</p>
            <h1 className="truncate text-lg font-light leading-tight text-ink sm:text-xl">{title.title}</h1>
          </div>
          <SoundToggle />
        </div>
      </header>

      <div className="pointer-events-auto absolute right-4 top-3 z-40 hidden flex-col items-end gap-3 md:flex">
        <nav className="holo w-56 rounded-xl p-2" aria-label="Navegación">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = view === item.id;
            return (
              <button
                key={item.id}
                type="button"
                data-active={active}
                data-nav={item.id}
                onClick={() => setView(item.id)}
                className="nav-item w-full text-sm"
              >
                <span className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  {item.label}
                </span>
                <ChevronRight className={cn("h-4 w-4 text-muted", active && "text-gold")} />
              </button>
            );
          })}
        </nav>
      </div>

      {view === "inicio" ? <InicioOverlay /> : null}
      {view === "mapa" ? <MapaChrome /> : null}
      {view === "verificacion" ? <VerificacionOverlay /> : null}
      {view === "analisis" ? <AnalisisOverlay /> : null}

      <GlossaryPanel />

      <nav
        className="pointer-events-auto absolute inset-x-3 bottom-10 z-40 flex h-16 items-stretch rounded-xl holo-strong md:hidden"
        aria-label="Navegación"
      >
        {NAV.map((item) => {
          const Icon = item.icon;
          const active = view === item.id;
          return (
            <button
              key={item.id}
              type="button"
              data-nav={item.id}
              onPointerDown={(e) => {
                e.stopPropagation();
                setView(item.id);
              }}
              onClick={() => setView(item.id)}
              className={cn(
                "flex flex-1 flex-col items-center justify-center gap-0.5 text-[11px]",
                active ? "text-ink" : "text-muted",
              )}
            >
              <Icon className={cn("h-5 w-5", active && "text-gold")} />
              {item.short}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
