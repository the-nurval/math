// Секундомер и таймер работы.
// Кнопки с data-act="имя" вызывают одноимённую функцию; a — нажатая кнопка.
import { st } from "../state.js";
import { renderBar } from "../ui/bar.js";

export const timerActions = {
  pause(a) {
    st.running = false;
    renderBar();
  },
  play(a) {
    st.running = true;
    renderBar();
  },
  reset(a) {
    st.elapsed = 0;
    st.laps = [];
    st.lapStart = 0;
    st.blockTime = {};
    renderBar();
  },
  lap(a) {
    if (st.elapsed > st.lapStart) {
      st.laps.push(st.elapsed - st.lapStart);
      st.lapStart = st.elapsed;
    }
    renderBar();
  },
};
