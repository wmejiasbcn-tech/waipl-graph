import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { NodeType, VerifyKind } from "./graph-data";

export type EcoView = "inicio" | "mapa" | "analisis" | "verificacion" | "config";

type EcoSettings = {
  autoRotate: boolean;
  showLabels: boolean;
  reduceMotion: boolean;
  quality: "alta" | "media";
  sound: boolean;
};

export type Frame = {
  entered: boolean;
  view: EcoView;
  selectedId: string | null;
};

type EnterOpts = {
  view?: EcoView;
  selectedId?: string | null;
};

type EcoState = EcoSettings &
  Frame & {
    hoveredId: string | null;
    query: string;
    typeFilter: NodeType | "all";
    verifyFilter: VerifyKind | "all";
    glossaryId: string | null;
    stack: Frame[];
    cursor: number;
    enter: (opts?: EnterOpts) => void;
    replayPortal: () => void;
    setView: (view: EcoView) => void;
    select: (id: string | null) => void;
    hover: (id: string | null) => void;
    setQuery: (q: string) => void;
    setTypeFilter: (t: NodeType | "all") => void;
    setVerifyFilter: (v: VerifyKind | "all") => void;
    openGlossary: (id: string) => void;
    closeGlossary: () => void;
    toggleAutoRotate: () => void;
    toggleLabels: () => void;
    toggleMotion: () => void;
    toggleSound: () => void;
    setQuality: (q: "alta" | "media") => void;
    goBack: () => void;
    goForward: () => void;
  };

const SETTINGS_KEYS = ["autoRotate", "showLabels", "reduceMotion", "quality", "sound"] as const;

const START: Frame = { entered: false, view: "inicio", selectedId: null };

function snap(s: Frame): Frame {
  return { entered: s.entered, view: s.view, selectedId: s.selectedId };
}

function same(a: Frame, b: Frame) {
  return a.entered === b.entered && a.view === b.view && a.selectedId === b.selectedId;
}

function commit(s: EcoState, patch: Partial<Frame>): Partial<EcoState> {
  const next = snap({ ...s, ...patch });
  if (same(s.stack[s.cursor] ?? START, next)) return patch;
  const stack = s.stack.slice(0, s.cursor + 1).concat(next);
  return { ...patch, stack, cursor: stack.length - 1 };
}

export const useEco = create<EcoState>()(
  persist(
    (set) => ({
      entered: false,
      view: "inicio",
      selectedId: null,
      hoveredId: null,
      query: "",
      typeFilter: "all",
      verifyFilter: "all",
      glossaryId: null,
      autoRotate: true,
      showLabels: true,
      reduceMotion: false,
      quality: "alta",
      sound: true,
      stack: [START],
      cursor: 0,
      enter: (opts) =>
        set((s) => {
          if (s.entered && !opts?.view && opts?.selectedId === undefined) return s;
          return commit(s, {
            entered: true,
            view: opts?.view ?? "mapa",
            selectedId: opts?.selectedId ?? s.selectedId,
          });
        }),
      replayPortal: () => set((s) => commit(s, { entered: false, selectedId: null })),
      setView: (view) =>
        set((s) => {
          const next = commit(s, { view });
          if (view !== "verificacion") {
            return { ...next, verifyFilter: "all" as const };
          }
          return next;
        }),
      select: (id) =>
        set((s) =>
          commit(s, {
            selectedId: id,
            view:
              id && s.view !== "mapa" && s.view !== "verificacion"
                ? "mapa"
                : s.view,
          }),
        ),
      hover: (id) => set({ hoveredId: id }),
      setQuery: (query) => set({ query }),
      setTypeFilter: (typeFilter) => set({ typeFilter }),
      setVerifyFilter: (verifyFilter) => set({ verifyFilter }),
      openGlossary: (glossaryId) => set({ glossaryId }),
      closeGlossary: () => set({ glossaryId: null }),
      toggleAutoRotate: () => set((s) => ({ autoRotate: !s.autoRotate })),
      toggleLabels: () => set((s) => ({ showLabels: !s.showLabels })),
      toggleMotion: () =>
        set((s) => ({
          reduceMotion: !s.reduceMotion,
          autoRotate: s.reduceMotion ? true : false,
        })),
      toggleSound: () => set((s) => ({ sound: !s.sound })),
      setQuality: (quality) => set({ quality }),
      goBack: () =>
        set((s) => {
          if (s.cursor <= 0) return s;
          const cursor = s.cursor - 1;
          return { ...s.stack[cursor], cursor };
        }),
      goForward: () =>
        set((s) => {
          if (s.cursor >= s.stack.length - 1) return s;
          const cursor = s.cursor + 1;
          return { ...s.stack[cursor], cursor };
        }),
    }),
    {
      name: "waipl-eco-v5",
      version: 5,
      skipHydration: true,
      partialize: (s) => ({
        autoRotate: s.autoRotate,
        showLabels: s.showLabels,
        reduceMotion: s.reduceMotion,
        quality: s.quality,
        sound: s.sound,
      }),
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<EcoSettings>;
        const next = { ...current };
        for (const key of SETTINGS_KEYS) {
          if (p[key] !== undefined) {
            (next as EcoSettings)[key] = p[key] as never;
          }
        }
        return next;
      },
    },
  ),
);


