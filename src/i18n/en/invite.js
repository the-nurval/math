export default {
  delWarn:
    "The account will be deleted with all tests, history and connections. It can be restored for 30 days, then everything is deleted for good.",
  invLead: (w, isP, sn) =>
    isP
      ? sn
        ? `You'll see ${sn}'s progress and can help with tricky tasks.`
        : "Your child takes math tests and wants you to see their results and help with tricky tasks."
      : `Take math tests, and ${w} will see your progress and can help with tricky tasks.`,
  invTitle: (w, isP) => `${w} invites you to Math Check`,
  invEmail: "Email the invitation was sent to",
  invOther: isP =>
    isP
      ? "You can sign in with another email too — the site will then ask whether to connect you to the student with that email."
      : "You can sign in with another email too — the site will then ask whether to connect the parent to that account.",
  otherTitleS: "Connect the parent to this account?",
  otherTitleP: "Connect to the student with this email?",
  otherText: (a, b) =>
    `The invitation was sent to ${a}, but you signed in with ${b}. That's fine — you can continue with this email.`,
  otherWillS: "will see your tests and help requests",
  otherWillP: "you'll see tests and help requests",
  notNow: "Not now",
  yesConnect: "Yes, connect",
  signOutAs: e => `Sign out and sign in with ${e}`,
  roleMismatch: isP =>
    isP
      ? "This invitation is for a parent, but this is a student account. Sign in with another email to accept it."
      : "This invitation is for a student, but this is a parent account. Sign in with another email to accept it.",
  invGoneTitle: "Invitation unavailable",
  invGone: "This invitation was already used or cancelled.",
  ok: "OK",
  step: (a, b) => `Step ${a} of ${b}`,
  del1Q: "Do you want to delete the account?",
  del1Kid: n => `Delete ${n}'s account?`,
  yesNext: "Yes, continue",
  delWhat: "What will be deleted",
  dWorks: n => `all tests and history — ${n} ${n === 1 ? "test" : "tests"}`,
  dProgress: "progress in topics and olympiad problems",
  dLater: "the “Review later” list",
  dParents: l => `connection to parents: ${l}`,
  dKids: l => `connection to students: ${l}`,
  dInvites: "sent invitations",
  d30: "For 30 days the account can be restored, then everything is deleted for good.",
  confirm: "Confirm",
  del3T: "Confirm the deletion in the email",
  del3Text: e =>
    `We've sent an email to ${e}. The account is deleted only after you press the button in the email. The link works for 24 hours.`,
  del3Kid: "If you change your mind, just don't press the button in the email.",
  kidAccSec: "Student's account",
  kidDelWarn:
    "Delete the student's account with tests and history. The student can restore it for 30 days; we'll let them know by email.",
  byeT: () => "We'll miss you",
  byeText: (e, isP) =>
    isP
      ? `The account ${e} has been deleted.`
      : `The account ${e} has been deleted. We've emailed you your Math Check results.`,
  byeUntil: d =>
    `<b>You can come back until ${d}.</b> Just sign in with the same email — everything will be restored. After that everything is deleted for good.`,
  byeKidT: n => `${n}'s account has been deleted`,
  byeKidText: "We've emailed you the student's results.",
  byeKidUntil: (n, d) => `${n} can restore the account until ${d} — we've let them know by email.`,
  toHome: "Home",
  toKids: "To students",
  linkExpired:
    "The link has expired or was already used. If the account still needs deleting, request it again.",
  restT: "Welcome back!",
  restText: (a, b, isP) =>
    `This account was deleted on ${a}. You can restore it until ${b} — with ${isP ? "all connected students" : "all tests and progress. Parents will be connected again"}.`,
  restore: "Restore account",
  unlinkBtn: "Disconnect",
  unlinkT: "Disconnect from the parent?",
  unlinkText: (n, e) =>
    `${n} (${e}) will no longer see your tests and help requests. We'll let them know by email. You can connect again any time with an invitation.`,
};
