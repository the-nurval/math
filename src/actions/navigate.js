// Переход между экранами: кнопки data-go="экран" (родителю «main» и «profile» показываются как «kids» и «me»).
import { session, st } from "../state.js";
import { enter } from "../ui/motion.js";
import { renderMain, renderNav } from "../ui/render.js";
import { renderScreen } from "../ui/render.js";

export function navigate(go) {
  let to = go.dataset.go;
  const isP = session.profile && session.profile.role === "parent";
  if (isP && to === "main") to = "kids";
  if (isP && to === "profile") to = "me";
  if (session.authState !== "in") {
    if (to === "main") {
      renderMain();
    }
    return;
  }
  if (to === "prog") {
    st.progBack = st.view === "kid" ? "kid" : st.view === "prog" ? st.progBack : "main";
    st.progGrade = go.dataset.pg ? Number(go.dataset.pg) : null;
    st.progPick = null;
    if (st.menuOpen) {
      st.menuOpen = false;
      renderNav();
    }
  }
  if (to === "faq") {
    st.faqBack = st.view === "main" ? "main" : "settings";
    st.faqOpen = go.dataset.faq != null ? Number(go.dataset.faq) : null;
  }
  st.view = to;
  enter(to === "profile" ? "profile" : "screen");
  renderScreen();
  window.scrollTo({ top: 0 });
}
