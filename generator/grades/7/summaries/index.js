/* Math Check: конспекты тем 7 класса. Открываются кнопкой «Конспект» у блока заданий.
   t — заголовок, main — главное, ex — пример (q — условие, s — шаги, a — ответ), alt — другой способ, err — частая ошибка. */
import ru from "./ru.js";
import et from "./et.js";
import en from "./en.js";

// { topicId: { ru, et, en } }
const summaries = {};
for (const id of Object.keys(ru)) summaries[id] = { ru: ru[id], et: et[id], en: en[id] };
export default summaries;
