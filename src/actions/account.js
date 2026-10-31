// Вход, роль, выход, удаление и восстановление аккаунта.
// Кнопки с data-act="имя" вызывают одноимённую функцию; a — нажатая кнопка.
import { U } from "../i18n/index.js";
import { LS } from "../lib/storage.js";
import { applyProfile, createProfile } from "../services/auth.js";
import { loadKids } from "../services/family.js";
import { qKey } from "../services/results.js";
import { errText, sb, sendMail } from "../services/supabase.js";
import { family, session, st, ui } from "../state.js";
import { delCtx, renderModal } from "../ui/modal.js";
import { renderAll, renderMain } from "../ui/render.js";
import { closeModal } from "../ui/modal.js";

export const accountActions = {
  google(a) {
    sb.auth
      .signInWithOAuth({
        provider: "google",
        options: { redirectTo: location.origin + location.pathname },
      })
      .then(({ error }) => {
        if (error) {
          session.authErr = true;
          session.authMsg = U.authErr + error.message;
          renderMain();
        }
      });
  },
  magic(a) {
    const em = (document.getElementById("f-email").value || "").trim();
    if (!em) return;
    a.disabled = true;
    sb.auth
      .signInWithOtp({
        email: em,
        options: { emailRedirectTo: location.origin + location.pathname },
      })
      .then(({ error }) => {
        session.authErr = !!error;
        session.authMsg = error ? U.authErr + error.message : U.linkSent(em);
        renderMain();
      });
  },
  role(a) {
    createProfile(a.dataset.role);
  },
  logout(a) {
    closeModal();
    sb.auth.signOut().then(() => {
      st.test = null;
      st.meta = null;
      st.view = "main";
      session.authMsg = "";
      renderAll();
    });
  },
  mclose(a) {
    closeModal();
  },
  role1(a) {
    ui.modal = { type: "role1" };
    renderModal();
  },
  role2(a) {
    ui.modal = { type: "role2" };
    renderModal();
  },
  d1(a) {
    ui.modal = a.dataset.sid
      ? {
          type: "d1",
          sid: a.dataset.sid,
          name: (family.kid && family.kid.name) || (family.kid && family.kid.email) || "",
        }
      : { type: "d1" };
    renderModal();
  },
  d2(a) {
    ui.modal.type = "d2";
    renderModal();
  },
  dgo(a) {
    a.disabled = true;
    const m = ui.modal;
    sb.rpc("request_delete", { p_target: m.sid || null, p_ctx: delCtx() }).then(
      ({ data, error }) => {
        if (ui.modal !== m) return;
        if (error) {
          m.err = errText(error.message);
          renderModal();
          return;
        }
        sendMail();
        ui.modal = { type: "d3", email: data };
        renderModal();
      },
    );
  },
  byeok(a) {
    const toKids =
      session.profile && session.profile.role === "parent" && session.bye && !session.bye.self;
    session.bye = null;
    if (toKids) {
      family.kid = null;
      st.view = "kids";
      loadKids();
    }
    renderAll();
  },
  restore(a) {
    a.disabled = true;
    sb.rpc("restore_account").then(({ data, error }) => {
      if (error) {
        session.authMsg = U.authErr + error.message;
        renderMain();
        return;
      }
      session.deleted = null;
      session.authMsg = "";
      applyProfile(data);
    });
  },
  rolego(a) {
    a.disabled = true;
    sb.rpc("change_role").then(({ data, error }) => {
      if (error) {
        ui.modal.err = errText(error.message);
        renderModal();
        return;
      }
      closeModal();
      LS.del("math7.work." + session.user.id);
      LS.del("math7.hist." + session.user.id);
      LS.del(qKey());
      st.test = null;
      st.meta = null;
      st.history = [];
      family.parents = [];
      family.kids = [];
      family.kid = null;
      family.myInvites = [];
      applyProfile(data);
    });
  },
};
