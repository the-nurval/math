// Даты, время и экранирование HTML.
import { st } from "../state.js";

export function todayStr() {
  const d = new Date();
  return (
    d.getFullYear() +
    "-" +
    String(d.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(d.getDate()).padStart(2, "0")
  );
}

export function parseDate(s) {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function fmtTime(sec) {
  sec = Math.max(0, Math.round(sec));
  const m = Math.floor(sec / 60),
    s = sec % 60;
  return m + ":" + String(s).padStart(2, "0");
}

export function loc() {
  return st.lang === "en" ? "en-GB" : st.lang;
}

export function fmtD(d) {
  return d.toLocaleDateString(loc());
}

export const esc = s =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");

export function dayKey(d) {
  return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
}

export function isGmail(e) {
  return /@(gmail|googlemail)\.com$/i.test(String(e || "").trim());
}

export function plus30(iso) {
  const d = new Date(iso);
  d.setDate(d.getDate() + 30);
  return d;
}
