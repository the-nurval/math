// Отправляет письма из таблицы outbox через SMTP (SpaceMail, info@nurval.ee).
// Кого и о чём уведомить, решает база (функции invite_*, ask_help, request_delete, confirm_delete, unlink), а не браузер.
// Секреты задаются в Supabase → Edge Functions → Secrets:
//   SMTP_HOST=mail.spacemail.com  SMTP_PORT=465  SMTP_USER=info@nurval.ee  SMTP_PASS=…
//   MAIL_FROM_NAME=Math Check  SITE_URL=https://math-nurval.vercel.app
import nodemailer from "npm:nodemailer@6.9.16";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const TAG = "[Math Check]";
type Stats = { works: number; avg: number | null; time: number; oly: number; oly_total?: number; best?: number | null; best_at?: string; growth?: number | null;
  topics: { name: string; color: string; pc: number }[]; weeks: { start: string; pc: number | null }[] };
type P = { from_name?: string; from_email?: string; title?: string; invite_id?: string; student_name?: string; token?: string; self?: boolean;
  name?: string; email?: string; role?: string; until?: string; stats?: Stats | null };
type M = { subject: string; title: string; body: string; cta?: string; href?: string; danger?: boolean; note?: string; extra?: string; after?: string };
// ---- TEMPLATE START ----
const DL: Record<string, string> = { ru: "ru-RU", et: "et-EE", en: "en-GB" };
const fmtDate = (iso: string | undefined, lang: string) =>
  iso ? new Date(iso).toLocaleDateString(DL[lang] || "ru-RU", { timeZone: "Europe/Tallinn", day: "2-digit", month: "2-digit", year: "numeric" }) : "";

// links: login — вход в один клик (если есть), site — сайт, invite — страница приглашения, del — подтверждение удаления
type Links = { site: string; login?: string; invite?: string; del?: string };

function msg(kind: string, lang: string, p: P, to: string, ln: Links): M {
  const who = (p.from_name || "").trim() || p.from_email || "";
  const em = p.from_email ? ` (${p.from_email})` : "";
  const nm = (p.name || "").trim() || p.email || "";
  const until = fmtDate(p.until, lang);
  const inv = ln.invite ? { href: ln.login || ln.invite } : {};
  const back = (l: string, ty = false) => ln.login && ln.invite ? ({
    ru: ty ? `Кнопка сразу входит в Math Check с почтой ${to}. Если она уже не работает, открой приглашение: ${ln.invite}` : `Кнопка сразу входит в Math Check с почтой ${to}. Если она уже не работает, откройте приглашение: ${ln.invite}`,
    et: `Nupp logib kohe sisse e-postiga ${to}. Kui see enam ei tööta, ava kutse: ${ln.invite}`,
    en: `The button signs you in to Math Check with ${to} right away. If it no longer works, open the invitation: ${ln.invite}`,
  } as Record<string, string>)[l] : undefined;
  const L: Record<string, Record<string, M>> = {
    ru: {
      invite_child: { subject: "Тебя пригласили в Math Check", title: `${who} приглашает тебя в Math Check`, body: `Решай контрольные по математике, а ${who}${em} будет видеть твои успехи и сможет помочь с трудными заданиями.`, cta: "Принять приглашение", ...inv, note: back("ru", true) || `Входи с этой почтой — ${to}, тогда приглашение сработает само.` },
      parent_wants_child: { subject: "Родитель хочет видеть твои результаты", title: `${who} хочет видеть твои результаты`, body: `Зайди в Math Check и подтверди, что это твой родитель${em}.`, cta: "Подтвердить" },
      invite_parent_by_child: { subject: "Ваш ребёнок приглашает вас в Math Check", title: `${who} приглашает вас в Math Check`, body: "Ваш ребёнок решает контрольные по математике и хочет, чтобы вы видели его результаты и могли помочь с трудными заданиями.", cta: "Принять приглашение", ...inv, note: back("ru") || `Войдите с этой почтой — ${to}, и вы сразу будете подключены.` },
      invite_parent_by_parent: { subject: "Вас пригласили вторым родителем", title: "Вас пригласили вторым родителем", body: `${who}${em} приглашает вас следить за успехами ученика${p.student_name ? " " + p.student_name : ""} в Math Check.`, cta: "Принять приглашение", ...inv, note: back("ru") || `Войдите с этой почтой — ${to}, и вы сразу будете подключены.` },
      child_added_you: { subject: "Ваш ребёнок подключил вас", title: `${who} подключил(а) вас к своему профилю`, body: "Теперь вы видите результаты работ и просьбы о помощи.", cta: "Открыть Math Check" },
      parent_added_you: { subject: "Вас подключили к ученику", title: "Вас подключили вторым родителем", body: `${who}${em} подключил(а) вас к ученику. Теперь вы видите его результаты и просьбы о помощи.`, cta: "Открыть Math Check" },
      help: { subject: `${who} просит помочь с заданием`, title: `${who} просит помочь`, body: `Задание: ${p.title}. Задание и ответ ученика — в разделе «Просьбы о помощи».`, cta: "Открыть задание" },
      delete_confirm: p.self
        ? { subject: "Подтвердите удаление аккаунта", title: "Подтвердите удаление аккаунта", body: `Кто-то (скорее всего вы) попросил удалить аккаунт ${p.email} в Math Check. Нажмите кнопку, чтобы подтвердить. Ссылка действует 24 часа.`, cta: "Удалить аккаунт", href: ln.del, danger: true, note: "Если вы не просили удалять аккаунт — ничего не делайте, он останется как есть." }
        : { subject: "Подтвердите удаление аккаунта ученика", title: "Подтвердите удаление аккаунта ученика", body: `Вы попросили удалить аккаунт ученика ${nm} (${p.email}) в Math Check. Нажмите кнопку, чтобы подтвердить. Ссылка действует 24 часа.`, cta: "Удалить аккаунт", href: ln.del, danger: true, note: "Если вы передумали — ничего не делайте, аккаунт останется как есть." },
      farewell: p.role === "parent"
        ? { subject: "Аккаунт удалён", title: "Нам будет вас не хватать", body: `Аккаунт ${p.email} удалён. Его можно восстановить до ${until}: просто войдите с этой же почтой. После этой даты всё удалится навсегда.`, cta: "Восстановить аккаунт" }
        : p.self
        ? { subject: "Твои итоги в Math Check", title: `${nm}, вот что у тебя получилось`, body: "Спасибо, что занимался в Math Check. Мы собрали твои итоги — пусть останутся на память.", cta: "Восстановить аккаунт", after: `Передумаешь — аккаунт можно восстановить до <b>${until}</b>: просто войди с этой же почтой.` }
        : { subject: `Итоги ученика ${nm} в Math Check`, title: `Итоги ученика ${nm}`, body: `Аккаунт ученика ${nm} удалён. Мы собрали его итоги — пусть останутся на память.`, after: `${esc(nm)} может восстановить аккаунт до <b>${until}</b> — мы отправили ему письмо об этом.` },
      child_deleted: { subject: "Твой аккаунт удалён", title: `${who} удалил(а) твой аккаунт в Math Check`, body: `Если ты не согласен, аккаунт можно восстановить до ${until}. Все работы и прогресс вернутся, связь с родителями сохранится.`, cta: "Восстановить аккаунт", note: "После восстановления ты сам решаешь, оставить связь с родителем или отвязаться — это можно сделать в профиле." },
      second_deleted: { subject: `Аккаунт ученика ${nm} удалён`, title: `${who} удалил(а) аккаунт ученика ${nm}`, body: `Аккаунт ${nm} в Math Check удалён. ${nm} может восстановить его до ${until} — тогда вы снова увидите его работы. После этой даты аккаунт удалится навсегда.` },
      unlinked: { subject: `${who} отвязал(а) свой аккаунт`, title: `${who} отвязал(а) свой аккаунт от вашего`, body: `Вы больше не видите работы и просьбы о помощи ученика ${who} в Math Check. Если это недоразумение — поговорите с ним: подключиться снова можно через новое приглашение.`, cta: "Открыть Math Check" },
      _foot: { subject: "", title: "", body: "Письмо отправлено автоматически из Math Check. Если вы его не ждали, просто удалите его." },
    },
    et: {
      invite_child: { subject: "Sind kutsuti Math Checki", title: `${who} kutsub sind Math Checki`, body: `Lahenda matemaatika kontrolltöid ning ${who}${em} näeb sinu edusamme ja saab aidata keeruliste ülesannetega.`, cta: "Võta kutse vastu", ...inv, note: back("et") || `Logi sisse selle e-postiga — ${to}, siis kutse toimib ise.` },
      parent_wants_child: { subject: "Vanem soovib näha sinu tulemusi", title: `${who} soovib näha sinu tulemusi`, body: `Ava Math Check ja kinnita, et see on sinu vanem${em}.`, cta: "Kinnita" },
      invite_parent_by_child: { subject: "Teie laps kutsub teid Math Checki", title: `${who} kutsub teid Math Checki`, body: "Teie laps lahendab matemaatika kontrolltöid ja soovib, et näeksite tema tulemusi ning saaksite aidata keeruliste ülesannetega.", cta: "Võta kutse vastu", ...inv, note: back("et") || `Logige sisse selle e-postiga — ${to}, ja teid ühendatakse kohe.` },
      invite_parent_by_parent: { subject: "Teid kutsuti teiseks vanemaks", title: "Teid kutsuti teiseks vanemaks", body: `${who}${em} kutsub teid jälgima õpilase${p.student_name ? " " + p.student_name : ""} edusamme Math Checkis.`, cta: "Võta kutse vastu", ...inv, note: back("et") || `Logige sisse selle e-postiga — ${to}, ja teid ühendatakse kohe.` },
      child_added_you: { subject: "Teie laps ühendas teid", title: `${who} ühendas teid oma profiiliga`, body: "Nüüd näete tööde tulemusi ja abipalveid.", cta: "Ava Math Check" },
      parent_added_you: { subject: "Teid ühendati õpilasega", title: "Teid ühendati teise vanemana", body: `${who}${em} ühendas teid õpilasega. Nüüd näete tema tulemusi ja abipalveid.`, cta: "Ava Math Check" },
      help: { subject: `${who} palub abi ülesandega`, title: `${who} palub abi`, body: `Ülesanne: ${p.title}. Ülesanne ja õpilase vastus on jaotises «Abipalved».`, cta: "Ava ülesanne" },
      delete_confirm: p.self
        ? { subject: "Kinnitage konto kustutamine", title: "Kinnitage konto kustutamine", body: `Keegi (tõenäoliselt teie) palus kustutada Math Checki konto ${p.email}. Kinnitamiseks vajutage nuppu. Link kehtib 24 tundi.`, cta: "Kustuta konto", href: ln.del, danger: true, note: "Kui te ei palunud kontot kustutada, ärge tehke midagi — konto jääb alles." }
        : { subject: "Kinnitage õpilase konto kustutamine", title: "Kinnitage õpilase konto kustutamine", body: `Palusite kustutada õpilase ${nm} (${p.email}) Math Checki konto. Kinnitamiseks vajutage nuppu. Link kehtib 24 tundi.`, cta: "Kustuta konto", href: ln.del, danger: true, note: "Kui mõtlesite ümber, ärge tehke midagi — konto jääb alles." },
      farewell: p.role === "parent"
        ? { subject: "Konto on kustutatud", title: "Meil hakkab teist puudus", body: `Konto ${p.email} on kustutatud. Selle saab taastada kuni ${until}: logige lihtsalt sama e-postiga sisse. Pärast seda kustub kõik jäädavalt.`, cta: "Taasta konto" }
        : p.self
        ? { subject: "Sinu tulemused Math Checkis", title: `${nm}, vaata, mis sul välja tuli`, body: "Aitäh, et harjutasid Math Checkis. Panime sinu tulemused kokku — jäägu need mälestuseks.", cta: "Taasta konto", after: `Kui mõtled ümber, saab konto taastada kuni <b>${until}</b>: logi lihtsalt sama e-postiga sisse.` }
        : { subject: `Õpilase ${nm} tulemused Math Checkis`, title: `Õpilase ${nm} tulemused`, body: `Õpilase ${nm} konto on kustutatud. Panime tema tulemused kokku — jäägu need mälestuseks.`, after: `${esc(nm)} saab konto taastada kuni <b>${until}</b> — saatsime talle sellest kirja.` },
      child_deleted: { subject: "Sinu konto on kustutatud", title: `${who} kustutas sinu Math Checki konto`, body: `Kui sa pole nõus, saab konto taastada kuni ${until}. Kõik tööd ja edusammud tulevad tagasi, ühendus vanematega säilib.`, cta: "Taasta konto", note: "Pärast taastamist otsustad ise, kas jätad vanemaga ühenduse või eemaldad selle — seda saab teha profiilis." },
      second_deleted: { subject: `Õpilase ${nm} konto on kustutatud`, title: `${who} kustutas õpilase ${nm} konto`, body: `Õpilase ${nm} Math Checki konto on kustutatud. ${nm} saab selle taastada kuni ${until} — siis näete jälle tema töid. Pärast seda kustub konto jäädavalt.` },
      unlinked: { subject: `${who} eemaldas ühenduse`, title: `${who} eemaldas oma konto ühenduse teie omaga`, body: `Te ei näe enam õpilase ${who} töid ja abipalveid Math Checkis. Kui see on arusaamatus, rääkige temaga: uuesti saab ühendada uue kutsega.`, cta: "Ava Math Check" },
      _foot: { subject: "", title: "", body: "Kiri saadeti automaatselt Math Checkist. Kui te seda ei oodanud, kustutage see." },
    },
    en: {
      invite_child: { subject: "You're invited to Math Check", title: `${who} invites you to Math Check`, body: `Take math tests, and ${who}${em} will see your progress and can help with tricky tasks.`, cta: "Accept the invitation", ...inv, note: back("en") || `Sign in with this email — ${to} — and the invitation works by itself.` },
      parent_wants_child: { subject: "A parent wants to see your results", title: `${who} wants to see your results`, body: `Open Math Check and confirm this is your parent${em}.`, cta: "Confirm" },
      invite_parent_by_child: { subject: "Your child invites you to Math Check", title: `${who} invites you to Math Check`, body: "Your child takes math tests and wants you to see their results and help with tricky tasks.", cta: "Accept the invitation", ...inv, note: back("en") || `Sign in with this email — ${to} — and you'll be connected right away.` },
      invite_parent_by_parent: { subject: "You were invited as a second parent", title: "You were invited as a second parent", body: `${who}${em} invites you to follow ${p.student_name ? p.student_name + "'s" : "a student's"} progress in Math Check.`, cta: "Accept the invitation", ...inv, note: back("en") || `Sign in with this email — ${to} — and you'll be connected right away.` },
      child_added_you: { subject: "Your child connected you", title: `${who} connected you to their profile`, body: "You can now see test results and help requests.", cta: "Open Math Check" },
      parent_added_you: { subject: "You were connected to a student", title: "You were connected as a second parent", body: `${who}${em} connected you to a student. You can now see their results and help requests.`, cta: "Open Math Check" },
      help: { subject: `${who} asks for help with a task`, title: `${who} asks for help`, body: `Task: ${p.title}. The task and the student's answer are under “Help requests”.`, cta: "Open the task" },
      delete_confirm: p.self
        ? { subject: "Confirm account deletion", title: "Confirm account deletion", body: `Someone (most likely you) asked to delete the Math Check account ${p.email}. Press the button to confirm. The link works for 24 hours.`, cta: "Delete account", href: ln.del, danger: true, note: "If you didn't ask for this, do nothing — the account stays as it is." }
        : { subject: "Confirm deleting the student's account", title: "Confirm deleting the student's account", body: `You asked to delete ${nm}'s Math Check account (${p.email}). Press the button to confirm. The link works for 24 hours.`, cta: "Delete account", href: ln.del, danger: true, note: "If you changed your mind, do nothing — the account stays as it is." },
      farewell: p.role === "parent"
        ? { subject: "Account deleted", title: "We'll miss you", body: `The account ${p.email} has been deleted. You can restore it until ${until}: just sign in with the same email. After that everything is deleted for good.`, cta: "Restore account" }
        : p.self
        ? { subject: "Your Math Check results", title: `${nm}, here's what you achieved`, body: "Thanks for practising with Math Check. We've gathered your results — keep them as a memory.", cta: "Restore account", after: `Changed your mind? You can restore the account until <b>${until}</b>: just sign in with the same email.` }
        : { subject: `${nm}'s Math Check results`, title: `${nm}'s results`, body: `${nm}'s account has been deleted. We've gathered their results — keep them as a memory.`, after: `${esc(nm)} can restore the account until <b>${until}</b> — we've emailed them about it.` },
      child_deleted: { subject: "Your account was deleted", title: `${who} deleted your Math Check account`, body: `If you don't agree, you can restore it until ${until}. All tests and progress come back, and your parents stay connected.`, cta: "Restore account", note: "After restoring, you decide whether to stay connected to your parent or disconnect — you can do it in your profile." },
      second_deleted: { subject: `${nm}'s account was deleted`, title: `${who} deleted ${nm}'s account`, body: `${nm}'s Math Check account has been deleted. ${nm} can restore it until ${until} — then you'll see their tests again. After that the account is deleted for good.` },
      unlinked: { subject: `${who} disconnected their account`, title: `${who} disconnected their account from yours`, body: `You no longer see ${who}'s tests and help requests in Math Check. If it's a misunderstanding, talk to them: you can connect again with a new invitation.`, cta: "Open Math Check" },
      _foot: { subject: "", title: "", body: "This email was sent automatically by Math Check. If you weren't expecting it, just delete it." },
    },
  };
  const set = L[lang] || L.ru;
  const m = set[kind] || L.ru[kind];
  const extra = kind === "farewell" && p.role !== "parent" && p.stats && p.stats.works ? statsHtml(p.stats, lang) : "";
  return { ...m, subject: `${TAG} ${m.subject}`, href: m.href || ln.site, extra, foot: set._foot.body } as M & { foot: string };
}

const esc = (s: string) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const FONT = "Manrope,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

// итоги ученика в письме: таблицы и фиксированные цвета, без прозрачности (Outlook её не понимает)
function statsHtml(s: Stats, lang: string): string {
  const T = ({
    ru: { works: "работ решено", avg: "средний результат", time: "всего за работами", oly: "олимпиадных задач", of: "из", weeks: "Результаты по неделям", topics: "Темы", h: "ч", m: "мин", best: "Лучший результат", growth: "Рост за месяц" },
    et: { works: "tööd lahendatud", avg: "keskmine tulemus", time: "kokku töödega", oly: "olümpiaadiülesannet", of: "/", weeks: "Tulemused nädalate kaupa", topics: "Teemad", h: "t", m: "min", best: "Parim tulemus", growth: "Kasv kuuga" },
    en: { works: "tests done", avg: "average score", time: "spent on tests", oly: "olympiad problems", of: "of", weeks: "Results by week", topics: "Topics", h: "h", m: "min", best: "Best result", growth: "Growth this month" },
  } as Record<string, Record<string, string>>)[lang] || {} as Record<string, string>;
  const mins = Math.round((s.time || 0) / 60);
  const time = mins >= 60 ? `${Math.floor(mins / 60)} ${T.h} ${mins % 60} ${T.m}` : `${mins} ${T.m}`;
  const tile = (b: string, l: string) => `<td width="50%" style="padding:6px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background:#f3f7fb;border-radius:20px;padding:16px;font-family:${FONT};"><div style="font-size:28px;line-height:1.2;font-weight:800;color:#13203b;">${esc(b)}</div><div style="font-size:13px;line-height:1.4;color:#6b7a90;">${esc(l)}</div></td></tr></table></td>`;
  const olyTxt = s.oly_total ? `${s.oly} ${T.of} ${s.oly_total}` : String(s.oly || 0);
  let h = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:16px -6px 0;width:calc(100% + 12px);">
    <tr>${tile(String(s.works), T.works)}${tile(s.avg != null ? s.avg + "%" : "—", T.avg)}</tr>
    <tr>${tile(s.time ? time : "—", T.time)}${tile(olyTxt, T.oly)}</tr></table>`;
  const h2 = (t: string) => `<div style="margin:24px 0 12px;font-family:${FONT};font-size:17px;font-weight:800;color:#13203b;">${esc(t)}</div>`;
  // столбики по неделям: чем выше результат, тем насыщеннее цвет
  const mix = (pc: number) => { const k = 0.45 + 0.55 * pc / 100; const c = (a: number, b: number) => Math.round(255 + (b - 255) * k).toString(16).padStart(2, "0"); return `#${c(255, 0x3b)}${c(255, 0x6f)}${c(255, 0xe0)}`; };
  let prevM = -1;
  const bars = (s.weeks || []).map((w, i) => {
    const d = new Date(w.start + "T12:00:00Z"); const mo = d.getUTCMonth();
    const lbl = mo !== prevM || i === 0 ? d.toLocaleDateString(DL[lang] || "ru-RU", { month: "short", timeZone: "UTC" }) : ""; prevM = mo;
    const hpx = w.pc == null ? 4 : Math.max(6, Math.round(w.pc / 100 * 96));
    const col = w.pc == null ? "#e3eaf2" : mix(w.pc);
    return `<td valign="bottom" align="center" style="padding:0 8px 0 0;height:120px;"><div style="width:28px;height:${hpx}px;background:${col};border-radius:8px 8px 4px 4px;font-size:0;line-height:0;" title="${w.pc ?? ""}">&nbsp;</div><div style="height:18px;padding-top:4px;font-family:${FONT};font-size:11px;color:#6b7a90;">${esc(lbl)}</div></td>`;
  }).join("");
  h += h2(T.weeks) + `<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>${bars}</tr></table>`;
  if (s.topics?.length) {
    h += h2(T.topics) + `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">` + s.topics.slice(0, 8).map((t) =>
      `<tr><td style="padding:6px 12px 6px 0;font-family:${FONT};font-size:14px;color:#13203b;"><span style="display:inline-block;width:10px;height:10px;border-radius:5px;background:${esc(t.color)};margin-right:8px;"></span>${esc(t.name)}</td>
       <td width="160" style="padding:6px 12px 6px 0;"><table role="presentation" width="160" cellpadding="0" cellspacing="0" border="0"><tr><td style="background:#e8eef5;border-radius:5px;height:10px;font-size:0;line-height:0;"><div style="width:${Math.max(2, t.pc)}%;height:10px;background:${esc(t.color)};border-radius:5px;font-size:0;line-height:0;">&nbsp;</div></td></tr></table></td>
       <td width="44" align="right" style="padding:6px 0;font-family:${FONT};font-size:14px;font-weight:800;color:#13203b;">${t.pc}%</td></tr>`).join("") + `</table>`;
  }
  const parts = [s.best != null ? `${T.best} — <b>${s.best}%</b> ${fmtDate(s.best_at, lang)}.` : "", s.growth != null && s.growth > 0 ? `${T.growth} — <b>+${s.growth}%</b>.` : ""].filter(Boolean);
  if (parts.length) h += `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:24px;"><tr><td style="background:#e6f6ea;border-radius:16px;padding:14px 16px;font-family:${FONT};font-size:15px;line-height:1.5;color:#13203b;">${parts.join(" ")}</td></tr></table>`;
  return h;
}

// Таблицы и встроенные стили: так письмо одинаково выглядит в Gmail, Outlook и на телефоне.
// Стиль сайта: светлый фон, белая карточка 28 без рамки, кнопка-таблетка, шрифт Manrope (где почта его грузит).
// Выравнивание по DESIGN.md: логотип — по краю карточки; текст в карточке и подпись под ней — на одной линии (+24 px).
function render(m: M & { foot: string }, url: string): { html: string; text: string } {
  const font = FONT;
  const logo = `${url.replace(/\/$/, "")}/brand/email-logo.png`;
  const btn = m.cta ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px;"><tr><td style="border-radius:24px;background:${m.danger ? "#c2410c" : "#13203b"};">
        <a href="${esc(m.href || url)}" style="display:inline-block;padding:15px 28px;font-family:${font};font-size:16px;font-weight:700;line-height:18px;color:#ffffff;text-decoration:none;border-radius:24px;">${esc(m.cta)}</a>
      </td></tr></table>` : "";
  const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light">
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@500;700;800&display=swap" rel="stylesheet"><title>${esc(m.subject)}</title></head>
<body style="margin:0;padding:0;background:#eef3f8;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(m.body)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#eef3f8;"><tr><td align="center" style="padding:40px 16px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">
    <tr><td style="padding:0 0 24px;"><a href="${esc(url)}" style="text-decoration:none;"><img src="${esc(logo)}" width="180" height="26" alt="Math Check" style="display:block;border:0;width:180px;height:auto;"></a></td></tr>
    <tr><td style="background:#ffffff;border-radius:28px;padding:32px 24px;box-shadow:0 12px 32px rgba(19,32,59,.06);">
      <h1 style="margin:0 0 12px;font-family:${font};font-size:26px;line-height:1.25;font-weight:800;letter-spacing:-.02em;color:#13203b;">${esc(m.title)}</h1>
      <p style="margin:0;font-family:${font};font-size:16px;line-height:1.6;font-weight:500;color:#4a5a72;">${esc(m.body)}</p>
      ${m.extra || ""}
      ${m.after ? `<p style="margin:24px 0 0;font-family:${font};font-size:15px;line-height:1.6;font-weight:500;color:#4a5a72;">${m.after}</p>` : ""}
      ${btn}
      ${m.note ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px;"><tr><td style="background:#f3f7fb;border-radius:16px;padding:14px 16px;font-family:${font};font-size:14px;line-height:1.5;font-weight:500;color:#6b7a90;word-break:break-word;">${esc(m.note)}</td></tr></table>` : ""}
    </td></tr>
    <tr><td style="padding:16px 24px 0;font-family:${font};font-size:12px;line-height:1.6;color:#8a97a8;">${esc(m.foot)}<br><a href="${esc(url)}" style="color:#8a97a8;">${esc(url.replace(/^https?:\/\//, "").replace(/\/$/, ""))}</a></td></tr>
  </table>
</td></tr></table></body></html>`;
  const plain = (x: string) => x.replace(/<[^>]+>/g, "");
  const text = `${m.title}\n\n${m.body}${m.after ? `\n\n${plain(m.after)}` : ""}${m.cta ? `\n\n${m.cta}: ${m.href || url}` : ""}${m.note ? `\n\n${m.note}` : ""}\n\n—\n${m.foot}`;
  return { html, text };
}
// ---- TEMPLATE END ----

// Ссылка «войти в один клик» для приглашения. Если аккаунта с этой почтой ещё нет, Supabase создаёт его по ссылке-приглашению.
// Если ссылку сделать не вышло, кнопка ведёт на страницу приглашения.
// deno-lint-ignore no-explicit-any
async function loginLink(db: any, email: string, redirectTo: string): Promise<string | undefined> {
  for (const type of ["magiclink", "invite"]) {
    try {
      const { data, error } = await db.auth.admin.generateLink({ type, email, options: { redirectTo } });
      if (!error && data?.properties?.action_link) return data.properties.action_link;
    } catch (_) { /* пробуем следующий способ */ }
  }
  return undefined;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  const env = (k: string, d = "") => Deno.env.get(k) ?? d;
  const user = env("SMTP_USER"), pass = env("SMTP_PASS");
  if (!user || !pass) return new Response(JSON.stringify({ error: "smtp_not_configured" }), { status: 200, headers: cors });
  const db = createClient(env("SUPABASE_URL"), env("SUPABASE_SERVICE_ROLE_KEY"));
  const { data: rows } = await db.from("outbox").select("*").is("sent_at", null).is("error", null).order("created_at").limit(20);
  if (!rows?.length) return new Response(JSON.stringify({ sent: 0 }), { headers: cors });
  const transport = nodemailer.createTransport({
    host: env("SMTP_HOST", "mail.spacemail.com"), port: Number(env("SMTP_PORT", "465")), secure: true,
    auth: { user, pass },
  });
  const url = env("SITE_URL", "https://math-nurval.vercel.app");
  let sent = 0;
  for (const r of rows) {
    // Забираем письмо себе: если функцию вызвали два раза одновременно, письмо уйдёт один раз.
    const { data: claimed } = await db.from("outbox").update({ error: "sending" }).eq("id", r.id).is("sent_at", null).is("error", null).select("id");
    if (!claimed?.length) continue;
    const p: P = r.payload || {};
    const site = url.replace(/\/$/, "");
    const ln: Links = { site };
    if (p.invite_id) {
      ln.invite = `${site}/?invite=${p.invite_id}`;
      ln.login = await loginLink(db, r.to_email, ln.invite);
    }
    if (p.token) ln.del = `${site}/?delete=${p.token}`;
    const m = msg(r.kind, r.lang, p, r.to_email, ln);
    const out = render(m as M & { foot: string }, url);
    try {
      await transport.sendMail({ from: { name: env("MAIL_FROM_NAME", "Math Check"), address: user }, to: r.to_email, subject: m.subject, text: out.text, html: out.html, headers: { "X-App": "math-check" } });
      await db.from("outbox").update({ sent_at: new Date().toISOString(), error: null }).eq("id", r.id);
      sent++;
    } catch (e) {
      await db.from("outbox").update({ error: String(e).slice(0, 500) }).eq("id", r.id);
    }
  }
  transport.close();
  return new Response(JSON.stringify({ sent }), { headers: cors });
});
