/* Mock sign-in. There is no server: any valid-looking email + a 6+ character password "works".
   The signed-in user is kept in localStorage["firstsigns.user"] and index.html checks for it. */
(function () {
  const USER_KEY = "firstsigns.user";
  const $ = id => document.getElementById(id);
  let mode = "in";

  try { if (localStorage.getItem(USER_KEY)) { location.replace("index.html"); return; } } catch (e) {}

  function setMode(m) {
    mode = m;
    $("tab-in").setAttribute("aria-selected", String(m === "in"));
    $("tab-up").setAttribute("aria-selected", String(m === "up"));
    $("name-row").hidden = m === "in";
    $("title").textContent = m === "in" ? "Welcome back" : "Create your account";
    $("sub").textContent = m === "in" ? "Sign in to pick up your signs where you left off." : "Save your progress and start your first signs.";
    $("submit").textContent = m === "in" ? "Sign in" : "Create account";
    $("pass").autocomplete = m === "in" ? "current-password" : "new-password";
    showError("");
  }
  function showError(msg) { const e = $("error"); e.textContent = msg; e.hidden = !msg; }
  function finish(user) {
    try { localStorage.setItem(USER_KEY, JSON.stringify(user)); } catch (e) {}
    location.replace("index.html#learn");
  }
  function nameFromEmail(email) {
    const n = email.split("@")[0].replace(/[._-]+/g, " ").trim();
    return n ? n.replace(/\b\w/g, c => c.toUpperCase()) : "Friend";
  }

  document.querySelectorAll(".seg button").forEach(b => b.addEventListener("click", () => setMode(b.dataset.mode)));
  $("form").addEventListener("submit", e => {
    e.preventDefault();
    const email = $("email").value.trim(), pass = $("pass").value, name = $("name").value.trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { showError("Enter a valid email address."); $("email").focus(); return; }
    if (pass.length < 6) { showError("Your password needs at least 6 characters."); $("pass").focus(); return; }
    if (mode === "up" && !name) { showError("Tell us your name so we can say hi."); $("name").focus(); return; }
    finish({ name: mode === "up" ? name : nameFromEmail(email), email, guest: false });
  });
  $("guest").addEventListener("click", () => finish({ name: "Guest", email: "", guest: true }));
})();
