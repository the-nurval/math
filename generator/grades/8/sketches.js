// 8 класс: SVG-чертежи к задачам по геометрии.
export const T_ = (x, y, s, a) =>
  `<text x="${x}" y="${y}" font-size="12" fill="currentColor"${a ? ` text-anchor="${a}"` : ""}>${s}</text>`;

export const G_ = s => `<g fill="none" stroke="currentColor" stroke-width="2">${s}</g>`;

export const D_ = (x1, y1, x2, y2) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="currentColor" stroke-dasharray="4 3"/>`;

export const sk = (h, body) => `<svg class="sk" viewBox="0 0 220 ${h}" role="img">${body}</svg>`;

// прямоугольный треугольник: катеты внизу и слева, гипотенуза
export function svgRT(la, lb, lc) {
  return sk(
    130,
    G_(
      `<polygon points="30,110 190,110 30,20"/><polyline points="30,98 42,98 42,110" stroke-width="1"/>`,
    ) +
      T_(110, 126, la, "middle") +
      T_(24, 68, lb, "end") +
      T_(116, 58, lc),
  );
}

export function svgTrap(la, lb, lh) {
  return sk(
    120,
    G_(`<polygon points="20,100 200,100 150,25 60,25"/>`) +
      D_(60, 25, 60, 100) +
      T_(110, 116, la, "middle") +
      T_(105, 18, lb, "middle") +
      T_(64, 68, lh),
  );
}

export function svgRhomb(l1, l2) {
  return sk(
    120,
    `<polygon points="110,10 190,60 110,110 30,60" fill="none" stroke="currentColor" stroke-width="2"/>` +
      D_(30, 60, 190, 60) +
      D_(110, 10, 110, 110) +
      T_(140, 55, l1) +
      T_(114, 90, l2),
  );
}
