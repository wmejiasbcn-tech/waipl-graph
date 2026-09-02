import { chromium } from "playwright";

const url = process.argv[2] || "http://127.0.0.1:8080/";
const out = process.argv[3] || "/workspace/screenshots";

const browser = await chromium.launch({ args: ["--no-sandbox"] });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
page.setDefaultTimeout(10000);
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});

const shot = (name) =>
  page.screenshot({ path: `${out}/${name}.png`, fullPage: false, timeout: 4000 }).catch((e) => {
    console.error("shot fail", name, e.message);
  });
const step = (s) => console.error("STEP", s);
const clickNav = (id) =>
  page.evaluate((nav) => {
    const el = [...document.querySelectorAll(`[data-nav="${nav}"]`)].find((n) => n.offsetParent);
    if (!el) throw new Error("nav " + nav);
    el.click();
  }, id);
const clickTest = (id) =>
  page.evaluate((tid) => {
    const el = document.querySelector(`[data-testid="${tid}"]`);
    if (!el) throw new Error("missing " + tid);
    el.click();
  }, id);

const FORBIDDEN =
  /grafo vivo|umbral|blasón|glosario|galleta|Léxico|habitar, no consultar|territorio|Explorar|Conectar|Crear|Analizar|Soberano|custodia|Elena o su delegada|protocolo vivo|Círculo/i;

try {
  step("goto");
  await page.goto(url, { waitUntil: "load" });
  await page.waitForSelector("[data-ready='true']");
  await shot("qa-portal");
  const portal = await page.locator("body").innerText();
  if (FORBIDDEN.test(portal)) throw new Error("Portada con lengua interna: " + portal.match(FORBIDDEN)?.[0]);
  if (/Explorar|Conectar|Crear|Analizar/.test(portal)) throw new Error("Comandos internos en la entrada");

  step("entrar");
  await page.getByTestId("entrar").click();
  await page.waitForSelector("[data-entered='1']");

  step("inicio");
  const inicio = await page.locator("body").innerText();
  if (FORBIDDEN.test(inicio)) throw new Error("Inicio con lengua interna: " + inicio.match(FORBIDDEN)?.[0]);

  step("mapas");
  await clickNav("mapa");
  await page.waitForTimeout(300);

  step("chip nucleo");
  const chip = page.getByTestId("chip-nucleo");
  await chip.hover();
  await page.waitForTimeout(200);
  if (!/núcleo del laboratorio/i.test(await page.locator("body").innerText())) {
    throw new Error("Hover Núcleo no muestra pista");
  }
  await clickTest("chip-nucleo");
  await page.waitForSelector("[data-testid=ficha]");

  step("chip vortice");
  await clickTest("chip-vortice");
  await page.waitForTimeout(300);
  await page.getByTestId("ficha").waitFor({ state: "visible" });

  step("inicio volver");
  await clickNav("inicio");
  await page.waitForTimeout(200);
  const home = await page.locator("body").innerText();
  if (/Ajustes|Preferencias|Se guardan en este dispositivo|Calidad de render|Configuración/i.test(home)) {
    throw new Error("Ajustes internos visibles al público");
  }
  step("volver entrada");
  await page.evaluate(() => {
    const btn = [...document.querySelectorAll("button")].find((b) =>
      (b.textContent || "").includes("Volver a la entrada"),
    );
    if (!btn) throw new Error("no volver");
    btn.click();
  });
  await page.waitForSelector("[data-entered='0']");
  await shot("qa-portal-back");

  step("entrar otra vez");
  await page.getByTestId("entrar").click();
  await page.waitForSelector("[data-entered='1']");

  const audio = await page.evaluate(async () => {
    const r = await fetch("/audio/ambiente.mp3", { method: "HEAD" });
    return { src: "/audio/ambiente.mp3", ok: r.ok };
  });
  if (!audio.ok) throw new Error("Audio ambiental ausente");

  step("mobile");
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  mobile.on("pageerror", (e) => errors.push("mobile: " + e.message));
  await mobile.goto(url, { waitUntil: "load" });
  await mobile.waitForSelector("[data-ready='true']");
  await mobile.screenshot({ path: `${out}/qa-portal-mobile.png`, timeout: 3000 }).catch(() => {});
  await mobile.getByTestId("entrar").click();
  await mobile.waitForSelector("[data-entered='1']");
  await mobile.evaluate(() => {
    const el = [...document.querySelectorAll("[data-nav='mapa']")].find((n) => n.offsetParent);
    el?.click();
  });
  await mobile.waitForTimeout(300);
  await mobile.evaluate(() => document.querySelector("[data-testid=chip-nucleo]")?.click());
  await mobile.waitForTimeout(400);
  const mobileFicha = await mobile.evaluate(() => !!document.querySelector("[data-testid=ficha]"));
  if (!mobileFicha) throw new Error("Mobile: Núcleo no abre ficha");
  await mobile.close();

  await browser.close();
  const unique = [...new Set(errors)].filter((e) => !/favicon|Download the React DevTools/i.test(e));
  console.log(JSON.stringify({ ok: unique.length === 0, errors: unique, audio }, null, 2));
  if (unique.length) process.exit(1);
} catch (err) {
  await shot("qa-fail").catch(() => {});
  console.error("FAIL", err);
  await browser.close().catch(() => {});
  process.exit(1);
}
