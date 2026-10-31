// Результаты работ: история, сохранение на сервер и очередь при отсутствии связи.
import { LS } from "../lib/storage.js";
import { saveProfile } from "./auth.js";
import { refreshIf } from "./family.js";
import { sb } from "./supabase.js";
import { session, st } from "../state.js";

export function qKey() {
  return "math7.queue." + session.user.id;
}

export async function loadHistory() {
  const q = LS.get(qKey()) || [];
  const { data, error } = await sb
    .from("results")
    .select("data")
    .eq("student_id", session.user.id)
    .order("ts", { ascending: false })
    .limit(1000);
  if (error) {
    session.sync = "offline";
    st.history = LS.get("math7.hist." + session.user.id) || [];
  } else {
    st.history = data.map(r => r.data);
    LS.set("math7.hist." + session.user.id, st.history.slice(0, 300));
  }
  const ids = new Set(st.history.map(r => r.cid));
  q.forEach(r => {
    if (!ids.has(r.cid)) st.history.unshift(r);
  });
  flushQueue();
  refreshIf();
}

export async function saveResult(r) {
  r.cid = st.workCid || Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  st.lastCid = r.cid;
  st.seen = Array.from(new Set(st.seen.concat(r.oly || []))).slice(-200);
  st.history = [r].concat(st.history);
  const q = LS.get(qKey()) || [];
  q.push(r);
  LS.set(qKey(), q);
  saveProfile();
  await flushQueue();
}

let flushing = false;

async function flushQueue() {
  if (!session.user || !sb || flushing) return;
  flushing = true;
  let q = LS.get(qKey()) || [];
  while (q.length) {
    const r = q[0];
    const { error } = await sb.from("results").upsert(
      {
        student_id: session.user.id,
        client_id: r.cid,
        ts: new Date(r.ts).toISOString(),
        data: r,
      },
      { onConflict: "student_id,client_id", ignoreDuplicates: true },
    );
    if (error) {
      session.sync = "offline";
      break;
    }
    q.shift();
    LS.set(qKey(), q);
  }
  if (!q.length) {
    session.sync = "ok";
    LS.set("math7.hist." + session.user.id, st.history.slice(0, 300));
  }
  flushing = false;
  refreshIf();
}

export function watchOnline() {
  window.addEventListener("online", flushQueue);
}
