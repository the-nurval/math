// Разбор ответа ученика и проверка: числа, дроби, множества, выбор; начисление баллов.
import { gcd } from "./rational.js";

export function parseNum(raw) {
  if (raw == null) return NaN;
  let s = String(raw).trim().replace(/[−–—]/g, "-").replace(/ | /g, " ");
  s = s.replace(/[a-zA-Zа-яА-ЯõäöüÕÄÖÜ°%€²³‰.]+$/, m => m.replace(/[^.]/g, "")); // хвост с единицами
  s = s.replace(/[a-zA-Zа-яА-ЯõäöüÕÄÖÜ°%€²³‰]+$/, "").trim();
  s = s.replace(/^\((.*)\)$/, "$1").trim();
  if (/^[+-]?\d{1,3}( \d{3})+([.,]\d+)?$/.test(s)) s = s.replace(/ /g, "");
  s = s.replace(/,/g, ".");
  if (!s) return NaN;
  let pm = s.match(/^([+-]?)(\d*)\.(\d*)\((\d+)\)$/);
  if (pm) {
    const w = +(pm[2] || 0),
      a = pm[3],
      per = pm[4];
    const A = a ? +a : 0,
      la = a.length,
      lp = per.length;
    const num = +(a + per) - A,
      den = Math.pow(10, la) * (Math.pow(10, lp) - 1);
    const v = w + num / den;
    return pm[1] === "-" ? -v : v;
  }
  let m = s.match(/^([+-]?)\s*(\d+)\s+(\d+)\s*\/\s*(\d+)$/);
  if (m) {
    if (+m[4] === 0) return NaN;
    const v = +m[2] + +m[3] / +m[4];
    return m[1] === "-" ? -v : v;
  }
  m = s.match(/^([+-]?)\s*(\d*\.?\d+)\s*\/\s*(\d*\.?\d+)$/);
  if (m) {
    if (+m[3] === 0) return NaN;
    const v = +m[2] / +m[3];
    return m[1] === "-" ? -v : v;
  }
  m = s.match(/^([+-]?)\s*(\d+\.?\d*|\.\d+)$/);
  if (m) return m[1] === "-" ? -+m[2] : +m[2];
  return NaN;
}

function closeEnough(x, ans) {
  if (isNaN(x)) return false;
  const v = ans.v;
  if (ans.tol) return Math.abs(x - v) <= ans.tol + 1e-9;
  if (Math.abs(x - v) < 1e-9 * Math.max(1, Math.abs(v))) return true;
  if (ans.round) return Math.abs(x - v) <= 0.0051; // бесконечная дробь: можно округлить до сотых
  return false;
}

// несократимая дробь: «3/4», «-3/4», смешанное «1 2/3» (если a.mixed), целое — если ответ целый
function fracOk(raw, a) {
  const s = String(raw).trim().replace(/[−–—]/g, "-");
  if (Math.abs(parseNum(s) - a.v) > 1e-9) return false;
  if (/^-?\d+$/.test(s)) return Number.isInteger(a.v);
  let m = s.match(/^-?(\d+)\s*\/\s*(\d+)$/);
  if (m) return gcd(+m[1], +m[2]) === 1 && +m[2] !== 1 && (!a.mixed || +m[1] < +m[2]);
  m = s.match(/^-?(\d+)\s+(\d+)\s*\/\s*(\d+)$/);
  if (m) return +m[2] < +m[3] && gcd(+m[2], +m[3]) === 1;
  return false;
}

export function isFilled(item, val) {
  if (item.ans.type === "std")
    return (
      Array.isArray(val) && String(val[0] || "").trim() !== "" && String(val[1] || "").trim() !== ""
    );
  if (item.ans.type === "self") return val === "0" || val === "1" || val === "2";
  return val != null && String(val).trim() !== "";
}

export function score(item, val, pts) {
  // -> полученные баллы
  const a = item.ans;
  if (!isFilled(item, val)) return 0;
  if (a.type === "self") return val === "2" ? pts : val === "1" ? Math.floor(pts / 2) : 0;
  if (a.type === "choice") return val === a.v ? pts : 0;
  if (a.type === "frac") return fracOk(val, a) ? pts : 0;
  if (a.type === "num") return closeEnough(parseNum(val), a) ? pts : 0;
  if (a.type === "set") {
    const got = String(val)
      .split(";")
      .map(s => s.trim())
      .filter(Boolean)
      .map(parseNum);
    if (got.some(isNaN)) return 0;
    const need = a.vals.slice().sort((x, y) => x - y),
      g = got.slice().sort((x, y) => x - y);
    if (need.length !== g.length) return 0;
    return need.every((v, i) => Math.abs(v - g[i]) <= 0.0051) ? pts : 0;
  }
  if (a.type === "std") {
    const m = parseNum(val[0]),
      e = parseInt(String(val[1]).replace(/[−–—]/g, "-"), 10);
    return Math.abs(m - a.m) < 1e-9 && e === a.e ? pts : 0;
  }
  return 0;
}
