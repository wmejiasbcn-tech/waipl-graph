import type { ReactNode } from "react";
import { useState } from "react";
import { RotateCcw, Sparkles } from "lucide-react";
import { Holo, HoloButton, SectionLabel } from "@/components/holo";
import { GlossaryButton } from "@/components/glossary-panel";
import { NodePanel } from "@/components/node-panel";
import {
  CIRCLE_VERIFY,
  COMMUNITIES,
  degreeOf,
  EDGES,
  NODES,
  TYPE_LABEL,
  TYPE_TINT,
  VERIFY_HINT,
  VERIFY_LABEL,
  VERIFY_QUESTION,
  VERIFY_TINT,
  type NodeType,
  type VerifyKind,
} from "@/lib/graph-data";
import { TYPE_HINT } from "@/lib/glossary";
import { useEco } from "@/lib/store";
import { cn } from "@/lib/cn";

const TYPES: NodeType[] = [
  "universo",
  "hardware",
  "movil",
  "manifestacion",
  "nucleo",
  "vortice",
  "trancita",
  "kuiper",
  "estructura",
  "borde",
];

const GALLERY = [
  { src: "/stills/swirl.jpg", title: "Entrada", caption: "Will-AI Project Lab", action: "portal" as const },
  { src: "/stills/ribbons.jpg", title: "Mapa", caption: "Vista general", action: "mapa" as const },
  { src: "/stills/graphy.jpg", title: "Graphy", caption: "Lo que se puede ver del universo WAIPL", action: "mapa" as const },
  { src: "/stills/explorer.jpg", title: "Análisis", caption: "Nodos y vínculos", action: "analisis" as const },
  { src: "/stills/graphy.jpg", title: "Verificación", caption: "Ejecutar, contrastar, mapa", action: "verificacion" as const },
];

function PanelFrame({ children }: { children: ReactNode }) {
  return (
    <div className="pointer-events-auto absolute inset-x-3 top-20 bottom-32 z-30 md:inset-x-auto md:left-4 md:top-24 md:bottom-6 md:w-full md:max-w-md">
      <div className="hud-scroll h-full pr-1">{children}</div>
    </div>
  );
}

export function InicioOverlay() {
  const setView = useEco((s) => s.setView);
  const replayPortal = useEco((s) => s.replayPortal);

  return (
    <PanelFrame>
      <div className="stagger-in flex flex-col gap-3 pb-2">
        <Holo strong className="p-5">
          <SectionLabel>Will-AI Project Lab</SectionLabel>
          <h2 className="mt-1 text-2xl font-light tracking-tight text-ink">Graphy</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Lo que se puede ver del universo WAIPL.
          </p>
          <div className="mt-4 grid grid-cols-3 gap-2">
            <Stat k="Nodos" v={String(NODES.length)} />
            <Stat k="Vínculos" v={String(EDGES.length)} />
            <Stat k="Grupos" v={String(COMMUNITIES.length)} />
          </div>
        </Holo>

        <div className="grid grid-cols-2 gap-2">
          {GALLERY.map((g) => (
            <button
              key={g.title}
              type="button"
              onClick={() => {
                if (g.action === "portal") replayPortal();
                else setView(g.action);
              }}
              className="holo overflow-hidden rounded-xl text-left"
            >
              <img src={g.src} alt={g.title} className="h-24 w-full object-cover" />
              <span className="block px-3 py-2">
                <span className="block text-sm font-medium text-ink">{g.title}</span>
                <span className="block text-xs text-muted">{g.caption}</span>
              </span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-2">
          <HoloButton className="min-h-12" onClick={() => setView("mapa")}>
            <Sparkles className="h-4 w-4" />
            Abrir mapa
          </HoloButton>
          <HoloButton className="min-h-12" onClick={replayPortal}>
            <RotateCcw className="h-4 w-4" />
            Volver a la entrada
          </HoloButton>
        </div>
      </div>
    </PanelFrame>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="holo-quiet rounded-md px-3 py-2">
      <p className="text-xs uppercase tracking-wider text-muted">{k}</p>
      <p className="text-xl font-medium text-ink">{v}</p>
    </div>
  );
}

export function MapaChrome() {
  const query = useEco((s) => s.query);
  const setQuery = useEco((s) => s.setQuery);
  const rawFilter = useEco((s) => s.typeFilter);
  const setTypeFilter = useEco((s) => s.setTypeFilter);
  const select = useEco((s) => s.select);
  const selectedId = useEco((s) => s.selectedId);
  const [chipHint, setChipHint] = useState<string | null>(null);
  const typeFilter = rawFilter === "all" || TYPES.includes(rawFilter) ? rawFilter : "all";

  const q = query.trim().toLowerCase();
  const hits = NODES.filter((n) => {
    const byQuery =
      !q ||
      n.name.toLowerCase().includes(q) ||
      n.community.toLowerCase().includes(q) ||
      TYPE_LABEL[n.type].toLowerCase().includes(q);
    const byType = typeFilter === "all" || n.type === typeFilter;
    return byQuery && byType;
  });

  const openType = (t: NodeType | "all") => {
    setTypeFilter(t);
    if (t === "all") {
      select(null);
      return;
    }
    const first = NODES.find((n) => n.type === t);
    if (first) select(first.id);
  };

  return (
    <>
      <div className="pointer-events-auto absolute inset-x-3 top-20 z-30 md:inset-x-auto md:left-4 md:top-24 md:w-[22rem]">
        <Holo strong className="p-3">
          <label className="sr-only" htmlFor="grafo-buscar">
            Buscar
          </label>
          <input
            id="grafo-buscar"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar…"
            className="h-11 w-full rounded-md bg-fog/70 px-3 text-sm text-ink outline-none placeholder:text-muted"
          />
          <div className="mt-2 flex flex-wrap gap-1.5">
            <FilterChip
              label="Todos"
              active={typeFilter === "all"}
              hint="Ver todos"
              onEnter={() => setChipHint("Ver todos")}
              onLeave={() => setChipHint(null)}
              onClick={() => openType("all")}
            />
            {TYPES.map((t) => (
              <FilterChip
                key={t}
                label={TYPE_LABEL[t]}
                tint={TYPE_TINT[t]}
                active={typeFilter === t}
                hint={TYPE_HINT[t]}
                testId={`chip-${t}`}
                onEnter={() => setChipHint(TYPE_HINT[t] ?? TYPE_LABEL[t])}
                onLeave={() => setChipHint(null)}
                onClick={() => openType(t)}
              />
            ))}
          </div>
          <p className="mt-2 px-1 text-xs leading-relaxed text-muted">
            {chipHint ?? "Pasa el puntero por un grupo. Tócalo para abrir su ficha. Las palabras subrayadas abren el glosario."}
          </p>
          {typeFilter !== "all" || q ? (
            <ul className="hud-scroll mt-2 flex max-h-48 flex-col md:max-h-64">
              {hits.length === 0 ? (
                <li className="px-1 py-2 text-sm text-muted">Ningún resultado.</li>
              ) : (
                hits.map((n) => (
                  <li key={n.id}>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        select(n.id);
                      }}
                      className={cn(
                        "flex min-h-11 w-full items-center gap-2 rounded-md px-2 text-left text-sm",
                        selectedId === n.id ? "bg-fog" : "hover:bg-fog/70",
                      )}
                    >
                      <span className="h-2 w-2 rounded-full" style={{ background: n.color }} />
                      {n.name}
                    </button>
                  </li>
                ))
              )}
            </ul>
          ) : null}
        </Holo>
        <p className="mt-2 hidden px-2 text-xs text-muted md:block">
          Arrastra para girar · el nombre aparece al pasar el puntero
        </p>
      </div>
      <NodePanel />
    </>
  );
}

function FilterChip({
  label,
  active,
  onClick,
  tint,
  hint,
  testId,
  onEnter,
  onLeave,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  tint?: string;
  hint?: string;
  testId?: string;
  onEnter?: () => void;
  onLeave?: () => void;
}) {
  return (
    <button
      type="button"
      data-testid={testId}
      title={hint}
      aria-label={hint ? `${label}. ${hint}` : label}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={cn(
        "inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 text-xs font-medium",
        active ? "holo-strong text-ink" : "holo-quiet text-muted",
      )}
    >
      {tint ? <span className="h-1.5 w-1.5 rounded-full" style={{ background: tint }} /> : null}
      {label}
    </button>
  );
}

export function AnalisisOverlay() {
  const select = useEco((s) => s.select);
  const ranked = [...NODES]
    .map((n) => ({ ...n, degree: degreeOf(n.id) }))
    .sort((a, b) => b.degree - a.degree);
  const hubs = ranked.filter((n) => n.degree > 1);

  const byCommunity = COMMUNITIES.map((c) => ({
    name: c,
    n: NODES.filter((x) => x.community === c).length,
    fill: TYPE_TINT[TYPES.find((t) => TYPE_LABEL[t] === c) ?? "universo"],
  }));

  return (
    <PanelFrame>
      <div className="stagger-in flex flex-col gap-3 pb-2">
        <Holo strong className="p-5">
          <SectionLabel>Análisis</SectionLabel>
          <h2 className="mt-1 text-2xl font-light tracking-tight text-ink">Composición</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {NODES.length} nodos, {EDGES.length} vínculos, {COMMUNITIES.length} grupos.
          </p>
          <GlossaryButton className="mt-4 w-full" />
        </Holo>

        <Holo className="p-4">
          <SectionLabel>Grupos</SectionLabel>
          <ul className="mt-3 flex flex-col gap-2">
            {byCommunity.map((c) => (
              <li key={c.name} className="flex items-center gap-3 text-sm">
                <span className="w-32 shrink-0 text-muted">{c.name}</span>
                <span className="h-2 flex-1 overflow-hidden rounded-full bg-fog">
                  <span
                    className="block h-full rounded-full"
                    style={{ width: `${(c.n / NODES.length) * 100}%`, background: c.fill }}
                  />
                </span>
                <span className="w-6 text-right text-ink">{c.n}</span>
              </li>
            ))}
          </ul>
        </Holo>

        <Holo className="p-4">
          <SectionLabel>Mayor grado</SectionLabel>
          <ol className="mt-2 flex flex-col">
            {hubs.map((n) => (
              <li key={n.id}>
                <button
                  type="button"
                  onClick={() => select(n.id)}
                  className="flex min-h-11 w-full items-center justify-between gap-2 rounded-md px-1 text-left text-sm hover:bg-fog/60"
                >
                  <span className="flex items-center gap-2 truncate">
                    <span className="h-2 w-2 rounded-full" style={{ background: n.color }} />
                    {n.name}
                  </span>
                  <span className="text-muted">{n.degree}</span>
                </button>
              </li>
            ))}
          </ol>
          <p className="mt-2 px-1 text-xs leading-relaxed text-muted">
            Los demás tienen un vínculo con WAIPL.
          </p>
        </Holo>
      </div>
    </PanelFrame>
  );
}

const LENSES: VerifyKind[] = ["ejecutar", "contrastar", "mapa"];

export function VerificacionOverlay() {
  const select = useEco((s) => s.select);
  const verifyFilter = useEco((s) => s.verifyFilter);
  const setVerifyFilter = useEco((s) => s.setVerifyFilter);
  const typeFilter = useEco((s) => s.typeFilter);
  const setTypeFilter = useEco((s) => s.setTypeFilter);
  const [openCircle, setOpenCircle] = useState<NodeType | null>("nucleo");

  const toggleLens = (k: VerifyKind) => {
    setVerifyFilter(verifyFilter === k ? "all" : k);
  };

  const matching = NODES.filter((n) => verifyFilter === "all" || n.verify === verifyFilter);

  return (
    <>
    <PanelFrame>
      <div className="stagger-in flex flex-col gap-3 pb-2">
        <Holo strong className="p-5">
          <SectionLabel>Tres preguntas</SectionLabel>
          <h2 className="mt-1 text-2xl font-light tracking-tight text-ink">Verificación</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Toca una lente. El mapa enciende solo lo que responde a esa pregunta.
          </p>
        </Holo>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {LENSES.map((k) => {
            const active = verifyFilter === k;
            const n = NODES.filter((node) => node.verify === k).length;
            return (
              <button
                key={k}
                type="button"
                onClick={() => toggleLens(k)}
                className={cn(
                  "rounded-xl p-4 text-left transition-transform duration-200",
                  active ? "holo-strong" : "holo",
                )}
                style={{
                  boxShadow: active
                    ? `0 0 0 1px ${VERIFY_TINT[k]}, 0 0 28px -8px ${VERIFY_TINT[k]}`
                    : undefined,
                }}
              >
                <span
                  className="mb-2 block h-1.5 w-8 rounded-full"
                  style={{ background: VERIFY_TINT[k] }}
                />
                <span className="block text-sm font-medium text-ink">{VERIFY_LABEL[k]}</span>
                <span className="mt-1 block text-xs leading-relaxed text-muted">
                  {VERIFY_QUESTION[k]}
                </span>
                <span className="mt-2 block text-lg font-medium text-ink">{n}</span>
              </button>
            );
          })}
        </div>

        <Holo className="p-4">
          <SectionLabel>{verifyFilter === "all" ? "Todos los nodos" : VERIFY_HINT[verifyFilter]}</SectionLabel>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {matching.map((n) => (
              <li key={n.id}>
                <button
                  type="button"
                  onClick={() => select(n.id)}
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 text-xs font-medium holo-quiet text-ink"
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: VERIFY_TINT[n.verify] }}
                  />
                  {n.name}
                </button>
              </li>
            ))}
          </ul>
        </Holo>

        <Holo className="p-4">
          <SectionLabel>Por círculo</SectionLabel>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            Cada círculo responde distinto. Ábrelo.
          </p>
          <ul className="mt-3 flex flex-col gap-2">
            {TYPES.map((t) => {
              const nodes = NODES.filter((n) => n.type === t);
              const total = nodes.length || 1;
              const mix = LENSES.map((k) => ({
                k,
                n: nodes.filter((n) => n.verify === k).length,
              }));
              const open = openCircle === t;
              const profile = CIRCLE_VERIFY[t];
              return (
                <li key={t} className="rounded-xl holo-quiet p-3">
                  <button
                    type="button"
                    onClick={() => {
                      setOpenCircle(open ? null : t);
                      setTypeFilter(open && typeFilter === t ? "all" : t);
                    }}
                    className="flex min-h-11 w-full items-center gap-3 text-left"
                  >
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ background: TYPE_TINT[t] }}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-ink">{TYPE_LABEL[t]}</span>
                      <span className="mt-1 flex h-1.5 overflow-hidden rounded-full bg-fog">
                        {mix.map((m) =>
                          m.n ? (
                            <span
                              key={m.k}
                              className="h-full"
                              style={{
                                width: `${(m.n / total) * 100}%`,
                                background: VERIFY_TINT[m.k],
                              }}
                            />
                          ) : null,
                        )}
                      </span>
                    </span>
                  </button>
                  {open ? (
                    <dl className="mt-3 space-y-2.5 border-t border-ink/10 pt-3">
                      {LENSES.map((k) => (
                        <div key={k}>
                          <dt className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted">
                            <span
                              className="h-1.5 w-1.5 rounded-full"
                              style={{ background: VERIFY_TINT[k] }}
                            />
                            {VERIFY_LABEL[k]}
                          </dt>
                          <dd className="mt-1 text-sm leading-relaxed text-ink/85">{profile[k]}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </Holo>
      </div>
    </PanelFrame>
      <NodePanel />
    </>
  );
}
