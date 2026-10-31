// Math Check: точка входа интерфейса.
import { useLang } from "./i18n/index.js";
import { st } from "./state.js";
import { initAuth, readEmailLinks, watchPresence } from "./services/auth.js";
import { watchOnline } from "./services/results.js";
import { bindSummary } from "./ui/summary.js";
import { startTimer } from "./ui/bar.js";
import { bindEvents } from "./events.js";
import { applyTheme } from "./services/prefs.js";
import { placeThumbs } from "./ui/controls.js";
import { navShadow, renderAll } from "./ui/render.js";

// Запуск: язык, ссылки из писем, фоновые слушатели, первый рендер, вход.
useLang(st.lang);
readEmailLinks();
watchOnline();
watchPresence();
bindSummary();
startTimer();
bindEvents();

applyTheme();

renderAll();

initAuth();

window.addEventListener("scroll", navShadow, { passive: true });

navShadow();

window.addEventListener("resize", () => placeThumbs());
// шрифт догрузился — ширина кнопок изменилась, подложки переключателей ставим заново
if (document.fonts) document.fonts.addEventListener("loadingdone", () => placeThumbs());
