/* ═══════════════════════════════════════════════════════════
   KYBERIA TECH — script.js
   Fixed: page nav IDs, lang switcher, apps menu, setLang(),
          shared closeAllDropdowns(), btt null guard.
   ═══════════════════════════════════════════════════════════ */
 
 
/* ─── PAGE NAVIGATION ───────────────────────────────────────
   FIX: removed the erroneous 'page-' prefix.
   HTML IDs are: #home #about #services #work #contact
   ──────────────────────────────────────────────────────────── */
function showPage(id) {
  // Hide all pages, deactivate all nav links
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.sb-lnk').forEach(l => l.classList.remove('active'));
 
  // Show the target page
  const pg = document.getElementById(id);
  if (pg) pg.classList.add('active');
 
  // Activate the matching nav link
  document.querySelectorAll('.sb-lnk').forEach(l => {
    const handler = l.getAttribute('onclick') || '';
    if (handler.includes("'" + id + "'")) l.classList.add('active');
  });
 
  window.scrollTo(0, 0);
}
 
 
/* ─── THEME TOGGLE ──────────────────────────────────────────
   Toggles body.light-mode; persists to localStorage.
   ──────────────────────────────────────────────────────────── */
function toggleTheme() {
  document.body.classList.toggle('light-mode');
  try {
    localStorage.setItem('kt-theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
  } catch (e) {}
}
 
// Restore saved theme on load
try {
  if (localStorage.getItem('kt-theme') === 'light') document.body.classList.add('light-mode');
} catch (e) {}
 
 
/* ─── SHARED DROPDOWN UTILITY ───────────────────────────────
   Closes every open nav dropdown.  Call before opening one.
   ──────────────────────────────────────────────────────────── */
function closeAllDropdowns() {
  document.querySelectorAll('.nav-lang.open, .nav-apps.open').forEach(el => el.classList.remove('open'));
}
 
 
/* ─── LANGUAGE SWITCHER ─────────────────────────────────────
   FIX: uses the existing .nav-lang-dropdown + .open CSS class
   instead of dynamically injecting a second dropdown element.
   ──────────────────────────────────────────────────────────── */
function toggleLang() {
  const navLang = document.getElementById('navLang');
  if (!navLang) return;
 
  const isOpen = navLang.classList.contains('open');
  closeAllDropdowns();
  if (!isOpen) navLang.classList.add('open');
}
 
/* FIX: setLang() was called from HTML but never defined in JS.
   Updates the visible label, flips RTL for Arabic, marks active option. */
function setLang(code, flagEl) {
  const label = document.getElementById('langLabel');
  if (label) label.textContent = code;
 
  // RTL support: Arabic only
  document.documentElement.dir = (code === 'AR') ? 'rtl' : 'ltr';
 
  // Mark the selected option
  document.querySelectorAll('.nav-lang-opt').forEach(o => o.classList.remove('active'));
  const clicked = (typeof flagEl === 'object' && flagEl instanceof Element)
    ? flagEl
    : event?.target?.closest('.nav-lang-opt');
  if (clicked) clicked.classList.add('active');
 
  closeAllDropdowns();
}
 
 
/* ─── APPS / ECOSYSTEM MENU ─────────────────────────────────
   FIX: uses the existing .nav-apps-dropdown + .open CSS class
   instead of dynamically creating a second dropdown element.
   ──────────────────────────────────────────────────────────── */
function toggleApps() {
  const navApps = document.getElementById('navApps');
  if (!navApps) return;
 
  const isOpen = navApps.classList.contains('open');
  closeAllDropdowns();
  if (!isOpen) navApps.classList.add('open');
}
 
 
/* ─── CLOSE ON OUTSIDE CLICK ────────────────────────────────
   Clicking anywhere outside .nav-lang or .nav-apps closes both.
   ──────────────────────────────────────────────────────────── */
document.addEventListener('click', function (e) {
  if (!e.target.closest('.nav-lang') && !e.target.closest('.nav-apps')) {
    closeAllDropdowns();
  }
});
 
 
/* ─── BACK TO TOP ───────────────────────────────────────────
   FIX: null guard — won't throw on pages that don't have #btt.
   ──────────────────────────────────────────────────────────── */
const btt = document.getElementById('btt');
if (btt) {
  window.addEventListener('scroll', () => {
    btt.classList.toggle('visible', window.scrollY > 400);
  });
}
 