// Семья на сервере: родители, ученики, приглашения, просьбы о помощи.
import { sb, sendMail } from "./supabase.js";
import { family, session, st, ui } from "../state.js";
import { renderModal } from "../ui/modal.js";
import { renderMain } from "../ui/render.js";

export async function loadMyHelp() {
  if (!sb || !session.user) return;
  const { data } = await sb
    .from("help")
    .select("*")
    .eq("student_id", session.user.id)
    .eq("done", false)
    .order("created_at");
  family.myHelp = data || [];
  refreshIf();
}

export async function askHelp(cid, k, title, replace) {
  const { data, error } = await sb.rpc("ask_help", {
    p_cid: cid,
    p_key: k,
    p_title: title,
    p_replace: !!replace,
  });
  if (error) {
    if (/list_full/.test(error.message)) {
      ui.modal = { type: "full", cid, k, title, oldest: family.myHelp[0] };
      renderModal();
    }
    return;
  }
  if (data === "sent") sendMail();
  await loadMyHelp();
  renderMain();
}

export async function loadParents() {
  if (!sb) return;
  const { data } = await sb.rpc("my_parents");
  family.parents = data || [];
  const pend = family.parents.find(p => p.status === "pending");
  if (pend && !ui.modal) {
    ui.modal = { type: "ask", p: pend };
    renderModal();
  }
  refreshIf();
}

export async function loadKids() {
  if (!sb) return;
  const { data } = await sb.rpc("my_students");
  family.kids = data || [];
  if (family.kid) {
    const k = family.kids.find(x => x.student_id === family.kid.student_id);
    if (k) family.kid = k;
  }
  refreshIf();
}

export async function loadInvites() {
  if (!sb || !session.user) return;
  const { data } = await sb
    .from("invites")
    .select("id,email,role,student_id,kind,invited_by")
    .order("created_at");
  family.myInvites = data || [];
  refreshIf();
}

export async function loadKidExtra(id) {
  const [a, b] = await Promise.all([
    sb.rpc("student_parents", { p_student: id }),
    sb
      .from("help")
      .select("*")
      .eq("student_id", id)
      .order("created_at", { ascending: false })
      .limit(100),
  ]);
  family.kidParents = a.data || [];
  family.kidHelp = b.data || [];
  refreshIf();
}

export async function openKid(id) {
  family.kid = family.kids.find(k => k.student_id === id);
  if (!family.kid) return;
  family.kidParents = [];
  family.kidHelp = [];
  const { data } = await sb
    .from("results")
    .select("data")
    .eq("student_id", id)
    .order("ts", { ascending: false })
    .limit(1000);
  family.kidHist = (data || []).map(r => r.data);
  const pr = await sb.from("profiles").select("settings").eq("id", id).maybeSingle();
  family.kid.level = pr.data && pr.data.settings && pr.data.settings.level;
  st.view = "kid";
  renderMain();
  window.scrollTo({ top: 0 });
  loadKidExtra(id);
}

export function refreshIf() {
  if (
    ["profile", "kids", "kid", "account", "me"].includes(st.view) &&
    !document.activeElement.matches("input.txt")
  )
    renderMain();
}

export function hasParent() {
  return family.parents.some(p => p.status === "active");
}
