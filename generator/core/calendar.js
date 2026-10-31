// Учебные периоды Эстонии 2026/27 (смещения в днях от 1 сентября)
export const PERIODS = [
  { name: "I", from: "09-01", to: "10-23", w0: 0, weeks: 8 },
  { name: "II", from: "11-02", to: "12-18", w0: 8, weeks: 7 },
  { name: "III", from: "01-04", to: "02-19", w0: 15, weeks: 7 },
  { name: "IV", from: "03-01", to: "04-09", w0: 22, weeks: 6 },
  { name: "V", from: "04-19", to: "06-08", w0: 28, weeks: 7 },
];

export function schoolPos(date) {
  // -> {weeks, period (index), inBreak, before, after}
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const y0 = d.getMonth() >= 8 ? d.getFullYear() : d.getFullYear() - 1;
  const mk = (md, afterNY) => {
    const [m, dd] = md.split("-").map(Number);
    return new Date(m >= 9 ? y0 : y0 + 1, m - 1, dd);
  };
  const start = mk(PERIODS[0].from);
  if (d < start) return { weeks: 0, period: -1, before: true };
  for (let i = 0; i < PERIODS.length; i++) {
    const p = PERIODS[i],
      a = mk(p.from),
      b = mk(p.to);
    if (d >= a && d <= b) {
      const w = Math.min(p.weeks, Math.floor((d - a) / 864e5 / 7));
      return { weeks: p.w0 + w, period: i, inBreak: false, weekInPeriod: w };
    }
    const next = PERIODS[i + 1];
    if (d > b && (!next || d < mk(next.from))) {
      return { weeks: p.w0 + p.weeks, period: i, inBreak: true, after: !next };
    }
  }
  return { weeks: 35, period: 4, after: true };
}
