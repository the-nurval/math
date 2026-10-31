// Семья: приглашения, связи ученик—родитель, просьбы о помощи.
// Кнопки с data-act="имя" вызывают одноимённую функцию; a — нажатая кнопка.
import { U } from "../i18n/index.js";
import { LS } from "../lib/storage.js";
import { kidSeen, seenKey } from "../screens/family/kids.js";
import { sortedHist } from "../screens/profile/index.js";
import { applyProfile, clearInv } from "../services/auth.js";
import {
  askHelp,
  loadInvites,
  loadKidExtra,
  loadKids,
  loadMyHelp,
  loadParents,
} from "../services/family.js";
import { errText, sb, sendMail } from "../services/supabase.js";
import { family, session, st, ui } from "../state.js";
import { renderModal } from "../ui/modal.js";
import { renderAll, renderMain } from "../ui/render.js";
import { closeModal } from "../ui/modal.js";
import { renderScreen } from "../ui/render.js";

// ответ ученика на просьбу родителя подключиться: askyes / askno
function answerParentRequest(a, act) {
  const p = ui.modal.p;
  closeModal();
  sb.rpc("answer_parent", { p_parent: p.parent_id, p_yes: act === "askyes" }).then(loadParents);
}

// разбор сохранённой работы i из истории src ("me" — своя, "kid" — ученика) с открытым заданием k
function openReviewAt(i, src, k) {
  st.rv = { i, src, open: { [k]: true }, focus: k };
  st.view = "review";
  renderScreen();
  setTimeout(() => {
    const el = document.getElementById("it-" + k);
    if (el) el.scrollIntoView({ block: "center" });
  }, 50);
}

// приглашение по почте: родителя (invparent), второго родителя (invsecond), ученика (invchild)
function sendInvite(a, act) {
  const inp = document.getElementById("f-inv-" + act);
  const em = ((inp && inp.value) || "").trim();
  if (!em) return;
  a.disabled = true;
  const call =
    act === "invchild"
      ? sb.rpc("invite_child", { p_email: em })
      : sb.rpc("invite_parent", {
          p_email: em,
          p_student: act === "invsecond" ? a.dataset.sid : null,
        });
  call.then(({ data, error }) => {
    family.linkErr = !!error;
    family.linkMsg = error
      ? errText(error.message)
      : data === "invited"
        ? U.okInvited(em)
        : data === "requested"
          ? U.okRequested
          : U.okLinked;
    if (!error) sendMail();
    loadInvites();
    if (session.profile.role === "student") loadParents();
    else {
      loadKids();
      if (family.kid) loadKidExtra(family.kid.student_id);
    }
    renderMain();
  });
}

export const familyActions = {
  seenreset(a) {
    const s = kidSeen();
    s[a.dataset.k] = Date.now();
    LS.set(seenKey(), s);
    renderMain();
  },
  askyes: answerParentRequest,
  askno: answerParentRequest,
  invno(a) {
    clearInv();
    closeModal();
  },
  invswitch(a) {
    closeModal();
    sb.auth.signOut().then(() => {
      session.authMsg = "";
      renderAll();
    });
  },
  invyes(a) {
    a.disabled = true;
    const m = ui.modal;
    const meta = session.user.user_metadata || {};
    sb.rpc("claim_invite", {
      p_id: session.pendInv,
      p_name: meta.full_name || meta.name || "",
    }).then(({ data, error }) => {
      if (error) {
        if (/role_mismatch/.test(error.message)) {
          clearInv();
          ui.modal = { type: "invrole", isP: m.info.role === "parent" };
        } else if (/invite_gone/.test(error.message)) {
          clearInv();
          ui.modal = { type: "invrole", isP: m.info.role === "parent", gone: true };
        } else {
          m.err = errText(error.message);
          ui.modal = m;
        }
        renderModal();
        return;
      }
      clearInv();
      closeModal();
      applyProfile(data);
    });
  },
  unl1(a) {
    const p = family.parents.find(x => x.parent_id === a.dataset.pid);
    if (!p) return;
    ui.modal = { type: "unl", p };
    renderModal();
  },
  unlgo(a) {
    a.disabled = true;
    const m = ui.modal;
    sb.rpc("unlink", { p_parent: m.p.parent_id, p_student: session.user.id }).then(({ error }) => {
      if (error) {
        m.err = errText(error.message);
        renderModal();
        return;
      }
      sendMail();
      closeModal();
      loadParents();
    });
  },
  invparent: sendInvite,
  invchild: sendInvite,
  invsecond: sendInvite,
  uninvite(a) {
    sb.rpc("cancel_invite", { p_id: a.dataset.id }).then(loadInvites);
  },
  unlink(a) {
    sb.rpc("unlink", { p_parent: a.dataset.pid, p_student: a.dataset.sid }).then(() => {
      if (
        a.dataset.pid === session.user.id &&
        family.kid &&
        family.kid.student_id === a.dataset.sid
      ) {
        family.kid = null;
        st.view = "kids";
      }
      loadKids();
      if (family.kid) loadKidExtra(family.kid.student_id);
      renderMain();
    });
  },
  help(a) {
    const cid = a.dataset.cid,
      k = a.dataset.hk;
    if (family.myHelp.some(x => x.result_cid === cid && x.item_key === k)) return;
    if (family.myHelp.length >= 20) {
      ui.modal = { type: "full", cid, k, title: a.dataset.title, oldest: family.myHelp[0] };
      renderModal();
      return;
    }
    a.disabled = true;
    askHelp(cid, k, a.dataset.title, false);
  },
  fullreplace(a) {
    const m = ui.modal;
    closeModal();
    askHelp(m.cid, m.k, m.title, true);
  },
  fullself(a) {
    closeModal();
    st.view = "profile";
    renderScreen();
    setTimeout(() => {
      const el = document.getElementById("later");
      if (el) el.scrollIntoView({ block: "center" });
    }, 60);
  },
  myhelpdel(a) {
    sb.from("help").delete().eq("id", a.dataset.id).then(loadMyHelp);
  },
  myhelpopen(a) {
    const i = sortedHist().findIndex(r => r.cid === a.dataset.cid);
    if (i < 0) return;
    const k = a.dataset.hk;
    openReviewAt(i, "me", k);
  },
  helpopen(a) {
    const list = family.kidHist.slice().sort((x, y) => y.ts - x.ts);
    const i = list.findIndex(r => r.cid === a.dataset.cid);
    if (i < 0) return;
    const k = a.dataset.hk;
    openReviewAt(i, "kid", k);
  },
  helpdone(a) {
    sb.from("help")
      .update({ done: true })
      .eq("id", a.dataset.id)
      .then(() => {
        loadKids();
        loadKidExtra(family.kid.student_id);
      });
  },
};
