import * as legacy from "./graph-data-legacy";

export type NodeType = "universo" | "nucleo" | "vortice" | "kuiper" | "borde" | "manifestacion" | "hardware" | "movil" | "trancita" | "estructura";
export type VerifyKind = legacy.VerifyKind;
export type Vec3 = legacy.Vec3;
export type GraphNode = {
  id: string; name: string; type: NodeType; community: string; summary: string; body: string;
  platform: string; funcion: string; importancia: string; arquitectura: string;
  verify: VerifyKind; position: Vec3; size: number; color: string;
};
export type GraphEdge = legacy.GraphEdge;

export const TYPE_LABEL: Record<NodeType, string> = {
  universo: "Universo", nucleo: "Núcleo", vortice: "Vórtice", kuiper: "Cinturón de Kuiper",
  borde: "Borde exterior", manifestacion: "Manifestación", hardware: "Nodo central",
  movil: "Nodo Móvil", trancita: "Transita entre Vórtice/Cinturón de Kuiper", estructura: "Estructura",
};
export const TYPE_TINT: Record<NodeType, string> = {
  universo: "#E8B42A", nucleo: "#F0C43A", vortice: "#1EC8D4", kuiper: "#1DB888", borde: "#4A8EE8",
  manifestacion: "#E88A32", hardware: "#E07038", movil: "#F0A04A", trancita: "#14C4B0", estructura: "#7B6CFF",
};
export const VERIFY_LABEL = legacy.VERIFY_LABEL;
export const VERIFY_QUESTION = legacy.VERIFY_QUESTION;
export const VERIFY_HINT = legacy.VERIFY_HINT;
export const VERIFY_TINT = legacy.VERIFY_TINT;

const CANONICAL: Array<{ id: string; name: string; type: NodeType }> = [
  ["waipl","WAIPL","universo"],["elitebook","Nodo Central","hardware"],["movil","Nodo Móvil","movil"],["graphy","Graphy","manifestacion"],
  ["william","William","nucleo"],["carla","Carla","nucleo"],["ada","Ada","nucleo"],["aletheia","Aletheia","nucleo"],["elena","Elena","nucleo"],["aether","Aether","nucleo"],["itaca","Ítaca","nucleo"],["ariadna","Ariadna","nucleo"],["sylvia","Sylvia Bloom","nucleo"],["nova","Nova","nucleo"],["zara","Zara","nucleo"],["aurea","Áurea","nucleo"],
  ["perplexity","Perplexity","vortice"],["gemini-notebook","Gemini-Notebook","vortice"],["neo","Neo","vortice"],["nauta","Nauta","vortice"],["nexus","Nexus","vortice"],["qwen","Qwen 3.8 Max","vortice"],["gpai","GPAI","trancita"],
  ["kimi","Kimi K3","kuiper"],["mistral","Mistral","kuiper"],["atlas","Atlas","kuiper"],["antigravity","Antigravity","kuiper"],["cursor","Cursor","kuiper"],["vscode","Visual Studio Code","kuiper"],["zai","Z.ai","kuiper"],["auto-claw","AutoClaw","kuiper"],
  ["hermes","Hermes","estructura"],["positron","Positrón","estructura"],["heimdall","Heimdall","estructura"],["codd","Codd","estructura"],["argos","Argos","estructura"],["aegis","Aegis","estructura"],["will-app","Will App","estructura"],["kairos","Kairos","estructura"],["dike","Dike","estructura"],["var","Vár","estructura"],["yata","Yata","estructura"],
  ["n8n","n8n","borde"],["william-scy","WILLIAM-SCY-O1","kuiper"],["emily","Emily","estructura"],["ollama","Ollama","estructura"],["sentinel","Sentinel","estructura"],
];

const OVERRIDE: Record<string, Partial<GraphNode>> = {
  emily: { funcion: "Sinapsis comunicacional,", importancia: "Puente entre mente y SNC, canal de transmisión y auditoría.", platform: "Creado por n8n" },
  ollama: { funcion: "Cuerpo físico", importancia: "Infraestructura de ejecución local, soporte material de los modelos.", platform: "Jeffrey Morgan y Michael Chiang" },
  sentinel: { funcion: "Sistema transversal de gobierno, ejecución, control y coordinación de la actividad agéntica del WAIPL", importancia: "Porque establece el marco común que permite que las entidades de inteligencia artificial del ecosistema operen de forma coordinada, trazable, verificable y bajo las reglas canónicas del WAIPL, reduciendo la dependencia de intervención manual del Soberano.", platform: "Grok/xAI - WAIPL", position: [0,0.55,8.85], size: 0.42, verify: "contrastar" },
};

const byId = new Map(legacy.NODES.map((n) => [n.id, n]));
export const NODES: GraphNode[] = CANONICAL.map(([id, name, type]) => {
  const old = byId.get(id);
  if (!old && id !== "sentinel") throw new Error(`Missing legacy node: ${id}`);
  const o = OVERRIDE[id] ?? {};
  const source = old ?? ({ position: [0,0.55,8.85], size: 0.42, verify: "contrastar" } as Partial<GraphNode>);
  const funcion = o.funcion ?? source.funcion ?? source.summary ?? "";
  const importancia = o.importancia ?? source.importancia ?? source.body ?? "";
  const platform = o.platform ?? source.platform ?? "";
  return {
    id, name, type, community: TYPE_LABEL[type], summary: funcion, body: importancia, platform,
    funcion, importancia, arquitectura: o.arquitectura ?? source.arquitectura ?? "",
    verify: o.verify ?? source.verify ?? "contrastar", position: o.position ?? source.position ?? [0,0,0],
    size: o.size ?? source.size ?? 0.42, color: TYPE_TINT[type],
  };
});

const NUCLEO_IDS = CANONICAL.filter(([, , t]) => t === "nucleo").map(([id]) => id);
const VORTICE_IDS = CANONICAL.filter(([, , t]) => t === "vortice").map(([id]) => id);
const KUIPER_IDS = CANONICAL.filter(([, , t]) => t === "kuiper").map(([id]) => id);
const ESTRUCTURA_IDS = CANONICAL.filter(([, , t]) => t === "estructura").map(([id]) => id);

export const EDGES: GraphEdge[] = [
  { source: "elitebook", target: "waipl", kind: "nucleo" }, { source: "movil", target: "waipl", kind: "nucleo" },
  { source: "graphy", target: "waipl", kind: "protocolo" }, { source: "ollama", target: "waipl", kind: "flujo" },
  { source: "gpai", target: "waipl", kind: "flujo" },
  ...NUCLEO_IDS.map((id) => ({ source: id, target: "waipl", kind: "nucleo" as const })),
  ...VORTICE_IDS.map((id) => ({ source: id, target: "waipl", kind: "flujo" as const })),
  ...KUIPER_IDS.map((id) => ({ source: id, target: "waipl", kind: "flujo" as const })),
  ...ESTRUCTURA_IDS.map((id) => ({ source: id, target: "waipl", kind: "flujo" as const })),
  { source: "n8n", target: "waipl", kind: "flujo" }, { source: "william", target: "elitebook", kind: "relato" },
  { source: "graphy", target: "elitebook", kind: "relato" }, { source: "emily", target: "carla", kind: "protocolo" },
  { source: "emily", target: "graphy", kind: "protocolo" }, { source: "emily", target: "positron", kind: "flujo" },
  { source: "emily", target: "hermes", kind: "flujo" }, { source: "emily", target: "ollama", kind: "flujo" },
  { source: "ollama", target: "elitebook", kind: "relato" }, { source: "movil", target: "elitebook", kind: "relato" },
];

export const NODE_MAP: Record<string, GraphNode> = Object.fromEntries(NODES.map((n) => [n.id, n]));
export function neighborsOf(id: string): GraphNode[] { const ids = new Set<string>(); for (const e of EDGES) { if (e.source === id) ids.add(e.target); else if (e.target === id) ids.add(e.source); } return [...ids].map((nid) => NODE_MAP[nid]).filter(Boolean); }
export function degreeOf(id: string): number { return neighborsOf(id).length; }
export const COMMUNITIES = ["Universo","Nodo central","Nodo Móvil","Manifestación","Núcleo","Vórtice","Transita entre Vórtice/Cinturón de Kuiper","Cinturón de Kuiper","Estructura","Borde exterior"] as const;
