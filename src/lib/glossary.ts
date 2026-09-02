export const TYPE_HINT: Record<string, string> = {
  universo: "Will-AI Project Lab. El universo.",
  nucleo: "Núcleo del laboratorio. William, Carla, Ada…",
  vortice: "Presencia permanente de contraste.",
  kuiper: "Colaboran y producen con regularidad.",
  borde: "Colaboración puntual desde el borde exterior.",
  manifestacion: "Lo que se puede ver del universo WAIPL.",
  sinapsis: "El puente entre Carla y Graphy. Transmisión y auditoría.",
  hardware: "Único nodo central. El hardware que sostiene el laboratorio.",
  movil: "El Xiaomi. Hardware de gobernanza, junto al Nodo Central.",
  trancita: "El paso entre el vórtice y el cinturón de Kuiper.",
  estructura: "Agentes y estructura que sostienen el funcionamiento.",
};

export type GlossaryEntry = {
  id: string;
  term: string;
  aliases: string[];
  def: string;
};

export const GLOSSARY: GlossaryEntry[] = [
  {
    id: "nodo",
    term: "Nodo",
    aliases: ["nodo", "nodos"],
    def: "Un punto del mapa. Cada nodo es una presencia del laboratorio: una persona, una inteligencia, una herramienta o una pieza de hardware. Se toca para abrir su ficha.",
  },
  {
    id: "grafo",
    term: "Grafo",
    aliases: ["grafo", "grafos"],
    def: "Una red de puntos unidos por líneas. Aquí el grafo es el mapa del laboratorio: nodos y vínculos, no un organigrama de cajas.",
  },
  {
    id: "universo",
    term: "Universo",
    aliases: ["universo"],
    def: "El marco de todo el laboratorio. En este mapa, el universo es WAIPL: el conjunto donde caben todos los círculos.",
  },
  {
    id: "nucleo",
    term: "Núcleo",
    aliases: ["núcleo", "nucleo", "núcleos"],
    def: "El círculo interior. Quienes sostienen dirección, ética, identidad y el trabajo de cada día del laboratorio.",
  },
  {
    id: "vortice",
    term: "Vórtice",
    aliases: ["vórtice", "vortice", "vórtices", "vértice", "vertice"],
    def: "El anillo de contraste. Miradas que no viven dentro del núcleo y por eso ven lo que el interior no ve.",
  },
  {
    id: "kuiper",
    term: "Cinturón de Kuiper",
    aliases: ["Cinturón de Kuiper", "cinturón de Kuiper", "Cinturon de Kuiper", "Kuiper"],
    def: "En astronomía, un anillo de cuerpos más allá de Neptuno. Aquí es el círculo de colaboraciones regulares que trabajan desde fuera del núcleo, sin gobernarlo.",
  },
  {
    id: "borde",
    term: "Borde exterior",
    aliases: ["borde exterior", "Borde exterior"],
    def: "Más allá del cinturón. Colaboraciones puntuales: entran, hacen un trabajo, no forman parte del anillo permanente.",
  },
  {
    id: "manifestacion",
    term: "Manifestación",
    aliases: ["manifestación", "manifestacion"],
    def: "Lo que se puede ver del universo sin entrar en su interior. En este mapa, esa manifestación es Graphy.",
  },
  {
    id: "sinapsis",
    term: "Sinapsis",
    aliases: ["sinapsis", "Sinapsis"],
    def: "La conexión entre dos presencias. En este mapa, Emily es la sinapsis comunicacional: el puente entre Carla y Graphy.",
  },
  {
    id: "trancita",
    term: "Transita",
    aliases: ["transita", "Transita", "trancita", "Trancita"],
    def: "El paso entre dos anillos. GPAI está entre el vórtice y el cinturón de Kuiper: ni del todo dentro, ni del todo fuera.",
  },
  {
    id: "estructura",
    term: "Estructura",
    aliases: ["estructura"],
    def: "Agentes y piezas que sostienen el funcionamiento del laboratorio: operación, archivos, vigilancia, aplicaciones.",
  },
  {
    id: "nodo-central",
    term: "Nodo Central",
    aliases: ["Nodo Central", "nodo central"],
    def: "El ordenador que sostiene el laboratorio. El hardware donde convergen las operaciones.",
  },
  {
    id: "nodo-movil",
    term: "Nodo Móvil",
    aliases: ["Nodo Móvil", "Nodo Movil", "nodo móvil"],
    def: "El teléfono con el que se gestó el laboratorio. Hardware de gobernanza, junto al Nodo Central.",
  },
  {
    id: "ecosistema",
    term: "Ecosistema",
    aliases: ["ecosistema"],
    def: "El conjunto vivo de personas, inteligencias, herramientas y hardware que se relacionan entre sí. No es una empresa con departamentos: es una red.",
  },
  {
    id: "hibridacion",
    term: "Hibridación",
    aliases: ["hibridación", "hibridacion", "híbrida", "hibrida", "híbrido", "hibrido", "humano-IA"],
    def: "Trabajo hecho a la vez por personas e inteligencias artificiales, sin que unas sustituyan a las otras. El laboratorio se basa en ese principio.",
  },
  {
    id: "transmedia",
    term: "Transmedia",
    aliases: ["transmedia", "Transmedia"],
    def: "Una historia o una experiencia que se cuenta en varios soportes a la vez —imagen, sonido, mapa, documento— y cada soporte aporta algo que los demás no tienen.",
  },
  {
    id: "cuatro-d",
    term: "4D",
    aliases: ["4D", "4d"],
    def: "Tres dimensiones más el tiempo. Aquí significa una experiencia que no es una foto fija: se recorre, se mueve y se toca.",
  },
  {
    id: "ocho-k",
    term: "8K",
    aliases: ["8K", "8k"],
    def: "Una resolución de imagen muy alta. Se usa para decir que la experiencia visual se trabaja con el máximo detalle posible.",
  },
  {
    id: "art-visual",
    term: "Art Visual",
    aliases: ["Art Visual"],
    def: "Lenguaje artístico de la imagen: composición, color, ritmo visual. No es decoración: es cómo se ve y se siente el laboratorio.",
  },
  {
    id: "ia",
    term: "IA",
    aliases: ["IA", "inteligencias artificiales", "inteligencia artificial"],
    def: "Inteligencia artificial. Sistemas capaces de leer, escribir, calcular o proponer. En este laboratorio trabajan junto a personas, no en su lugar.",
  },
  {
    id: "agente",
    term: "Agente",
    aliases: ["agente", "agentes", "superagentes", "superagente"],
    def: "Una inteligencia con una tarea acotada. No es un chat genérico: tiene oficio, límites y a quién rinde cuentas.",
  },
  {
    id: "agentico",
    term: "Agéntico",
    aliases: ["agéntico", "agentico", "agénticas", "agenticas"],
    def: "Que actúa por encargo, con cierta autonomía, bajo supervisión humana. Un laboratorio agéntico orquesta muchos agentes, no uno solo.",
  },
  {
    id: "soberano",
    term: "Soberano",
    aliases: ["soberano", "Soberano"],
    def: "Quien dirige el laboratorio y tiene la última palabra. En WAIPL, William. Humano.",
  },
  {
    id: "plataforma",
    term: "Plataforma",
    aliases: ["plataforma", "Plataforma"],
    def: "De dónde es originario el nodo: la empresa, el modelo o el medio con el que trabaja. Ejemplo: Aether → Grok/xAI.",
  },
  {
    id: "verificacion",
    term: "Verificación",
    aliases: ["verificación", "verificacion"],
    def: "Tres preguntas sobre cada nodo: qué se puede ejecutar, qué solo se puede contrastar, y qué sirve de mapa. No todo se demuestra igual.",
  },
  {
    id: "hardware",
    term: "Hardware",
    aliases: ["hardware"],
    def: "La máquina física. Pantalla, memoria, procesador. Sin hardware no hay laboratorio que correr.",
  },
  {
    id: "repositorio",
    term: "Repositorio",
    aliases: ["repositorio"],
    def: "El archivo vivo del código y los documentos. Aquí, el de GitHub del laboratorio. Donde se guarda, se nombra y se versiona el trabajo.",
  },
  {
    id: "automatizacion",
    term: "Automatización",
    aliases: ["automatización", "automatizacion", "automatizaciones"],
    def: "Una tarea que, una vez aprobada, se ejecuta sola. No sustituye la decisión: la repite cuando ya está decidida.",
  },
  {
    id: "infografia",
    term: "Infografía",
    aliases: ["infografía", "infografia", "infografías", "infografias"],
    def: "Un documento que explica con imagen y texto a la vez: un proceso, un mapa, una síntesis que se entiende de un vistazo.",
  },
  {
    id: "documentalista",
    term: "Documentalista",
    aliases: ["documentalista", "Documentalista"],
    def: "Quien clasifica, registra e indexa lo producido para que nada se pierda, se duplique o quede sin rastro.",
  },
  {
    id: "blason",
    term: "Blasón",
    aliases: ["blasón", "blason"],
    def: "El emblema del laboratorio: el logotipo y los colores con los que se reconoce. No es un adorno: es identidad.",
  },
  {
    id: "positronico",
    term: "Positrónico",
    aliases: ["positrónico", "positronico", "positrónica", "positronica"],
    def: "De la tradición de la ciencia ficción: un cerebro artificial de propósito. Aquí nombra el segundo centro de mando interactivo del laboratorio, Positrón.",
  },
  {
    id: "rag",
    term: "RAG",
    aliases: ["RAG"],
    def: "Retrieval-Augmented Generation: un sistema que, antes de responder, busca en una base de documentos verificados. No improvisa con lo que «cree recordar».",
  },
  {
    id: "rgpd",
    term: "RGPD",
    aliases: ["RGPD"],
    def: "Reglamento General de Protección de Datos. La norma europea que regula cómo se tratan los datos de las personas.",
  },
  {
    id: "lopdgdd",
    term: "LOPDGDD",
    aliases: ["LOPDGDD"],
    def: "Ley Orgánica española de Protección de Datos y Garantía de los Derechos Digitales. Complementa al RGPD en España.",
  },
  {
    id: "aesia",
    term: "AESIA",
    aliases: ["AESIA"],
    def: "Agencia Española de Supervisión de la Inteligencia Artificial. El organismo que vela por el cumplimiento de la norma de IA en España.",
  },
  {
    id: "ocr",
    term: "OCR",
    aliases: ["OCR"],
    def: "Reconocimiento óptico de caracteres: convertir una imagen o un vídeo en texto que se puede leer y buscar.",
  },
  {
    id: "mcp",
    term: "MCP",
    aliases: ["MCP"],
    def: "Model Context Protocol: un modo estándar de que una inteligencia consulte herramientas y servidores externos con criterio, no a ciegas.",
  },
  {
    id: "vibecoding",
    term: "Vibecoding",
    aliases: ["vibecoding"],
    def: "Programar describiendo lo que se quiere, en lenguaje natural, y dejar que el modelo escriba el código. Siempre con revisión humana.",
  },
  {
    id: "nocode",
    term: "No-code",
    aliases: ["no-code", "no-ode", "no code"],
    def: "Construir automatizaciones y flujos sin escribir código, encadenando piezas visuales. Útil para ir rápido; el código entra cuando hace falta precisión.",
  },
  {
    id: "api",
    term: "API",
    aliases: ["API", "Api's", "APIs"],
    def: "Interfaz de programación: el modo en que un programa pide o entrega datos a otro, con reglas claras.",
  },
  {
    id: "sla",
    term: "SLA",
    aliases: ["SLA"],
    def: "Service Level Agreement: el compromiso de calidad de un servicio. Qué se promete cumplir, y cómo se comprueba.",
  },
  {
    id: "wbs",
    term: "WBS",
    aliases: ["WBS"],
    def: "Work Breakdown Structure: partir un proyecto grande en piezas pequeñas, para poder planificarlo y seguirlo.",
  },
  {
    id: "gantt",
    term: "Gantt",
    aliases: ["Gantt"],
    def: "Un calendario de proyecto en barras: qué va primero, qué se solapa, cuándo termina cada parte.",
  },
  {
    id: "kanban",
    term: "Kanban",
    aliases: ["Kanban"],
    def: "Un tablero de trabajo por columnas —por hacer, en curso, hecho— para ver el flujo sin perderse en listas.",
  },
  {
    id: "endogrupo",
    term: "Endogrupo",
    aliases: ["endogrupo", "endogrupales"],
    def: "El grupo de dentro. Quien no pertenece a él puede ver sesgos y puntos ciegos que el interior ya no percibe.",
  },
  {
    id: "npc",
    term: "NPC",
    aliases: ["NPC", "NPCs"],
    def: "Non-player character: en un sistema interactivo, una figura que responde y actúa, sin ser el visitante.",
  },
  {
    id: "multimodal",
    term: "Multimodal",
    aliases: ["multimodal"],
    def: "Que entiende más de un tipo de señal: texto, imagen, a veces sonido. No solo palabras.",
  },
  {
    id: "cluster",
    term: "Clúster",
    aliases: ["clústers", "clusters", "clúster"],
    def: "Un grupo de agentes o de máquinas que trabajan en paralelo, coordinados, como un equipo y no como una fila.",
  },
  {
    id: "subagente",
    term: "Subagente",
    aliases: ["subagentes", "subagente"],
    def: "Un agente menor al servicio de otro. Hace una parte del trabajo y devuelve el resultado.",
  },
  {
    id: "auditoria",
    term: "Auditoría",
    aliases: ["auditoría", "auditoria", "auditorías"],
    def: "Revisión sistemática: se mira si algo es cierto, coherente y conforme, con rastro de lo revisado.",
  },
  {
    id: "orquestar",
    term: "Orquestar",
    aliases: ["orquestar", "orquestación"],
    def: "Dirigir a muchos agentes o procesos a la vez, para que no se pisen y el conjunto suene a una sola obra.",
  },
  {
    id: "github",
    term: "GitHub",
    aliases: ["GitHub", "GithHub"],
    def: "La plataforma donde vive el repositorio público del laboratorio: código, documentos y su historia de cambios.",
  },
  {
    id: "graphify",
    term: "Graphify",
    aliases: ["Graphify"],
    def: "Herramienta de código abierto (licencia Apache-2.0) con la que se construye Graphy: convierte archivos en un grafo consultable.",
  },
  {
    id: "i-plus-d",
    term: "I+D+I+e+A",
    aliases: ["I+D+I+e+A"],
    def: "Investigación, desarrollo, innovación, emprendimiento y arte. El arco completo del laboratorio, no solo el código.",
  },
  {
    id: "snc",
    term: "Sistema Nervioso Central",
    aliases: ["Sistema Nervioso Central", "SNC", "snc"],
    def: "Metáfora: Graphy como el mapa que hace visible el conjunto y permite recorrerlo, igual que el sistema nervioso conecta el organismo.",
  },
  {
    id: "principio",
    term: "Principio humano-IA",
    aliases: ["Principio humano-IA", "ecuación Principio humano-IA"],
    def: "La regla de fondo: persona e inteligencia, a partes iguales. Ninguna mitad gobierna a la otra.",
  },
  {
    id: "codex",
    term: "Codex Ley",
    aliases: ["Codex Ley", "Codex Ley v1.0"],
    def: "Documento rector de identidad y seguridad del laboratorio. Nombra protocolos; no es un código penal.",
  },
  {
    id: "gobernanza",
    term: "Gobernanza",
    aliases: ["gobernanza", "Gobernanza", "Gobernaza"],
    def: "Cómo se deciden las cosas y quién rinde cuentas. En el laboratorio hay círculos de dirección, no una jerarquía opaca.",
  },
  {
    id: "triada",
    term: "Tríada",
    aliases: ["Tríada", "Triada", "Triadas", "Tríadas"],
    def: "Un grupo de tres. Aquí, los tríos que sostienen la dirección ejecutiva y la operativa del laboratorio.",
  },
  {
    id: "sintesis",
    term: "Síntesis",
    aliases: ["síntesis", "sintesis", "Síntesis"],
    def: "Juntar muchas partes en una visión que se puede usar. No es un resumen que borra: es un conjunto que se entiende.",
  },
  {
    id: "sistemico",
    term: "Sistémico",
    aliases: ["sistémico", "sistemico", "Sistémico", "sistémica"],
    def: "Que mira el conjunto y las relaciones, no solo la pieza de delante. Una decisión sistémica pregunta qué mueve en todo el mapa.",
  },
  {
    id: "intermodal",
    term: "Intermodal",
    aliases: ["intermodal"],
    def: "Que conecta varios modos de transporte o de paso en un mismo lugar, como una estación grande bien señalizada.",
  },
  {
    id: "matriz",
    term: "Documento Matriz",
    aliases: ["Documento Matriz", "documento matriz"],
    def: "El documento de base del laboratorio: la arquitectura a partir de la cual se ordena el resto.",
  },
  {
    id: "protocolo",
    term: "Protocolo",
    aliases: ["protocolo", "protocolos"],
    def: "Una regla escrita de cómo se hace algo. Sirve para repetir bien, no para improvisar cada vez.",
  },
  {
    id: "jurisdiccion",
    term: "Jurisdicción",
    aliases: ["jurisdicción", "jurisdiccion"],
    def: "Hasta dónde llega la autoridad de un nodo. Lo que no está en su jurisdicción, no lo toca.",
  },
  {
    id: "compliance",
    term: "Compliance",
    aliases: ["Compliance", "compliance"],
    def: "Cumplimiento normativo: que lo que se hace encaje con la ley y con las reglas que el propio laboratorio se ha dado.",
  },
  {
    id: "tokens",
    term: "Token",
    aliases: ["tokens", "Tokens", "Token"],
    def: "Una clave digital de acceso. No es una contraseña de persona: es la llave con la que un programa se identifica ante otro.",
  },
  {
    id: "timestamps",
    term: "Timestamp",
    aliases: ["timestamps", "timestamp"],
    def: "La marca de tiempo de un instante: hora y fecha exactas, para poder volver a ese punto.",
  },
  {
    id: "circuit-breaker",
    term: "Circuit breaker",
    aliases: ["circuit breakers", "circuit breaker"],
    def: "Un corte de seguridad: si algo falla, se abre el circuito para que el fallo no se lleve el resto.",
  },
  {
    id: "cuarentena",
    term: "Cuarentena",
    aliases: ["cuarentena"],
    def: "Aislar un elemento dudoso para que no contamine al resto del sistema, hasta que se sepa si es seguro.",
  },
  {
    id: "perimetro",
    term: "Perímetro",
    aliases: ["perímetro", "perimetro", "perimetral"],
    def: "El borde de seguridad. Lo que está dentro se protege; lo que cruza el perímetro se examina.",
  },
  {
    id: "health-check",
    term: "Health-check",
    aliases: ["health-checks", "health-check"],
    def: "Una comprobación automática de que un servicio sigue en pie: responde, o no responde.",
  },
  {
    id: "apache",
    term: "Apache-2.0",
    aliases: ["Apache-2.0", "licencia Apache-2.0"],
    def: "Una licencia de software libre. Permite usar, modificar y compartir el código con pocas condiciones.",
  },
  {
    id: "faro",
    term: "El Faro",
    aliases: ["El Faro"],
    def: "Documento guía del ecosistema. Orienta; no es el mapa Graphy, es la letra que dice hacia dónde se navega.",
  },
  {
    id: "ejecutar",
    term: "Ejecutar",
    aliases: ["Ejecutar", "ejecutar"],
    def: "Lo que se puede correr, calcular o comprobar con un motor: enciende, compila o falla. No es opinión.",
  },
  {
    id: "contrastar",
    term: "Contrastar",
    aliases: ["Contrastar", "contrastar"],
    def: "Lo que pide otra mirada. No hay un motor que lo cierre: hay criterio, ética, rumbo.",
  },
  {
    id: "mapa-lente",
    term: "Mapa",
    aliases: ["mapa", "Mapa"],
    def: "Lo que orienta el recorrido sin ser una prueba. Sitúa. No demuestra.",
  },
];

export const GLOSSARY_BY_ID: Record<string, GlossaryEntry> = Object.fromEntries(
  GLOSSARY.map((e) => [e.id, e]),
);

const LETTER = "A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9+";

function escapeRe(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const NEEDLES = GLOSSARY.flatMap((e) =>
  [e.term, ...e.aliases].map((needle) => ({ needle, id: e.id })),
).sort((a, b) => b.needle.length - a.needle.length);

const PATTERN = NEEDLES.map(
  ({ needle }) => `(?<![${LETTER}])${escapeRe(needle)}(?![${LETTER}])`,
).join("|");

export const GLOSSARY_RE = new RegExp(`(${PATTERN})`, "giu");

const NEEDLE_TO_ID = new Map(NEEDLES.map((n) => [n.needle.toLowerCase(), n.id]));

export type LinkedPart = { text: string; id?: string };

export function splitGlossary(text: string): LinkedPart[] {
  if (!text) return [];
  const re = new RegExp(GLOSSARY_RE.source, GLOSSARY_RE.flags);
  const parts: LinkedPart[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push({ text: text.slice(last, m.index) });
    const raw = m[0];
    const id = NEEDLE_TO_ID.get(raw.toLowerCase());
    if (id) parts.push({ text: raw, id });
    else parts.push({ text: raw });
    last = m.index + raw.length;
    if (m.index === re.lastIndex) re.lastIndex += 1;
  }
  if (last < text.length) parts.push({ text: text.slice(last) });
  return parts;
}

export function glossaryOf(id: string | null): GlossaryEntry | undefined {
  if (!id || id === "index") return undefined;
  return GLOSSARY_BY_ID[id];
}
