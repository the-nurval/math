// Проверка генератора: node --test tests/generator.test.js
// 1) каждый правильный ответ засчитывается, в тексте нет undefined/NaN, в et/en нет кириллицы;
// 2) выдача совпадает со снимком tests/generator-snapshot.json (те же seed → те же работы).
//    Если выдача изменена намеренно: npm run snapshot — и проверить, что изменилось только задуманное.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { createHash } from "node:crypto";
import { GEN } from "../generator/index.js";

const LANGS = ["ru", "et", "en"];
const LEVELS = ["n", "a", "o"];
const TYPES = ["theme", "period"];
const DATES = [
  "2026-09-03",
  "2026-10-20",
  "2026-12-02",
  "2027-01-20",
  "2027-03-10",
  "2027-04-06",
  "2027-05-25",
];
const SEEDS = [1, 7, 42];
const SNAPSHOT = new URL("./generator-snapshot.json", import.meta.url);

const toDate = s => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
};
const programs = n => (GEN.hasProgram(n) ? ["school", "prog"] : ["school"]);

// все работы: класс × программа × язык × уровень × тип × дата × seed
function* allTests() {
  for (const n of GEN.grades())
    for (const program of programs(n)) {
      const g = GEN.grade(n, program);
      for (const lang of LANGS)
        for (const level of LEVELS)
          for (const type of TYPES)
            for (const date of DATES)
              for (const seed of SEEDS) {
                const t = g.buildTest({ date: toDate(date), level, type, lang, seed, seenOly: [] });
                yield { key: [n, program, lang, level, type, date, seed].join("|"), g, lang, t };
              }
    }
}

// видимый ученику текст пункта
const visible = (b, it) =>
  [b.title, b.intro, it.q, it.pre, it.unit, it.show, it.exp, JSON.stringify(it.opts || "")].join(
    " ",
  );

test("правильные ответы засчитываются, текст без undefined/NaN и без кириллицы в et/en", () => {
  const problems = [];
  for (const { key, g, lang, t } of allTests())
    t.blocks.forEach((b, bi) =>
      b.items.forEach((it, ii) => {
        const where = `${key} задание ${bi + 1}.${ii + 1} (${b.tpl})`;
        if (it.ans.type !== "self" && g.score(it, it.plain, b.pts) !== b.pts)
          problems.push(`${where}: ответ «${it.plain}» не засчитан`);
        const text = visible(b, it);
        if (/\bundefined\b|\bNaN\b/.test(text)) problems.push(`${where}: undefined/NaN в тексте`);
        if (lang !== "ru" && /[А-Яа-яЁё]/.test(text))
          problems.push(`${where}: кириллица в ${lang}`);
      }),
    );
  assert.deepEqual(problems.slice(0, 20), [], `проблем: ${problems.length}`);
});

test("выдача совпадает со снимком", () => {
  const now = {};
  for (const { key, t } of allTests())
    now[key] = createHash("sha1").update(JSON.stringify(t)).digest("hex");
  if (process.env.UPDATE_SNAPSHOT || !fs.existsSync(SNAPSHOT)) {
    fs.writeFileSync(SNAPSHOT, JSON.stringify(now, null, 0) + "\n");
    return;
  }
  const saved = JSON.parse(fs.readFileSync(SNAPSHOT, "utf8"));
  const changed = Object.keys({ ...saved, ...now }).filter(k => saved[k] !== now[k]);
  assert.deepEqual(changed.slice(0, 20), [], `изменилось работ: ${changed.length}`);
});
