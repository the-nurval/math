// Проход по интерфейсу в браузере: npm run test:ui
// Поднимает локальный сервер, подменяет ответы Supabase, проходит экраны ученика и родителя
// на трёх языках и падает, если в консоли есть ошибки. Скриншоты — в tests/screens/ (в git не попадают).
// Нужен playwright-core и Chromium: npm install && npx playwright-core install chromium
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { chromium } from "playwright-core";

const ROOT = path.resolve(import.meta.dirname, "..");
const SHOTS = path.join(import.meta.dirname, "screens");
const TYPES = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
};

// шаги: [имя, селектор кнопки]; "INPUT" — ввести ответ в первое поле
const STEPS = [
  ["main", null],
  ["new", '[data-act="new"]'],
  ["answer", "INPUT"],
  ["check", '[data-act="check"]'],
  ["sum", '[data-act="sum"]'],
  ["sumclose", '[data-act="sumclose"]'],
  ["headmode", '[data-act="headmode"]'],
  ["weektoggle", '[data-act="weektoggle"]'],
  ["gmenu", '[data-act="gmenu"]'],
  ["mixtoggle", '[data-act="mixtoggle"]'],
  ["timer", '[data-set="timer"][data-v="watch"]'],
  ["type", '[data-set="type"][data-v="period"]'],
  ["new2", '[data-act="new"]'],
  ["finish", '[data-act="finish"]'],
  ["settings", '[data-go="settings"]'],
  ["level", '[data-set="level"][data-v="o"]'],
  ["program", '[data-set="program"][data-v="prog"]'],
  ["theme", '[data-set="theme"][data-v="dark"]'],
  ["faq", '[data-go="faq"]'],
  ["faqback", ".back"],
  ["account", '[data-go="account"]'],
  ["delete", '[data-act="d1"]'],
  ["close", '[data-act="mclose"],[data-act="cancel"]'],
  ["programme", '[data-go="prog"]'],
  ["main2", '[data-go="main"]'],
  ["profile", '[data-go="profile"],[data-go="me"]'],
  ["lang-et", '[data-set="lang"][data-v="et"]'],
  ["lang-en", '[data-set="lang"][data-v="en"]'],
  ["lang-ru", '[data-set="lang"][data-v="ru"]'],
];
const PEOPLE = [
  ["student8", "student", 8, "ru", "school"],
  ["student8p", "student", 8, "et", "prog"],
  ["student7", "student", 7, "en", "school"],
  ["parent", "parent", 7, "ru", "school"],
];

function serve() {
  const server = http.createServer((req, res) => {
    const url = decodeURIComponent(req.url.split("?")[0]);
    const file = path.join(ROOT, url === "/" ? "index.html" : url);
    if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory())
      return res.writeHead(404).end();
    res.writeHead(200, { "Content-Type": TYPES[path.extname(file)] || "application/octet-stream" });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise(ok => server.listen(0, () => ok(server)));
}

test("экраны открываются без ошибок в консоли", async () => {
  const server = await serve();
  const base = `http://localhost:${server.address().port}/`;
  const browser = await chromium.launch();
  fs.mkdirSync(SHOTS, { recursive: true });
  const errors = [];
  try {
    for (const [who, role, grade, lang, program] of PEOPLE) {
      const page = await browser.newPage({
        viewport: { width: 1100, height: 1400 },
        reducedMotion: "reduce",
      });
      page.on("pageerror", e => errors.push(`${who}: ${e.message}`));
      page.on("console", m => m.type() === "error" && errors.push(`${who}: ${m.text()}`));
      const profile = {
        id: "u1",
        role,
        name: "Тест",
        email: "t@t.test",
        code: "ABC123",
        settings: { level: "a", grade, grades: [grade], workGrade: grade, lang, program },
        seen_oly: [],
      };
      await page.route(/supabase\.co/, r => {
        const u = r.request().url();
        if (u.includes("/rpc/bootstrap")) return r.fulfill({ json: profile });
        if (u.includes("/auth/v1/user"))
          return r.fulfill({ json: { id: "u1", email: "t@t.test", user_metadata: {} } });
        if (r.request().method() !== "GET" && !u.includes("/rpc/"))
          return r.fulfill({ status: 204, body: "" });
        return r.fulfill({ json: [] });
      });
      await page.addInitScript(
        ([l, origin]) => {
          if (location.origin !== origin) return;
          const user = { id: "u1", email: "t@t.test", user_metadata: {}, aud: "authenticated" };
          localStorage.setItem(
            "sb-pyqrdxbomhbpkeplembh-auth-token",
            JSON.stringify({
              access_token: "x",
              refresh_token: "y",
              expires_at: 4102444800,
              expires_in: 3600,
              token_type: "bearer",
              user,
            }),
          );
          localStorage.setItem("math7.prefs", JSON.stringify({ lang: l, date: "2026-12-02" }));
        },
        [lang, base.slice(0, -1)],
      );
      await page.goto(base);
      await page.waitForTimeout(1500);
      for (const [name, sel] of STEPS) {
        if (sel === "INPUT") {
          const input = page.locator("#main input.ans").first();
          if (await input.count()) await input.fill("12");
        } else if (sel) {
          const el = page.locator(sel).first();
          if ((await el.count()) && (await el.isVisible())) await el.click();
        }
        await page.waitForTimeout(250);
        await page.screenshot({ path: path.join(SHOTS, `${who}-${name}.png`) });
      }
      await page.close();
    }
  } finally {
    await browser.close();
    server.close();
  }
  assert.deepEqual(errors, []);
});
