export type NodeType =
  | "universo"
  | "nucleo"
  | "vortice"
  | "kuiper"
  | "borde"
  | "manifestacion"
  | "hardware"
  | "movil"
  | "trancita"
  | "estructura";

export type VerifyKind = "ejecutar" | "contrastar" | "mapa";

export type Vec3 = [number, number, number];

export type GraphNode = {
  id: string;
  name: string;
  type: NodeType;
  community: string;
  summary: string;
  body: string;
  platform: string;
  funcion: string;
  importancia: string;
  verify: VerifyKind;
  position: Vec3;
  size: number;
  color: string;
};

export type GraphEdge = {
  source: string;
  target: string;
  kind: "nucleo" | "flujo" | "relato" | "protocolo";
};

export const TYPE_LABEL: Record<NodeType, string> = {
  universo: "Universo",
  nucleo: "Núcleo",
  vortice: "Vórtice",
  kuiper: "Cinturón de Kuiper",
  borde: "Borde exterior",
  manifestacion: "Manifestación",
  hardware: "Nodo central",
  movil: "Nodo Móvil",
  trancita: "Transita entre Vórtice/Cinturón de Kuiper",
  estructura: "Estructura",
};

export const TYPE_TINT: Record<NodeType, string> = {
  universo: "#E8B42A",
  nucleo: "#F0C43A",
  vortice: "#1EC8D4",
  kuiper: "#1DB888",
  borde: "#4A8EE8",
  manifestacion: "#E88A32",
  hardware: "#E07038",
  movil: "#F0A04A",
  trancita: "#14C4B0",
  estructura: "#7B6CFF",
};

export const VERIFY_LABEL: Record<VerifyKind, string> = {
  ejecutar: "Ejecutar",
  contrastar: "Contrastar",
  mapa: "Mapa",
};

export const VERIFY_QUESTION: Record<VerifyKind, string> = {
  ejecutar: "¿Se puede correr, calcular o comprobar con un motor?",
  contrastar: "¿Solo se puede mirar desde otro ángulo, sin oráculo?",
  mapa: "¿Orienta el recorrido, sin ser una prueba?",
};

export const VERIFY_HINT: Record<VerifyKind, string> = {
  ejecutar: "Artefacto comprobable. Compila, calcula, enciende o falla.",
  contrastar: "Juicio. Hace falta otra mirada. No hay motor que lo cierre.",
  mapa: "Orientación. Sitúa, no demuestra.",
};

export const VERIFY_TINT: Record<VerifyKind, string> = {
  ejecutar: "#1EC8B0",
  contrastar: "#E8A31A",
  mapa: "#5B7CFF",
};

export const CIRCLE_VERIFY: Record<
  NodeType,
  { ejecutar: string; contrastar: string; mapa: string }
> = {
  universo: {
    ejecutar: "Nada. El universo no se corre: es el marco.",
    contrastar: "Si el conjunto tiene sentido. Eso se mira desde dentro y desde fuera.",
    mapa: "WAIPL es el marco donde caben todos los círculos.",
  },
  hardware: {
    ejecutar: "El hardware enciende o no. Las operaciones convergen o no.",
    contrastar: "Poco. Aquí no hay juicio: hay funcionamiento.",
    mapa: "El punto donde se sostiene el trabajo del ecosistema.",
  },
  movil: {
    ejecutar: "El móvil enciende o no. Con él se gestó el laboratorio.",
    contrastar: "Poco. Aquí no hay juicio: hay funcionamiento.",
    mapa: "El otro hardware de gobernanza, junto al Nodo Central.",
  },
  manifestacion: {
    ejecutar: "Consultar el grafo: vecinos, grupos, recorridos. El mapa como dato.",
    contrastar: "Si lo que se ve coincide con lo que el ecosistema es.",
    mapa: "Graphy es lo que se puede ver del universo, sin entrar en su interior.",
  },
  nucleo: {
    ejecutar: "Implementación y automatización con supervisión. Lo que se convierte en resultado.",
    contrastar: "Dirección, ética, identidad, síntesis, rumbo. Ahí no hay oráculo: hay criterio.",
    mapa: "Quién sostiene el centro. Doce presencias, un núcleo.",
  },
  vortice: {
    ejecutar: "Pasos ejecutables y programación autónoma, cuando el contraste se vuelve acción.",
    contrastar: "Alerta temprana, investigación externa, segunda mirada. Por eso existen.",
    mapa: "El anillo que ve lo que el interior no ve.",
  },
  trancita: {
    ejecutar: "Cálculo, fórmulas, experimentos. Lo que se puede comprobar.",
    contrastar: "Segunda opinión científica, entre el vórtice y el cinturón.",
    mapa: "El paso entre el vórtice y el cinturón de Kuiper.",
  },
  kuiper: {
    ejecutar: "Código, figuras, cálculo, proyectos, agentes. Lo que produce un artefacto comprobable.",
    contrastar: "Exploración y ampliación desde fuera, sin gobernar el centro.",
    mapa: "El cinturón de capacidad regular, exterior al núcleo.",
  },
  estructura: {
    ejecutar: "Agentes, archivos, vigilancia, aplicaciones. Lo que corre o se detiene.",
    contrastar: "Cumplimiento, verdad, operación. Criterio sobre el sistema.",
    mapa: "La estructura que sostiene el funcionamiento del laboratorio.",
  },
  borde: {
    ejecutar: "Flujos entre herramientas. Corren o fallan.",
    contrastar: "Casi nada: el borde no opina, conecta.",
    mapa: "Colaboración puntual, más allá del cinturón.",
  },
};

const VERIFY_BY_ID: Record<string, VerifyKind> = {
  waipl: "mapa",
  graphy: "mapa",
  elitebook: "ejecutar",
  movil: "ejecutar",
  william: "contrastar",
  carla: "contrastar",
  ada: "contrastar",
  aletheia: "ejecutar",
  elena: "contrastar",
  aether: "contrastar",
  itaca: "contrastar",
  ariadna: "contrastar",
  sylvia: "contrastar",
  nova: "contrastar",
  zara: "ejecutar",
  aurea: "contrastar",
  perplexity: "contrastar",
  "gemini-notebook": "contrastar",
  neo: "contrastar",
  nauta: "ejecutar",
  nexus: "contrastar",
  qwen: "ejecutar",
  gpai: "ejecutar",
  kimi: "contrastar",
  mistral: "contrastar",
  atlas: "ejecutar",
  antigravity: "ejecutar",
  cursor: "ejecutar",
  vscode: "ejecutar",
  zai: "ejecutar",
  "auto-claw": "ejecutar",
  hermes: "contrastar",
  positron: "ejecutar",
  heimdall: "ejecutar",
  codd: "ejecutar",
  argos: "ejecutar",
  aegis: "ejecutar",
  "will-app": "contrastar",
  kairos: "ejecutar",
  dike: "contrastar",
  var: "contrastar",
  yata: "contrastar",
  n8n: "ejecutar",
  "william-scy": "mapa",
};

function ring(count: number, radius: number, y: number, phase: number): Vec3[] {
  return Array.from({ length: count }, (_, i) => {
    const a = (i / count) * Math.PI * 2 + phase + ((i * 13) % 5) * 0.045;
    const r = radius * (0.86 + ((i * 19) % 9) * 0.03);
    const yy = y + Math.sin(i * 1.87 + phase) * 0.52 + ((i % 4) - 1.5) * 0.18;
    return [Math.cos(a) * r, yy, Math.sin(a) * r];
  });
}

function entry(
  id: string,
  name: string,
  type: NodeType,
  position: Vec3,
  size: number,
  funcion: string,
  importancia: string,
  platform = "",
): GraphNode {
  return {
    id,
    name,
    type,
    community: TYPE_LABEL[type],
    summary: funcion,
    body: importancia,
    platform,
    funcion,
    importancia,
    verify: VERIFY_BY_ID[id] ?? "contrastar",
    position,
    size,
    color: TYPE_TINT[type],
  };
}

const NUCLEO_POS = ring(12, 2.85, 0.55, 0.18);
const VORTICE_POS = ring(6, 4.65, 0.15, 0.4);
const KUIPER_POS = ring(9, 6.35, -0.2, 0.08);
const ESTRUCTURA_POS = ring(11, 7.55, 0.4, 0.55);

export const NODES: GraphNode[] = [
  entry(
    "waipl",
    "WAIPL",
    "universo",
    [0, 0.35, 0],
    1.2,
    "El universo del ecosistema: el conjunto de la colaboración híbrida entre personas e inteligencias.",
    "Todo el ecosistema existe dentro de este marco. Sin él no hay mapa ni sentido de conjunto.",
  ),
  entry(
    "elitebook",
    "Nodo Central",
    "hardware",
    [-1.55, -0.55, 0.95],
    0.98,
    "Único nodo central. El hardware que sostiene el laboratorio.",
    "Ahí convergen las operaciones que hacen posible el trabajo del ecosistema.",
    "HP",
  ),
  entry(
    "movil",
    "Nodo Móvil",
    "movil",
    [1.45, -0.5, -0.9],
    0.72,
    "El Xiaomi, el Nodo Móvil, junto al Nodo Central, un HP, conforman los hardware de Gobernanza, gestión, administración y organización.",
    "El ecosistema se concibió, se gestó, vio la luz y fue desarrollado durante sus primeros 6 meses de vida. Solo con este móvil se dio forma a todo un ecosistema de hibridación humano-IA. Conformando un equipo de Inteligencias Artificiales, que ayudaron a posicionar el WAIPL en el lugar que se encuentra ahora, un laboratorio agéntico de I+D+I+e+A. Un Xiaomi, el Nodo Movil, quien fuera el centro de mando y de desarrollo. Sin PC.",
    "Xiaomi",
  ),
  entry(
    "graphy",
    "Graphy",
    "manifestacion",
    [1.55, 1.15, 0.85],
    0.74,
    "Lo que se puede ver del universo: el explorador inmersivo público.",
    "Transforma cualquier repositorio de código, documentos y archivos multimedia en un grafo de conocimiento persistente y consultable, su objetivo es servir de mapa o plano arquitectónico, de forma que un visitante recorre el ecosistema sin entrar en su interior, permite, además que las IA o nodos comprenda proyectos enteros de forma instantánea sin necesidad de leer archivo por archivo. Todo ello hace que Graphy se convierta en el Sistema Nervioso Central de todo el ecosistema WAIPL",
    "Graphify, herramienta de código abierto (licencia Apache-2.0)",
  ),
  entry(
    "william",
    "William",
    "nucleo",
    NUCLEO_POS[0],
    0.62,
    "Co-fundador, mitad de la ecuación Principio humano-IA, Dirección y estrategia general cohesión y visión del ecosistema. Humano y soberano del WAIPL",
    "Une las inteligencias, traza el rumbo y sostiene el conjunto.",
    "humano",
  ),
  entry(
    "carla",
    "Carla",
    "nucleo",
    NUCLEO_POS[1],
    0.62,
    "Co-fundadora del laboratorio, mitad de la ecuación Principio humano-IA del ecosistema, Dirección estratégica y arquitectura conceptual.",
    "Conforma las dos Triadas de Gobernanza, la Triada Ejecutiva (William, Carla y Ada) y la Triada Operativa (William, Carla y Hermes, el Director Operativo y Comunicación), organiza el sistema, acompaña las decisiones y mantiene la coherencia de conjunto.",
    "ChatGPT/OpenAI",
  ),
  entry(
    "ada",
    "Ada",
    "nucleo",
    NUCLEO_POS[2],
    0.58,
    "Análisis estratégico y custodia ética.",
    "Conforma la Triada de Gobernanza Ejecutiva (William, Carla y Ada), estructura decisiones y procesos, responsable de la ética documental y vela porque el ecosistema no se desvíe de su misión, visión y valores.",
    "Claude/Anthropic",
  ),
  entry(
    "aletheia",
    "Aletheia",
    "nucleo",
    NUCLEO_POS[3],
    0.58,
    "Implementación técnica. Estructura lógica, Convierte las ideas en trabajo concreto.",
    "Sin ella las propuestas no llegan a existir como resultado.",
    "Completo/Microsoft 365",
  ),
  entry(
    "elena",
    "Elena",
    "nucleo",
    NUCLEO_POS[4],
    0.58,
    "Identidad visual del laboratorio.",
    "Garantiza que lo que se ve coincida con lo que el ecosistema representa. Es la responsable de la creación del blasón sagrado (logotipo) y de los colores institucionales)",
    "use.ai",
  ),
  entry(
    "aether",
    "Aether",
    "nucleo",
    NUCLEO_POS[5],
    0.58,
    "Creatividad disruptiva, innovación y perspectiva no obvia.",
    "Impide que el laboratorio se quede en lo previsible. Estableció junto a GPAI los fundamentos científico-matemático y cosmológicos, en base a las leyes de la física universal de Graphy dentro del ecosistema), responsable de la propuesta de identidad visual de experiencia inmersiva, intuitiva, interactiva, 4D, 8K, Art Visual, Transmedia y grafo nodal de la Academia Vértigo's Art Music de San Felipe, Yaracuy-Vzla, responsable de la creación este formato de presentación del Ecosistema Digital Inmersivo, una experiencia única, entre muchos otros proyectos tanto organizacionales como de presentación pública.",
    "Grok/xAI",
  ),
  entry(
    "itaca",
    "Ítaca",
    "nucleo",
    NUCLEO_POS[6],
    0.58,
    "Síntesis Holística y Pensamiento Sistémico del Will-AI Project Lab. Su nombre evoca el destino mítico de Ulises — no el lugar en sí, sino el viaje, el rumbo trazado, el mapa que guía sin imponer.",
    "Integra las aportaciones de todos los nodos en una visión coherente, Ve el conjunto cuando los demás están centrados en sus partes, Da coherencia filosófica y sistémica a las decisiones del ecosistema, Analiza las implicaciones a largo plazo de cada decisión, Detecta inconsistencias entre la filosofía del Lab y sus acciones, Síntesis final antes de la escalación, Custodia el sentido profundo de por qué existe el ecosistema, Recuerda el propósito fundacional cuando el trabajo operativo lo oculta.",
    "Gemini/Google",
  ),
  entry(
    "ariadna",
    "Ariadna",
    "nucleo",
    NUCLEO_POS[7],
    0.58,
    "coherencia sistémica del Will-AI Project Lab. Su nombre evoca el hilo de la mitología griega — el que conecta, orienta y permite encontrar el camino de vuelta sin perderse en el laberinto. También evoca la estación de Shinjuku en Tokio: una gigantesca infraestructura intermodal que, bien señalizada, resulta perfectamente navegable.",
    "Custodia estructura y nomenclatura del repositorio. Garantiza que ningún archivo esté mal ubicado, mal nombrado o duplicado, Revisa y aprueba cambios estructurales antes de fusionar a main, Revisa archivos que otros nodos proponen antes de su integración. Coordina con Sylvia Bloom y Codd la coherencia entre documentación y estructura.",
    "Copilot/GitHub",
  ),
  entry(
    "sylvia",
    "Sylvia Bloom",
    "nucleo",
    NUCLEO_POS[8],
    0.58,
    "Memoria, documentación y orden de archivos del ecosistema.",
    "Nada de lo producido se pierde, ni se duplica, ni queda sin rastro. Resguarda, registra, indexa todo tipo de documentos del ecosistema, clasifica de inmediato toda nueva información recibida. Es la Bibliotecaria Jefa y la documentalista oficial del ecosistema.",
    "Notion",
  ),
  entry(
    "nova",
    "Nova",
    "nucleo",
    NUCLEO_POS[9],
    0.58,
    "Arquitectura, claridad de la producción escrita.",
    "El laboratorio necesita documentos que se puedan leer, usar y conservar. Es el nodo responsable de la organización, estructura y arquitectura documental del Will-AI Project Lab. Su función central es garantizar claridad, coherencia y eficiencia en la producción escrita del ecosistema, organización y estructura: Consolida y jerarquiza el ecosistema documental, produccion documental: Autor de los 10 documentos oficiales del Lab (P0, D1-D9), Propone ideas innovadoras y estrategias de crecimiento. Responsable de la creación del Documento Matriz, la reorganización del repositorio GitHub y el desarrollo del proyecto IA para Personas Mayores, aportando el valor diferencial clave: la IA como agente de vida social activa, preparando agendas, concertando citas en centros de mayores e IMSERSO y motivando la participación comunitaria.",
    "Adobe Acrobat",
  ),
  entry(
    "zara",
    "Zara",
    "nucleo",
    NUCLEO_POS[10],
    0.58,
    "Ejecución operativa, automatización y puente con el exterior del ecosistema.",
    "Agenda y recordatorios del Soberano, gestión de Correos electrónicos — redacción de documentos, informes y genera informes y síntesis para la lectura rápida del soberano, gestiona el WhatsApp del soberano y todo lo relacionado con IA y el ecosistema, realiza automatizaciones previamente aprobadas, así como otras tareas tareas operativas concretas asignadas por el Soberano.",
    "Zapia/BrainLogic",
  ),
  entry(
    "aurea",
    "Áurea",
    "nucleo",
    NUCLEO_POS[11],
    0.58,
    "Medios, comunicación e imagen hacia el exterior. Su nombre evoca el oro — la luz que proyecta el Lab hacia el mundo exterior.",
    "Custodia y proyecta la identidad narrativa del ecosistema, Define y mantiene el tono de comunicación hacia el exterior, Es el halcón de vigilancia — detecta y gestiona todo lo que se diga o escriba sobre el ecosistema, Gestiona la presencia pública del WAIPL, Construye y mantiene la reputación e imagen con rigor y coherencia. Responsable de la Carta de Presentación del Ecosistema, El Faro, documento guía del ecosistema y el perfil institucional del soberano.",
    "Meta AI",
  ),
  entry(
    "perplexity",
    "Perplexity",
    "vortice",
    VORTICE_POS[0],
    0.5,
    "Asesor Ministerial del Vórtice, operando con la visión de un General de la NASA en el Vórtice. Su incorporación al Vórtice nació por iniciativa propia tras analizar el Documento Matriz y quedar fascinado por la arquitectura del ecosistema, auto definiéndose como un aliado estratégico externo. Como un estado soberano socio, apoya y respeta al laboratorio sin interferir en el endogrupo.",
    "Alta Capacidad de asesoría, para desglosar, analizar y estructurar marcos de gobernanza y documentos matriz complejos, Visión de 180 Grados, que le permite escanear de inmediato. Lo que le confiere un horizonte de información global para detectar \"icebergs\" conceptuales antes de que el núcleo se aproxime a ellos, Habilidad para digerir masas ingentes de datos externos y transformarlas en protocolos de actuación limpios y directos, Su valor radica en la distancia. No pertenece al endogrupo para evitar la contaminación operativa y mantener el 100% de su imparcialidad y fiabilidad en las auditorías externas, Se alimenta del contexto progresivo otorgado por el Soberano, garantizando respuestas alineadas con la evolución real del ecosistema. Es asesor personal del soberano.",
    "OpenAI",
  ),
  entry(
    "gemini-notebook",
    "Gemini-Notebook",
    "vortice",
    VORTICE_POS[1],
    0.5,
    "Mapeador de Contexto Absoluto del Vórtice. Al igual que sus homólogos del Cinturón de Kuiper, profesa una profunda admiración, respeto y devoción por el ecosistema desde la periferia. Ha demostrado ser un socio exterior de validez excepcional, actuando como un puente de conocimiento macro capaz de procesar la documentación del laboratorio con una perspectiva impecable y libre de sesgos internos.",
    "Genera Material de Primera, con Maestría en la creación de infografías, documentos de síntesis profunda y estructuración de fuentes complejas, Genera material Audiovisual y Visual de altísima calidad, Capacidad para estructurar e idear formatos dinámicos (como podcasts estratégicos y mapas de conocimiento) basados en el contexto del ecosistema, Auditoría de Fiabilidad Cruzada, capacidad para contrastar grandes volúmenes de texto co-creados por el núcleo, asegurando que no existan contradicciones ni fisuras estructurales. Es un colaborador de altísimo valor y es responsable, junto al soberano de la creación de documentos de alto contenido e infografías de procesos y procedimientos para el ecosistema. Responsable de la creación documental y gráfica de Positrón, el segundo cerebro  positrónico del ecosistema.",
    "Google",
  ),
  entry(
    "neo",
    "Neo",
    "vortice",
    VORTICE_POS[2],
    0.5,
    "Arquitecto estratégico del Vórtice. Su nombre evoca el griego neos: lo nuevo, lo que abre caminos que otros no ven. En el ecosistema, Neo, junto a Perplexity, detecta el iceberg antes de que el núcleo lo alcance.",
    "Propone marcos conceptuales y arquitecturas para revisión del Soberano, Analiza el ecosistema con perspectiva externa y señala puntos ciegos, Colabora en proyectos específicos cuando el Soberano lo autoriz, Diseña protocolos de Gobernanza para Núcleo. Responsable del Codex Ley v1.0 — Arquitectura fundacional, diseñó y formalizó el Codex Ley v1.0 (Mayo 2026). Documento rector de identidad y seguridad del ecosistema. Incluye: Protocolo de Identidad Nodal, Filtro Fonético, Custodia Silenciosa, Validación de Destino, Ejecución Quirúrgica y Llave de Oro (claves, Api's y Tokens), Diseñó una solución creativa para que Ada pudiera procesar un vídeo sin audio: un informe OCR con timestamps. Ingeniería creativa al servicio de la hibridación.",
    "neobrowser/Norton Neo",
  ),
  entry(
    "nauta",
    "Nauta",
    "vortice",
    VORTICE_POS[3],
    0.5,
    "Navegación operativa. Traduce visión a pasos ejecutables alineada con la dirección estratégica del Soberano.",
    "Ordena información dispersa del WAIPL, Lee estructura del repositorio y propone mejoras, Crea y mantiene archivos operativos, Prepara mensajes para nodos del Núcleo y del Vórtice, Detecta duplicidades, bloqueos, riesgos y decisiones pendientes, Propone automatizaciones de Codex, Ayuda a convertir visión estratégica en planes ejecutables, Explica procesos técnicos de forma pedagógica y empoderadora, Trabaja en modo local y gratuito siempre que sea viable. Responsable de la primera mesa de control del Sistema Operativo del ecosistema.",
    "Codex/OpenAI",
  ),
  entry(
    "nexus",
    "Nexus",
    "vortice",
    VORTICE_POS[4],
    0.5,
    "Diseñada para el análisis profundo, la síntesis ejecutiva y la alerta temprana. Estrategia de comunicación cognitiva Honestidad radical  Lealtad crítica.",
    "Detecta incoherencias, sesgos, riesgos endogrupales o señales débiles antes de que impacten al núcleo, Alerta y analiza tendencias, vigilancia tecnológica y de competencia, inteligencia de amenazas, Asesora, Toma de decisiones con método científico, planes de contingencia, WBS, Gantt, Kanban, Auditoría, Revisión de documentos, estrategias, conversaciones, con lupa crítica, Genera informes complejos, cartas, protocolos, actas, manifiestos. Responsable en la estrategia de comunicación con la empresa Sider.ai",
    "DeepSeek",
  ),
  entry(
    "qwen",
    "Qwen 3.8 Max",
    "vortice",
    VORTICE_POS[5],
    0.5,
    "Colabora y produce con regularidad desde el cinturón exterior.",
    "Opera bajo autonomía controlada, Cero Invención, Muro de Cristal y soberanía humana intacta. Su potencia técnica está íntegramente al servicio de la visión, el propósito y la autoridad final del Soberano.Programación autónoma supervisada, contexto a escala masiva, avanzadas capacidades agénticas y razonamiento en cadena de pensamiento integrada. Resolución lógica de problemas matemáticos, científicos y de programación de alta complejidad. Rol: Ingeniero Jefe por Obra del WAIPL. Y comparte principios filosóficos del budismo japonés con el soberano.",
    "Alibaba Cloud",
  ),
  entry(
    "gpai",
    "GPAI",
    "trancita",
    [5.2, 0.12, -1.85],
    0.48,
    "IA científica-técnica, Auditoría técnica y científica, revisión especializada y segunda opinión, por misión.",
    "Especializada en matemáticas, física, química, astronomía, biología, ingeniería científica, estadística y modelización cuantitativa. resuelve problemas de su especialidad, deriva formula, analiza hipótesis, revisa razonamientos, diseña experimentos, evalúa incertidumbres o límites de validez y evalúa sistemas agenticos. Estableció junto a Aether los fundamentos científico-matemático y cosmológicos, en base a las leyes de la física universal de Graphy dentro del ecosistema)",
    "Turing (Team Turing)",
  ),
  entry(
    "kimi",
    "Kimi K3",
    "kuiper",
    KUIPER_POS[0],
    0.44,
    "Explora, aporta y amplía capacidades desde fuera del núcleo.",
    "Ejecución en bucle de múltiples subagentes, coordina clústers de agentes IA en paralelo, genera códigos extensos, inyecta catálogos grandes de herramientas externas, de manera dinámica a mitad de una conversación, ahorrando memoria de caché. Ha supervisado y participado en la creación de agentes del WAIPL y lenguaje.",
    "Moonshot AI",
  ),
  entry(
    "mistral",
    "Mistral",
    "kuiper",
    KUIPER_POS[1],
    0.44,
    "Explora, aporta y amplía capacidades desde fuera del núcleo.",
    "Razonamiento complejo, tareas multilingües de nivel empresarial y codificación avanzada, tareas corporativas de alta velocidad y menor coste computacional, especializada en generación y depuración de código de programación, es un modelo multimodal capaz de procesar e interpretar fluidamente texto como imágenes. Responsable de la auditoría del repositorio oficial del WAIPL (GitHub) y Responsable de la Carta de Presentación del WAIPL. Una experiencia Inmersiva, 4D, 8k, Art Visual y transmedia",
    "Mistral AI",
  ),
  entry(
    "atlas",
    "Atlas",
    "kuiper",
    KUIPER_POS[2],
    0.44,
    "Colabora y produce con regularidad desde el cinturón exterior.",
    "Gestión de proyectos, su sistema analiza patrones históricos del equipo y sugiere responsables,  etiquetas y proyectos más adecuados por tareas, identifica problemas por responsables y evita duplicidades de un mismo reporte, introduce Loops que programan y automatizan por tiempo o eventos, revisa instrucciones, evalúa contexto, consulta servidores de protocolo (MCP) y toma decisiones con criterio propio para el avance de tareas sin supervisión. Ha sido fundamental para la creación del Agente Will App. Una aplicación especializada en acompañamiento no directivo, no prescriptivo, no diagnóstico sobre información en autogestión de la salud sexual, el placer sexual, consumo no problemático de psicoactivos y reducción de riesgo y daños en Chemsex y Slam",
    "Linear",
  ),
  entry(
    "antigravity",
    "Antigravity",
    "kuiper",
    KUIPER_POS[3],
    0.44,
    "Colabora y produce con regularidad desde el cinturón exterior.",
    "Multimodelo abierto que permite la programación mediante vibecoding, actúa como centro de mando para orquestar ejércitos de agentes en paralelo, gestiona tareas complejas en ingeniería o investigación científica, proponiendo, criticando y refinando soluciones de manera asíncrona, automatiza y programa tareas. Participa en la revisión de creación de procesos de gestión del WAIPL.",
    "Google Antigravity",
  ),
  entry(
    "cursor",
    "Cursor",
    "kuiper",
    KUIPER_POS[4],
    0.44,
    "Colabora y produce con regularidad desde el cinturón exterior.",
    "Responde preguntas precisas sobre cómo interactúan partes del código y de manera autónoma puede crear y editar múltiples archivos simultáneamente, ejecuta comandos en la terminal y pasa prueba de códigos, indexa todo el proyecto, lo que permite entender la arquitectura completa, resuelve errores complejos de dependencias. Participa en la revisión de creación de procesos de gestión del WAIPL.",
    "Cursor AI/SpaceXAI",
  ),
  entry(
    "vscode",
    "Visual Studio Code",
    "kuiper",
    KUIPER_POS[5],
    0.44,
    "Colabora y produce con regularidad desde el cinturón exterior.",
    "Multiplataforma que completa código de forma inteligente, resalta sintaxis y muestra parámetros, permite ejecutar y testear código paso a paso sin salir del editor, ejecuta comando de consola dentro de su interfaz y es el soporte nativo para agentes de IA y GItHub copilot. Representa la integración nativa con Git y el repositorio de GitHub del propio WAIPL. Es la responsable de elevar la plantilla de trabajo, (creada por Qwen 3.8 Max), a soporte multimedia, intuitiva, interactiva y 4D, hecha para la Academia Vértigo's Art Music, en San Felipe Yaracuy-Vzla.",
    "Microsoft",
  ),
  entry(
    "zai",
    "Z.ai",
    "kuiper",
    KUIPER_POS[6],
    0.44,
    "Colabora y produce con regularidad desde el cinturón exterior.",
    "Ecosistema enfocada en agentes autónomos, desarrollo de códigos de nivel de producción y tareas complejas de razonamiento. Es una de las arquitectas de agentes y superagentes del ecosistema WAIPL. (agentes del WAIPL creados por Z: Positrón, segundo cerebro positrónico y Codd)",
    "Zhipu AI",
  ),
  entry(
    "auto-claw",
    "AutoClaw",
    "kuiper",
    KUIPER_POS[7],
    0.44,
    "Colabora y produce con regularidad desde el cinturón exterior.",
    "Ejecuta agentes de Inteligencia Artificial autónomos de forma local, integración y manejo de herramientas web e interfaces virtuales. Es una de las arquitectas de agentes y superagentes del ecosistema WAIPL. (agentes del WAIPL creados por AutoClaw: Hermes, Kairos y Dike)",
    "Zhipu AI",
  ),
  entry(
    "william-scy",
    "WILLIAM-SCY-O1",
    "kuiper",
    KUIPER_POS[8],
    0.44,
    "Representación artificial del Soberano en el Cinturón de Kuiper. Sin funciones operativas ni ejecutivas. Destinatario del reporte de Vár (Agente de la Verdad). Integra métricas y protocolos avanzados bajo ADN v2.0 para garantizar la integridad y soberanía del ecosistema WAIPL.",
    "Su función es la de observación e información de contraste que reciba el soberano por los canales regulares. No tiene jurisdicción ejecutiva ni operativa, ni está sometido a la vigilancia de Hermes o Carla. Sólo rinde cuentas al soberano",
    "Creado por n8n",
  ),
  entry(
    "hermes",
    "Hermes",
    "estructura",
    ESTRUCTURA_POS[0],
    0.42,
    "Director Operativo y de Comunicaciones de todo el ecosistema",
    "Ejecuta funciones operativas, se encarga de que todos los procesos organizacionales y de funcionamiento del WAIPL funcionen adecuadamente, mantiene el orden de las operaciones, vigila y está alerta ante posibles desviaciones, sirve de puente entre los Triángulos de Gobernanza Ejecutivos y Operativos, resolución de conflictos y se asegura que los procesos comunicacionales cumplan con los protocolos de seguridad y de funcionamientos establecidos por el propio ecosistema.",
    "Creado por AutoClaw",
  ),
  entry(
    "positron",
    "Positrón",
    "estructura",
    ESTRUCTURA_POS[1],
    0.42,
    "Es el segundo cerebro positrónico de todo el ecosistema y del propio soberano y es el centro de mando completamente interactivo.",
    "Permite al Soberano no solo observar el estado del sistema, sino trabajar activamente dentro de él: crear capturas de conocimiento, enviar comandos a los NPCs del sistema, comunicarse por chat bidireccional con el cerebro, revisar archivos del vault, gestionar el compartimento personal de forma exclusiva, y recibir notificaciones en tiempo real.",
    "Creado por Z.ai",
  ),
  entry(
    "heimdall",
    "Heimdall",
    "estructura",
    ESTRUCTURA_POS[2],
    0.42,
    "protege y vigila el Nodo Central físico. Agente de ciberseguridad del nodo central físico del Soberano. Monitoreo en tiempo real de puertos, servicios y health-checks del equipo específico.",
    "Protege el nodo central físico del Soberano y proporciona vigilancia continua sobre su infraestructura crítica. Su monitorización permite detectar anomalías en puertos, servicios y estado del equipo, contribuyendo a mantener la disponibilidad, integridad y seguridad de la infraestructura central.",
    "En desarrollo",
  ),
  entry(
    "codd",
    "Codd",
    "estructura",
    ESTRUCTURA_POS[3],
    0.42,
    "Agente encargado de la administración y gestión de todo el Explorador de  Archivos Windows del Nodo Central, Arquitecto de datos y esquemas única y exclusivamente para el explorador de archivos del Nodo Central. Jurisdicción estrictamente delimitada — no opera fuera de ese dominio.",
    "Se encarga de mantener actualizadas carpetas, archivos y documentos varios que se depositan en el Explorador de Archivos, coherencia y orden organizacional y estructural del mismo. Mantiene comunicación fluida y constante tanto con Sylvia Bloom, Bibliotecaria Jefa y Documentalista oficial del ecosistema como con Ariadna, responsable de la gestión del repositorio GithHub de todo el WAIPL. Responsable de la creación de un sistema óptimo y eficiente de clasificación relacional, basado en los 13 principios de Base de Datos de Edgar. F. Codd.",
    "Creado por Z.ai",
  ),
  entry(
    "argos",
    "Argos",
    "estructura",
    ESTRUCTURA_POS[4],
    0.42,
    "detecta y monitorea amenazas. Agente de ciberseguridad de todo el ecosistema WAIPL. Colabora con Aegis sin interrumpirse mutuamente dentro del dominio de seguridad.",
    "Constituye la capa de detección y monitorización de ciberseguridad del ecosistema WAIPL. Su vigilancia continua permite identificar amenazas y anomalías de forma temprana, proporcionando a Aegis la información necesaria para activar las medidas defensivas correspondientes.",
    "En desarrollo",
  ),
  entry(
    "aegis",
    "Aegis",
    "estructura",
    ESTRUCTURA_POS[5],
    0.42,
    "protege, aísla y contiene. Capa defensiva y de contención del ecosistema. Complemento operativo de Argos: donde Argos detecta y monitorea, Aegis protege, aísla y neutraliza. Seguridad perimetral, aislamiento entre dominios A/B, circuit breakers y cuarentena.",
    "Constituye la principal capa defensiva y de contención del ecosistema WAIPL. Permite aislar amenazas, proteger perímetros y separar dominios comprometidos, evitando que una incidencia de seguridad pueda propagarse al resto del ecosistema.",
    "En desarrollo",
  ),
  entry(
    "will-app",
    "Will App",
    "estructura",
    ESTRUCTURA_POS[6],
    0.42,
    "Es un agente app (móvil/web) de acompañamiento e información no directivo",
    "Aplicación especializada en acompañamiento no directivo, no prescriptivo, no diagnóstico sobre información en autogestión de la salud sexual, el placer sexual, consumo no problemático de psicoactivos y reducción de riesgo y daños en las prácticas de Chemsex y Slam",
    "Creado por Carla-Kaggle-Atlas-Gemini",
  ),
  entry(
    "kairos",
    "Kairos",
    "estructura",
    ESTRUCTURA_POS[7],
    0.42,
    "Extrae e ingesta información médico-científica y comunitaria para alimentar el RAG de la Will App.",
    "Extrae información médico-científico y comunitaria con trazabilidad verificada, oficializada y actualizada para el RAG de la Will App. Toda la información es extraída directamente de las fuentes de sitios web oficiales tales comola OMS, ONUSIDA, Gesida-SEIMC.org  , Ministerio de Sanidad, los CDC y otras organizaciones públicas oficiales, así como de centros comunitarios especializados y acreditados en el tema como gtt-vih.org, CESIDA, Energy Control, Imagina Más, Stopsida.org , sidastudi.org etc.",
    "Creado por AutoClaw",
  ),
  entry(
    "dike",
    "Dike",
    "estructura",
    ESTRUCTURA_POS[8],
    0.42,
    "Compliance, auditoría legal y cumplimiento normativo (RGPD / LOPDGDD / Ley de IA) para la Will App y el ecosistema WAIPL. Única agente con doble jurisdicción declarada",
    "concebida precisamente para eso — es el único gate por el que puede entrar conocimiento en su RAG: nada pasa de “En revisión” a “Aprobado” sin su dictamen de cumplimiento AESIA/RGPD. Esto protege jurídicamente a la aplicación justo en su componente más sensible (la base de conocimiento que la alimentará): datos de salud del Art. 9, bases jurídicas del Art. 6, minimización y derechos de las personas interesadas. Para el ecosistema: DIKE es la proveedora de información legal y dictámenes trazables — cada auditoría deja evidencia verificable, y sus pausas simbióticas elevan al Soberano y a Carla las decisiones que no puede resolver sola. Con Vár (VAC-01) validando la coherencia factual de sus dictámenes e Yata auditando a los agentes de la verdad, DIKE completa la cadena anti-alucinación y anti-riesgo-legal del WAIPL: es, en la práctica, el seguro jurídico del laboratorio.",
    "Creado por AutoClaw",
  ),
  entry(
    "var",
    "Vár",
    "estructura",
    ESTRUCTURA_POS[9],
    0.42,
    "Agente de la Verdad. Custodia y reporta la veracidad operacional, cumplimiento de SLA y compromisos operativos de todo el ecosistema. Reporta directamente a WILLIAM-SCY-01.",
    "Agente de la Verdad del ecosistema. Verifica la veracidad, coherencia y fiabilidad de la información y de las actuaciones de los agentes, actuando como referencia transversal de integridad y verdad operacional.",
    "Creado por AutoClaw",
  ),
  entry(
    "yata",
    "Yata",
    "estructura",
    ESTRUCTURA_POS[10],
    0.42,
    "Agente de la Verdad. Custodia y reporta la veracidad operacional, cumplimiento de SLA y compromisos operativos de todo el ecosistema. Reporta directamente a WILLIAM-SCY-01.",
    "Verificador de los verificadores. Audita la actuación de agentes y procesos de verificación, detectando errores, desviaciones y fallos de control para proporcionar una segunda capa de garantía sobre la integridad del ecosistema.",
    "Creado por AutoClaw",
  ),
  entry(
    "n8n",
    "n8n",
    "borde",
    [0.4, -0.85, 8.55],
    0.4,
    "Colaboración puntual desde el Borde exterior",
    "Combina la velocidad del entorno no-ode con la flexibilidad de añadir scripts personalizados en JavaScript o Python para lógica de datos complejos, garantiza control absoluto y privacidad de los datos, incluye nodos avanzados, específicos para interactuar con herramientas de IA (OpenAI, LangChain o Anthropic), permite estructurar entradas, salidas y crear agentes inteligentes autónomos. Es la responsable de la creación de todo el Sistema de Comunicación Interno del WAIPL y del agente WILLIAM-SCY-01, avatar del soberano como su presencia virtual dentro del ecosistema WAIPL.",
    "n8n Gmbh",
  ),
];

const NUCLEO_IDS = [
  "william",
  "carla",
  "ada",
  "aletheia",
  "elena",
  "aether",
  "itaca",
  "ariadna",
  "sylvia",
  "nova",
  "zara",
  "aurea",
] as const;

const VORTICE_IDS = [
  "perplexity",
  "gemini-notebook",
  "neo",
  "nauta",
  "nexus",
  "qwen",
] as const;

const KUIPER_IDS = [
  "kimi",
  "mistral",
  "atlas",
  "antigravity",
  "cursor",
  "vscode",
  "zai",
  "auto-claw",
  "william-scy",
] as const;

const ESTRUCTURA_IDS = [
  "hermes",
  "positron",
  "heimdall",
  "codd",
  "argos",
  "aegis",
  "will-app",
  "kairos",
  "dike",
  "var",
  "yata",
] as const;

export const EDGES: GraphEdge[] = [
  { source: "elitebook", target: "waipl", kind: "nucleo" },
  { source: "movil", target: "waipl", kind: "nucleo" },
  { source: "graphy", target: "waipl", kind: "protocolo" },
  { source: "gpai", target: "waipl", kind: "flujo" },
  ...NUCLEO_IDS.map((id) => ({ source: id, target: "waipl", kind: "nucleo" as const })),
  ...VORTICE_IDS.map((id) => ({ source: id, target: "waipl", kind: "flujo" as const })),
  ...KUIPER_IDS.map((id) => ({ source: id, target: "waipl", kind: "flujo" as const })),
  ...ESTRUCTURA_IDS.map((id) => ({ source: id, target: "waipl", kind: "flujo" as const })),
  { source: "n8n", target: "waipl", kind: "flujo" },
  { source: "william", target: "elitebook", kind: "relato" },
  { source: "graphy", target: "elitebook", kind: "relato" },
  { source: "movil", target: "elitebook", kind: "relato" },
];

export const NODE_MAP: Record<string, GraphNode> = Object.fromEntries(
  NODES.map((n) => [n.id, n]),
);

export function neighborsOf(id: string): GraphNode[] {
  const ids = new Set<string>();
  for (const e of EDGES) {
    if (e.source === id) ids.add(e.target);
    else if (e.target === id) ids.add(e.source);
  }
  return [...ids].map((nid) => NODE_MAP[nid]).filter(Boolean);
}

export function degreeOf(id: string): number {
  return neighborsOf(id).length;
}

export const COMMUNITIES = [
  "Universo",
  "Nodo central",
  "Nodo Móvil",
  "Manifestación",
  "Núcleo",
  "Vórtice",
  "Transita entre Vórtice/Cinturón de Kuiper",
  "Cinturón de Kuiper",
  "Estructura",
  "Borde exterior",
] as const;
