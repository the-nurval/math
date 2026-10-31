// Лист работы: блоки заданий, поля ответа, проверка и разбор.
import { GEN } from "../../../generator/index.js";
import { LETTERS, LV, U } from "../../i18n/index.js";
import { esc, fmtD, fmtTime, parseDate } from "../../lib/format.js";
import { helpBtn } from "../family/parts.js";
import { st } from "../../state.js";
import { ICON_BOOK2, ICON_EXPAND, ICON_SHRINK } from "../../ui/icons.js";
import { G, topicName } from "../../work/grades.js";
import { totals } from "../../work/test.js";

function inputFor(it, k, ctx) {
  const v = ctx.answers[k],
    dis = ctx.checked ? "disabled" : "";
  const a = it.ans;
  if (a.type === "choice")
    return `<div class="opts">${it.opts.map(([key, l]) => `<button class="opt" type="button" data-k="${k}" data-opt="${key}" aria-pressed="${v === key}" ${dis}>${l}</button>`).join("")}</div>`;
  if (a.type === "std") {
    const vv = Array.isArray(v) ? v : ["", ""];
    return `<span class="ansline"><input class="ans small" id="in-${k}-0" data-k="${k}" data-i="0" value="${esc(vv[0])}" aria-label="a" autocomplete="off" ${dis}> <span class="eq">· 10^</span> <input class="ans small" id="in-${k}-1" data-k="${k}" data-i="1" value="${esc(vv[1])}" aria-label="n" autocomplete="off" ${dis}></span>`;
  }
  if (a.type === "self")
    return `<textarea class="proof" id="in-${k}" data-k="${k}" placeholder="${esc(U.yourProof)}" ${dis}>${esc(ctx.answers[k + "t"] || "")}</textarea>`;
  return `<span class="ansline">${it.pre ? `<span class="eq">${it.pre}</span>` : ""}<input class="${a.type === "set" ? "ans wide" : "ans"}" id="in-${k}" data-k="${k}" value="${esc(v)}" autocomplete="off" ${dis}>${it.unit ? `<span class="eq">${it.unit}</span>` : ""}</span>`;
}

export function sheetHtml(ctx) {
  const t = ctx.test,
    T = totals(t, ctx.answers),
    m = ctx.meta;
  const topics = (m.only && m.only.length ? m.only : t.cur).map(topicName).join(" · ");
  const timed = ctx.timeSec > 0;
  let h = `<section class="sheet"><div class="sheet-head"><div class="sh-top"><div><h2>${esc(topics)}</h2><p class="sub">${U.ty[m.type]} · ${LV[m.level]} · ${fmtD(parseDate(m.date))} · ${U.maxpts} ${T.max} ${U.pts}</p></div>${ctx.focusBtn ? `<button class="pill-btn" type="button" data-act="focus">${st.focus ? U.normalView + ICON_SHRINK : U.expand + ICON_EXPAND}</button>` : ""}</div>`;
  h += `<p class="hint">${U.hint}</p>`;
  if (ctx.checked) {
    const pct = T.max ? Math.round((T.got / T.max) * 100) : 0;
    h += `<div class="score" aria-live="polite"><span class="big">${T.got} / ${T.max}</span><div class="meter"><i style="width:${pct}%"></i></div>${ctx.timeUp ? `<span class="note">${U.timeUp}</span>` : ""}
      <ul>${T.per.map((p, i) => `<li>${U.task} ${i + 1}${t.blocks[i].star ? "*" : ""}: <b>${p.g}/${p.m}</b>${timed && ctx.blockTime[i] ? ` · ${fmtTime(ctx.blockTime[i])}` : ""}</li>`).join("")}${timed ? `<li>${U.time}: <b>${fmtTime(ctx.timeSec)}</b></li>` : ""}</ul>${ctx.laps && ctx.laps.length ? `<ul><li>${U.laps}:</li>${ctx.laps.map((s, i) => `<li>${i + 1} — <b>${fmtTime(s)}</b></li>`).join("")}</ul>` : ""}</div>`;
  }
  t.blocks.forEach((b, bi) => {
    const p = T.per[bi];
    h += `<div class="task" data-block="${bi}"><div class="task-h"><h3>${bi + 1}${b.star ? '<span class="star">*</span>' : ""}. ${esc(b.title)}</h3><span class="pts">${b.items.length > 1 ? U.ptsEach(b.pts) : U.ptsOne(b.pts)}</span>${GEN.summary(b.grade || m.grade || 7, b.topic) ? `<button class="sumbtn" type="button" data-act="sum" data-g="${b.grade || m.grade || 7}" data-t="${esc(b.topic)}">${ICON_BOOK2}<span>${U.sumBtn}</span></button>` : ""}${ctx.checked && timed && ctx.blockTime[bi] ? `<span class="tm">${fmtTime(ctx.blockTime[bi])}</span>` : ""}${ctx.checked ? `<span class="got">${p.g}/${p.m}</span>` : ""}</div>`;
    if (b.intro) h += `<div class="intro">${b.intro}</div>`;
    h += `<div class="items">`;
    b.items.forEach((it, ii) => {
      const k = bi + "-" + ii,
        v = ctx.answers[k];
      const sc = G.score(it, v, b.pts),
        filled = G.isFilled(it, v),
        self = it.ans.type === "self";
      let cls = "item";
      if (ctx.checked) {
        if (self) cls += v === "2" ? " ok" : v === "1" ? " part" : v === "0" ? " bad" : "";
        else cls += sc === b.pts ? " ok" : " bad";
      }
      const lbl = b.items.length > 1 ? `<span class="lbl">${LETTERS[st.lang][ii]})</span>` : "";
      const plainQ = it.q.replace(/<[^>]+>/g, "");
      const isText =
        /<svg/.test(it.q) || (/[a-zA-Zа-яА-ЯõäöüÕÄÖÜ]{3,}/.test(plainQ) && plainQ.length > 28);
      const mark =
        ctx.checked && !self ? `<span class="mark">${sc === b.pts ? "✓" : "✗"}</span>` : "";
      const hb = ctx.helpCid
        ? helpBtn(
            ctx.helpCid,
            k,
            `${U.task} ${bi + 1}${b.items.length > 1 ? " " + LETTERS[st.lang][ii] + ")" : ""} · ${b.title}`.replace(
              /<[^>]+>/g,
              "",
            ),
          )
        : "";
      let row = `<div class="row">${lbl}<span class="expr${isText ? " text" : ""}">${it.q}${!isText && !it.pre && it.ans.type === "num" ? ' <span class="eq">=</span>' : ""}</span>${self ? "" : inputFor(it, k, ctx)}${mark}${hb}</div>`;
      if (self) row += inputFor(it, k, ctx);
      let res = "";
      if (ctx.checked) {
        const open = !!ctx.open[k];
        if (self)
          res = `<div class="exp"><p><b>${U.model}:</b></p>${it.exp}</div><div class="selfgrade"><span>${U.selfQ}</span>${U.self.map((l, i) => `<button class="opt" type="button" data-k="${k}" data-self="${i}" aria-pressed="${v === String(i)}" ${ctx.readonly ? "disabled" : ""}>${l}</button>`).join("")}</div>`;
        else
          res = `<div class="res">${sc === b.pts ? `<span class="right">${U.correctPts(b.pts)}</span>` : `<span class="right">${filled ? U.right : U.noAns}: <b>${it.show}</b></span>`}<button class="why" type="button" data-why="${k}" aria-expanded="${open}">${open ? U.hide : U.why}</button></div>${open ? `<div class="exp">${it.exp}${it.alt ? `<div class="alt"><b>${U.alt}.</b> ${it.alt}</div>` : ""}</div>` : ""}`;
      }
      h += `<div class="${cls}${ctx.focus === k ? " focus" : ""}" id="it-${k}">${row}${res}</div>`;
    });
    h += `</div></div>`;
  });
  return h + `</section>`;
}
