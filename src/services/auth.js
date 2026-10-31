// Вход и профиль: сессия Supabase, приглашения из писем, применение и сохранение настроек.
import { U, useLang } from "../i18n/index.js";
import { LS } from "../lib/storage.js";
import { loadInvites, loadKidExtra, loadKids, loadMyHelp, loadParents } from "./family.js";
import { applyTheme, restoreWork, savePrefs } from "./prefs.js";
import { loadHistory } from "./results.js";
import { sb, sendMail } from "./supabase.js";
import { family, session, st, ui } from "../state.js";
import { renderModal } from "../ui/modal.js";
import { renderAll, renderMain } from "../ui/render.js";

// ссылки из писем: ?invite=… (приглашение) и ?delete=… (подтверждение удаления); из адреса убираем
export function readEmailLinks() {
  const q = new URLSearchParams(location.search);
  const i = q.get("invite"),
    d = q.get("delete");
  if (i) {
    session.pendInv = i;
    LS.set("math7.invite", i);
  }
  if (d) session.delTok = d;
  if (i || d) history.replaceState(null, "", location.pathname + location.hash);
}

export function clearInv() {
  session.pendInv = null;
  session.invInfo = null;
  LS.del("math7.invite");
}

export async function initAuth() {
  if (!sb) {
    session.authState = "out";
    session.authErr = true;
    session.authMsg = "Supabase config missing";
    renderAll();
    return;
  }
  if (session.delTok) {
    const { data, error } = await sb.rpc("confirm_delete", { p_token: session.delTok });
    session.delTok = null;
    session.bye = error ? { err: true } : data;
    if (!error) sendMail();
  }
  if (session.pendInv) {
    const { data } = await sb.rpc("invite_info", { p_id: session.pendInv });
    session.invInfo = (data && data[0]) || null;
    if (!session.invInfo) clearInv();
  }
  sb.auth.onAuthStateChange((ev, session) => {
    setTimeout(() => onSession(session), 0);
  });
  const { data } = await sb.auth.getSession();
  onSession(data.session);
}

let sessUid;

async function onSession(authSession) {
  const u = authSession ? authSession.user : null;
  const uid = u ? u.id : null;
  if (uid === sessUid) return;
  sessUid = uid;
  session.user = u;
  if (!u) {
    session.authState = "out";
    session.profile = null;
    session.deleted = null;
    st.history = [];
    st.test = null;
    st.meta = null;
    renderAll();
    return;
  }
  // только что подтвердили удаление своего аккаунта: выходим
  if (
    session.bye &&
    !session.bye.err &&
    (u.email || "").toLowerCase() === String(session.bye.email || "").toLowerCase()
  ) {
    ["work", "hist", "queue", "profile"].forEach(k => LS.del("math7." + k + "." + u.id));
    sb.auth.signOut();
    return;
  }
  session.authState = "loading";
  renderAll();
  const meta = u.user_metadata || {};
  const { data, error } = await sb.rpc("bootstrap", { p_name: meta.full_name || meta.name || "" });
  if (error) {
    const cached = LS.get("math7.profile." + u.id);
    if (cached) {
      session.sync = "offline";
      applyProfile(cached);
      return;
    }
    session.authState = "out";
    session.authErr = true;
    session.authMsg = U.authErr + error.message;
    renderAll();
    return;
  }
  if (data && data.deleted_at) {
    session.profile = null;
    session.deleted = data;
    session.authState = "deleted";
    renderAll();
    return;
  }
  if (!data || !data.id) {
    session.authState = "role";
    renderAll();
  } else applyProfile(data);
  if (session.pendInv) checkInvite(u, data && data.id ? data : null);
}

// вошли по приглашению: та же почта — приглашение уже сработало; другая — спрашиваем
async function checkInvite(u, prof) {
  let info = session.invInfo;
  if (!info) {
    const { data } = await sb.rpc("invite_info", { p_id: session.pendInv });
    info = (data && data[0]) || null;
  }
  if (!info || String(info.email).toLowerCase() === (u.email || "").toLowerCase()) {
    clearInv();
    return;
  }
  if (prof && prof.role !== info.role) {
    clearInv();
    ui.modal = { type: "invrole", isP: info.role === "parent" };
    renderModal();
    return;
  }
  ui.modal = { type: "invother", info };
  renderModal();
}

export function applyProfile(p) {
  session.profile = p;
  session.authState = "in";
  LS.set("math7.profile." + p.id, p);
  const s = p.settings || {};
  st.name = p.name || "";
  ["level", "theme", "lang", "grade", "year", "grades", "mix", "workGrade", "program"].forEach(
    k => {
      if (s[k] != null) st[k] = s[k];
    },
  );
  // классы в навбаре не выбирались — показываем свой класс из профиля
  if (s.grades == null) st.grades = [Number(st.grade)];
  st.seen = p.seen_oly || [];
  useLang(st.lang);
  applyTheme();
  savePrefs();
  if (p.role === "student") {
    st.view = "main";
    restoreWork();
    loadHistory();
    loadParents();
    loadMyHelp();
  } else {
    st.view = "kids";
    loadKids();
  }
  loadInvites();
  renderAll();
}

export async function createProfile(role) {
  const nameEl = document.getElementById("f-rname");
  const meta = session.user.user_metadata || {};
  const name = ((nameEl && nameEl.value) || meta.full_name || meta.name || "").trim();
  const { data, error } = await sb.rpc("create_profile", {
    p_role: role,
    p_name: name,
    p_settings: { level: st.level, theme: st.theme, lang: st.lang },
  });
  if (error) {
    session.authErr = true;
    session.authMsg = U.authErr + error.message;
    renderMain();
    return;
  }
  applyProfile(data);
}

let profT = null;

export function saveProfile() {
  savePrefs();
  if (!session.profile || !sb) return;
  clearTimeout(profT);
  profT = setTimeout(async () => {
    const upd = {
      name: st.name,
      settings: {
        level: st.level,
        theme: st.theme,
        lang: st.lang,
        grade: st.grade,
        year: st.year,
        grades: st.grades,
        mix: st.mix,
        workGrade: st.workGrade,
        program: st.program,
      },
      seen_oly: st.seen.slice(-200),
    };
    Object.assign(session.profile, upd);
    LS.set("math7.profile." + session.profile.id, session.profile);
    await sb.from("profiles").update(upd).eq("id", session.profile.id);
  }, 600);
}

function touch() {
  if (sb && session.profile && document.visibilityState === "visible")
    sb.rpc("touch").then(
      () => {},
      () => {},
    );
}

export function watchPresence() {
  setInterval(
    () => {
      touch();
      if (session.profile) {
        if (session.profile.role === "student") loadParents();
        else {
          loadKids();
          if (family.kid && st.view === "kid") loadKidExtra(family.kid.student_id);
        }
      }
    },
    5 * 60 * 1000,
  );
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") touch();
  });
}
