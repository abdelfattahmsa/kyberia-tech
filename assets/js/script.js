/* ================================================================
   KYBERIA TECH — script.js  v2.0
   SPA navigation · SEO · Theme · Language · Menus · BTT · Chat
   ================================================================ */

/* ── PAGE SEO MAP ───────────────────────────────────────────────── */
const pageSEO = {
  home: {
    title: 'Kyberia Tech | Strategy-Led Creative & Technology Studio',
    description: 'Cairo-based global creative and technology studio. Strategy-first branding, graphic design, and custom web development for businesses across 9 countries.',
    keywords: 'creative agency Cairo, branding studio Egypt, web design Cairo, digital agency Middle East'
  },
  about: {
    title: 'About Kyberia Tech | Creative Thinking. Engineering Discipline.',
    description: 'Founded in 2018 by Abdelfattah Mohammed. A strategy-first creative studio combining civil engineering discipline with creative direction.',
    keywords: 'about Kyberia Tech, Abdelfattah Mohammed founder, Cairo creative studio'
  },
  services: {
    title: 'Services | Kyberia Tech — Branding, Design & Web',
    description: 'Three core service pillars: Branding & Strategy, Graphic Design, and Web Design & Development. Delivered with engineering discipline.',
    keywords: 'branding services Cairo, graphic design Egypt, web development Cairo'
  },
  branding: {
    title: 'Branding & Strategy | Kyberia Tech',
    description: 'Positioning, naming, visual identity, messaging architecture, and brand guidelines. We build the foundation others build on.',
    keywords: 'brand strategy Cairo, brand identity Egypt, visual identity Middle East'
  },
  design: {
    title: 'Graphic Design | Kyberia Tech',
    description: 'Logo systems, UI/UX, motion, video production, photography, drone, animation, and print/digital collateral. Every asset built to system.',
    keywords: 'graphic design Cairo, logo design Egypt, UI UX design Middle East'
  },
  web: {
    title: 'Web Design & Development | Kyberia Tech',
    description: 'Custom websites, e-commerce, mobile apps (iOS & Android), AR/VR experiences, and bespoke software. No templates. No shortcuts.',
    keywords: 'web development Cairo, website design Egypt, e-commerce development Middle East'
  },
  work: {
    title: 'Our Work | Kyberia Tech — Portfolio & Case Studies',
    description: '100+ projects delivered across 9 countries. Branding, design, and web projects for clients in real estate, fintech, tech, and more.',
    keywords: 'Kyberia Tech portfolio, creative agency work, design projects Egypt'
  },
  contact: {
    title: 'Contact Kyberia Tech | Start a Project',
    description: 'Ready to build something that lasts? Tell us about your project. Based in Cairo — serving clients globally.',
    keywords: 'contact Kyberia Tech, hire creative agency Cairo, start a project Egypt'
  }
};

function setMeta(name, content, attr = 'name') {
  const el = document.querySelector(`meta[${attr}="${name}"]`);
  if (el) el.setAttribute('content', content);
}

function updateSEO(pageId) {
  const seo = pageSEO[pageId] || pageSEO.home;
  document.title = seo.title;
  setMeta('description', seo.description);
  setMeta('keywords', seo.keywords);
  setMeta('og:title', seo.title, 'property');
  setMeta('og:description', seo.description, 'property');
  // Update canonical-style hash (optional, good for analytics)
  if (history.pushState) {
    history.pushState(null, seo.title, '#' + pageId);
  }
}

/* ── PAGE NAVIGATION ────────────────────────────────────────────── */
function showPage(id) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  // Show target
  const pg = document.getElementById(id);
  if (pg) pg.classList.add('active');

  // Update nav active states
  document.querySelectorAll('[data-page]').forEach(el => {
    el.classList.toggle('active', el.dataset.page === id);
  });

  // Close mobile menu
  document.body.classList.remove('nav-open');

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Update SEO
  updateSEO(id);

  // Close all dropdowns
  closeAllDropdowns();
}

/* ── THEME TOGGLE ───────────────────────────────────────────────── */
function toggleTheme() {
  document.body.classList.toggle('light-mode');
  const theme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
  try { localStorage.setItem('kt-theme', theme); } catch(e) {}
  // Update mobile toggle label
  updateMobileThemeLabel();
}

function updateMobileThemeLabel() {
  const btn = document.getElementById('mobileThemeToggle');
  if (!btn) return;
  const isLight = document.body.classList.contains('light-mode');
  btn.innerHTML = isLight
    ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/></svg> Switch to Dark'
    : '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/></svg> Switch to Light';
}

// Restore saved theme on load
try {
  if (localStorage.getItem('kt-theme') === 'light') document.body.classList.add('light-mode');
} catch(e) {}

/* ── SHARED CLOSE ALL ───────────────────────────────────────────── */
function closeAllDropdowns() {
  document.querySelectorAll('.nav-lang.open, .nav-apps.open, .has-submenu.open, .mobile-services-item.open').forEach(el => el.classList.remove('open'));
}

/* ── LANGUAGE SWITCHER ──────────────────────────────────────────── */
function toggleLang() {
  const navLang = document.getElementById('navLang');
  if (!navLang) return;
  const isOpen = navLang.classList.contains('open');
  closeAllDropdowns();
  if (!isOpen) navLang.classList.add('open');
}

function setLang(code, elOrEvent) {
  // Update label in desktop nav
  const label = document.getElementById('langLabel');
  if (label) label.textContent = code;

  // RTL for Arabic
  document.documentElement.dir = (code === 'AR') ? 'rtl' : 'ltr';
  document.documentElement.lang = code.toLowerCase();

  // Mark active in desktop dropdown
  document.querySelectorAll('.nav-lang-opt').forEach(o => {
    o.classList.toggle('active', o.textContent.trim().startsWith(code === 'AR' ? '🇸🇦' : '🇬🇧'));
  });

  // Mark active in mobile buttons
  document.querySelectorAll('.mobile-lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === code);
  });

  closeAllDropdowns();
}

/* ── APPS MENU ──────────────────────────────────────────────────── */
function toggleApps() {
  const navApps = document.getElementById('navApps');
  if (!navApps) return;
  const isOpen = navApps.classList.contains('open');
  closeAllDropdowns();
  if (!isOpen) navApps.classList.add('open');
}

/* ── SERVICES SUBMENU (desktop) ─────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const serviceItem = document.querySelector('.has-submenu');
  if (serviceItem) {
    serviceItem.addEventListener('click', (e) => {
      // If clicking the arrow/chevron only, toggle submenu without navigating
      if (e.target.closest('.kt-submenu')) return;
      serviceItem.classList.toggle('open');
    });
  }
});

/* ── MOBILE MENU ────────────────────────────────────────────────── */
function toggleMobileMenu() {
  const isOpen = document.body.classList.toggle('nav-open');
  const btn = document.querySelector('.kt-nav__hamburger');
  if (btn) {
    btn.setAttribute('aria-expanded', isOpen);
  }
  if (!isOpen) {
    closeAllDropdowns();
  }
}

function toggleMobileServices() {
  const item = document.querySelector('.mobile-services-item');
  if (item) item.classList.toggle('open');
}

/* ── OUTSIDE CLICK ──────────────────────────────────────────────── */
document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav-lang') && !e.target.closest('.nav-apps') && !e.target.closest('.has-submenu')) {
    closeAllDropdowns();
  }
});

/* ── BACK TO TOP ────────────────────────────────────────────────── */
const btt = document.getElementById('btt');
if (btt) {
  window.addEventListener('scroll', () => {
    btt.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
}

/* ── HANDLE INITIAL HASH ────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  updateMobileThemeLabel();
  const hash = window.location.hash.slice(1);
  const validPages = ['home','about','services','branding','design','web','work','contact'];
  if (hash && validPages.includes(hash)) {
    showPage(hash);
  } else {
    updateSEO('home');
  }
});

/* ── CLERK AUTH ─────────────────────────────────────────────────── */
// Show sign-in links immediately while Clerk loads
(function () {
  var d = document.getElementById('kt-auth-area');
  var m = document.getElementById('kt-mobile-auth-area');
  if (d) d.innerHTML = '<a class="nav-signin-btn" href="/sign-in">Sign In</a>';
  if (m) m.innerHTML = '<a class="mobile-signin-btn" href="/sign-in">Sign In</a>';
})();

// Called by onload on the Clerk <script> tag — Clerk script has executed,
// but clerk.load() is async so we await it before touching the DOM.
function initClerkNav() {
  var clerkAppearance = {
    variables: {
      colorPrimary:         '#FF2F92',
      colorBackground:      '#111111',
      colorText:            '#FFFFFF',
      colorTextSecondary:   '#AAAAAA',
      colorInputBackground: '#181818',
      colorInputText:       '#FFFFFF',
      colorNeutral:         '#AAAAAA',
      borderRadius:         '0px',
      fontFamily:           "'Satoshi', system-ui, sans-serif",
      fontFamilyButtons:    "'Spline Sans', system-ui, sans-serif",
      fontSize:             '14px',
    }
  };

  window.Clerk.load().then(function () {
    var clerk      = window.Clerk;
    var desktopArea = document.getElementById('kt-auth-area');
    var mobileArea  = document.getElementById('kt-mobile-auth-area');

    function renderAuth() {
      if (clerk.user) {
        if (desktopArea) {
          desktopArea.innerHTML = '';
          clerk.mountUserButton(desktopArea, {
            appearance: clerkAppearance,
            afterSignOutUrl: '/',
          });
        }
        if (mobileArea) {
          mobileArea.innerHTML = '<a class="mobile-signin-btn mobile-signin-btn--out" href="#" onclick="window.Clerk.signOut({redirectUrl:\'/\'});return false;">Sign Out</a>';
        }
      } else {
        if (desktopArea) desktopArea.innerHTML = '<a class="nav-signin-btn" href="/sign-in">Sign In</a>';
        if (mobileArea)  mobileArea.innerHTML  = '<a class="mobile-signin-btn" href="/sign-in">Sign In</a>';
      }
    }

    renderAuth();
    clerk.addListener(renderAuth);
  });
}
