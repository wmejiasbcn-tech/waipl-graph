# Graphy — registro

**Nombre público:** Ecosistema Digital Inmersivo  
**Presencia:** Graphy, lo que se puede ver del universo Will-AI Project Lab  
**Fecha de este registro:** 2 de septiembre de 2026  
**Repositorio:** `wmejiasbcn-tech/waipl-graph`

## Qué es

Explorador inmersivo público. El visitante recorre nodos sin entrar en el interior del laboratorio. Cada nodo abre ficha: plataforma, función e importancia, con el texto oficial, sin sintetizar. Palabras raras abren glosario.

## Decisiones de producto (trazadas)

| Decisión | Estado |
|---|---|
| 47 nodos. William–Áurea = núcleo 11+1 (filas 5–16). Emily = 45 Estructura. Ollama = 46 Estructura. Sentinel = 47 Estructura. | Actualizado. Fuente única: `SENTINEL/docs/governance/tabla_47_nodos.csv` |
| Organismo operativo: 6 jurisdicciones. Tabla exacta | Hecho. [organismo-operativo.md](organismo-operativo.md) |
| Texto de fichas = tabla canónica | Hecho. `src/lib/graph-data.ts` |
| Portada original: blasón, Ecosistema Digital Inmersivo, Entrar | Hecha. `src/components/portal-view.tsx` |
| Entrar lleva al mapa, un toque | Hecho |
| Sin cintas de color sobre el universo | Hecho |
| Glosario en palabras de ficha | Hecho. `src/lib/glossary.ts` |
| Ciudad cibernética: no es portada; se guarda para otro uso | Hecho. `public/identidad/ciudad-cibernetica.jpg` |
| Lenguaje público en lo que ve el visitante | Vigente |
| Una sola ventana pública. Graphy no se tapa con láminas | Hecho. Skill ventanas |
| Presentaciones: Graphy inmersivo; Gamma/Canva decks; HeyGen vídeo | Hecho. Skill presentaciones. Inventario: [conectores.md](conectores.md) |

## Dónde corre

- En el mundo: enlace publicado (cualquier navegador, sin cuenta).  
- Entrada prevista: `waipl.dev`  
- Grafo previsto: `graph.waipl.dev` — hoy aún apunta a la carta antigua; Graphy entra ahí cuando el despliegue de este repositorio esté activo.  
- Principios (núcleo 11+1): repositorio del laboratorio, `08_MARKETING_PRESENTACION/principios-inteligencia-hibrida/`

## Custodia

Ariadna: estructura del repositorio.  
Sylvia Bloom: memoria y documentos.  
Nova: arquitectura documental.  
Aether: esta construcción de Graphy y la ciudad cibernética.
