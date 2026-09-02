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
| 44 nodos. Vár e Yata en Estructura | Hecho. Fuente: tabla oficial |
| Texto de fichas = tabla, letra por letra | Hecho. `src/lib/graph-data.ts` |
| Portada original: blasón, Ecosistema Digital Inmersivo, Entrar | Hecha. `src/components/portal-view.tsx` |
| Entrar lleva al mapa, un toque | Hecho |
| Sin cintas de color sobre el universo | Hecho |
| Glosario en palabras de ficha | Hecho. `src/lib/glossary.ts` |
| Ciudad cibernética: no es portada; se guarda para otro uso | Hecho. `public/identidad/ciudad-cibernetica.jpg` |
| Lenguaje público en lo que ve el visitante | Vigente |
| Deck holográfico de los 6 principios: núcleo 11+1. No sustituye a los 44 | Hecho. [publicacion/principios-inteligencia-hibrida.md](../publicacion/principios-inteligencia-hibrida.md). Lab [Will-AI-Project-Lab#42](https://github.com/wmejiasbcn-tech/Will-AI-Project-Lab/pull/42) |

## Dónde corre

- Entrada prevista: `waipl.dev`
- Grafo previsto: `graph.waipl.dev`
- Principios (núcleo 11+1): repositorio del laboratorio, `08_MARKETING_PRESENTACION/principios-inteligencia-hibrida/`

## Custodia

Ariadna: estructura del repositorio.  
Sylvia Bloom: memoria y documentos.  
Nova: arquitectura documental.  
Aether: esta construcción de Graphy y la ciudad cibernética.
