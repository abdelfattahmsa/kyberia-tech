/* ═══════════════════════ PAGE NAVIGATION ═══════════════════════ */
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.sb-lnk').forEach(l => l.classList.remove('active'));
  const pg = document.getElementById('page-' + id);
  if (pg) pg.classList.add('active');
  document.querySelectorAll('.sb-lnk').forEach(l => {
    if (l.getAttribute('onclick') && l.getAttribute('onclick').includes("'" + id + "'")) {
      l.classList.add('active');
    }
  });
  window.scrollTo(0, 0);
}

/* ═══════════════════════ THEME TOGGLE ═══════════════════════ */
function toggleTheme() {
  document.body.classList.toggle('light-mode');
  try { localStorage.setItem('kt-theme', document.body.classList.contains('light-mode') ? 'light' : 'dark'); } catch(e){}
}
try {
  if (localStorage.getItem('kt-theme') === 'light') document.body.classList.add('light-mode');
} catch(e){}

/* ═══════════════════════ LANGUAGE SWITCHER ═══════════════════════ */
const langs = [
  { code: 'EN', label: '🇬🇧 English', dir: 'ltr' },
  { code: 'AR', label: '🇸🇦 العربية', dir: 'rtl' },
  { code: 'DE', label: '🇩🇪 Deutsch', dir: 'ltr' },
  { code: 'JA', label: '🇯🇵 日本語', dir: 'ltr' },
  { code: 'KO', label: '🇰🇷 한국어', dir: 'ltr' }
];
let langOpen = false;

function toggleLang() {
  langOpen = !langOpen;
  document.querySelectorAll('.nav-lang').forEach(el => {
    let dropdown = el.querySelector('.lang-dropdown');
    if (!dropdown) {
      dropdown = document.createElement('div');
      dropdown.className = 'lang-dropdown';
      dropdown.style.cssText = 'position:absolute;top:calc(100% + 8px);right:0;background:#111;border:1px solid rgba(255,255,255,.1);min-width:160px;z-index:500;';
      langs.forEach(lang => {
        const item = document.createElement('div');
        item.className = 'nav-apps-item';
        item.textContent = lang.label;
        item.onclick = (e) => {
          e.stopPropagation();
          document.querySelectorAll('.nav-lang span:not(.nav-lang-arrow)').forEach(s => s.textContent = lang.code);
          document.documentElement.dir = lang.dir;
          langOpen = false;
          document.querySelectorAll('.lang-dropdown').forEach(d => d.style.display = 'none');
        };
        dropdown.appendChild(item);
      });
      el.style.position = 'relative';
      el.appendChild(dropdown);
    }
    dropdown.style.display = langOpen ? 'block' : 'none';
  });
  if (langOpen) { appsOpen = false; document.querySelectorAll('.apps-dropdown').forEach(d => d.style.display = 'none'); }
}

/* ═══════════════════════ APPS MENU ═══════════════════════ */
let appsOpen = false;
const appsItems = [
  { icon: '⚗', name: 'Kyberia Labs', desc: 'Experiments & R&D' },
  { icon: '◈', name: 'Kyberia Studio', desc: 'Creative Production' },
  { icon: '✦', name: 'Kyberia Blog', desc: 'Ideas & Insights' }
];

function toggleApps() {
  appsOpen = !appsOpen;
  document.querySelectorAll('.nav-apps').forEach(el => {
    let dropdown = el.querySelector('.apps-dropdown');
    if (!dropdown) {
      dropdown = document.createElement('div');
      dropdown.className = 'apps-dropdown';
      dropdown.style.cssText = 'position:absolute;top:calc(100% + 8px);right:0;background:#111;border:1px solid rgba(255,255,255,.1);min-width:220px;z-index:500;';
      const header = document.createElement('div');
      header.style.cssText = 'padding:10px 16px;font-size:9px;color:#666;letter-spacing:.14em;text-transform:uppercase;border-bottom:1px solid rgba(255,255,255,.07);';
      header.textContent = 'Kyberia Ecosystem';
      dropdown.appendChild(header);
      appsItems.forEach(item => {
        const row = document.createElement('div');
        row.className = 'nav-apps-item';
        row.style.cssText = 'display:flex;align-items:center;gap:12px;padding:10px 16px;cursor:pointer;';
        row.innerHTML = '<span style="font-size:14px;">' + item.icon + '</span><span><strong style="display:block;font-size:12px;">' + item.name + '</strong><span style="font-size:10px;color:#666;">' + item.desc + '</span></span>';
        dropdown.appendChild(row);
      });
      const footer = document.createElement('div');
      footer.style.cssText = 'padding:8px 16px;font-size:9px;color:#444;border-top:1px solid rgba(255,255,255,.07);';
      footer.textContent = 'Part of Peridot Holding';
      dropdown.appendChild(footer);
      el.style.position = 'relative';
      el.appendChild(dropdown);
    }
    dropdown.style.display = appsOpen ? 'block' : 'none';
    const btn = el.querySelector('.nav-apps-btn');
    if (btn) btn.style.color = appsOpen ? '#FF2F92' : '';
  });
  if (appsOpen) { langOpen = false; document.querySelectorAll('.lang-dropdown').forEach(d => d.style.display = 'none'); }
}

/* Close dropdowns on outside click */
document.addEventListener('click', function(e) {
  if (!e.target.closest('.nav-lang') && !e.target.closest('.nav-apps')) {
    langOpen = false; appsOpen = false;
    document.querySelectorAll('.lang-dropdown, .apps-dropdown').forEach(d => d.style.display = 'none');
  }
});

const btt = document.getElementById('btt');
window.addEventListener('scroll', () => {
  btt.classList.toggle('visible', window.scrollY > 400);
});
