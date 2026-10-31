/* Math Check: конспекты тем 6 класса. Формат как в s7.js. */
import ru from "./ru.js";
import et from "./et.js";
import en from "./en.js";

// { topicId: { ru, et, en } }
const summaries = {};
for (const id of Object.keys(ru)) summaries[id] = { ru: ru[id], et: et[id], en: en[id] };
export default summaries;
