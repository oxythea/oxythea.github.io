/* =============================================
   OXYTHEA — JavaScript
   ============================================= */

const DONATION_CARD_NUMBER = '5501040011479879';
const DONATION_CARD_DISPLAY = '5501 0400 1147 9879';
const MIN_DONATION_AMOUNT = 100;
const PAGE_LANG = document.documentElement.lang || 'hy';
const LOCALE_BY_LANG = {
  hy: 'hy-AM',
  ru: 'ru-RU',
  en: 'en-US'
};
const TEXT_BY_LANG = {
  hy: {
    minDonation: 'Նվազագույն գումարը 100 ֏ է։',
    consoleTitle: 'Oxythea 🌿 SmartCon AI-ի աջակցությամբ',
    consoleSubtitle: 'Ավելի կանաչ Հայաստան՝ մեկ ծառով ավելի։'
  },
  ru: {
    minDonation: 'Минимальная сумма пожертвования — 100 ֏.',
    consoleTitle: 'Oxythea 🌿 при поддержке SmartCon AI',
    consoleSubtitle: 'Более зеленая Армения, по одному дереву за раз.'
  },
  en: {
    minDonation: 'The minimum donation amount is 100 ֏.',
    consoleTitle: 'Oxythea 🌿 Powered by SmartCon AI',
    consoleSubtitle: 'Building a greener Armenia, one tree at a time.'
  }
};
const SCRIPT_BASE_URL = new URL('.', document.currentScript ? document.currentScript.src : window.location.href);
const assetUrl = path => new URL(path, SCRIPT_BASE_URL).href;
const IMAGE_FALLBACKS = {
  forest: assetUrl('assets/fallback-forest.svg'),
  trees: assetUrl('assets/fallback-trees.svg'),
  data: assetUrl('assets/fallback-data.svg'),
  community: assetUrl('assets/fallback-community.svg'),
  donation: assetUrl('assets/fallback-donation.svg')
};

initImageFallbacks();

/* === IMAGE FALLBACKS === */
function initImageFallbacks() {
  document.querySelectorAll('img').forEach(img => {
    img.dataset.fallback = getImageFallback(img);
    img.addEventListener('error', () => applyImageFallback(img));

    if (img.complete && img.naturalWidth === 0) {
      applyImageFallback(img);
    }
  });
}

function getImageFallback(img) {
  const label = `${img.alt || ''} ${img.className || ''}`.toLowerCase();

  if (label.includes('կառավար') || label.includes('ձեռնարկ') || label.includes('համայնք') || label.includes('դպրոց') ||
      label.includes('government') || label.includes('business') || label.includes('community') || label.includes('school') ||
      label.includes('правитель') || label.includes('предприят') || label.includes('сообще') || label.includes('школ')) {
    return IMAGE_FALLBACKS.community;
  }
  if (label.includes('հաշվետվ') || label.includes('օդի որակ') || label.includes('մշտադիտարկ') || label.includes('քարտեզ') ||
      label.includes('report') || label.includes('air quality') || label.includes('monitoring') || label.includes('mapping') ||
      label.includes('отчет') || label.includes('качество воздуха') || label.includes('мониторинг') || label.includes('карт')) {
    return IMAGE_FALLBACKS.data;
  }
  if (label.includes('կաղնի') || label.includes('սոճի') || label.includes('կաղամախի') || label.includes('կեռասենի') || label.includes('ծառ') ||
      label.includes('oak') || label.includes('pine') || label.includes('poplar') || label.includes('cherry') || label.includes('tree') ||
      label.includes('дуб') || label.includes('сосн') || label.includes('топол') || label.includes('череш') || label.includes('дерев')) {
    return IMAGE_FALLBACKS.trees;
  }
  if (label.includes('նվիր') || label.includes('կանաչ տարածք') || label.includes('հովանավոր') ||
      label.includes('donat') || label.includes('green area') || label.includes('sponsor') ||
      label.includes('пожертв') || label.includes('зелен') || label.includes('спонсор')) {
    return IMAGE_FALLBACKS.donation;
  }

  return IMAGE_FALLBACKS.forest;
}

function applyImageFallback(img) {
  const fallback = img.dataset.fallback || IMAGE_FALLBACKS.forest;
  const currentSrc = img.getAttribute('src') || '';

  if (currentSrc === fallback) return;

  img.classList.add('using-fallback');
  img.setAttribute('src', fallback);
}

/* === LOADER === */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('done');
    initParticles();
    initHeroSlider();
    initScrollAnimations();
  }, 3800);
});

/* === PARTICLES === */
function initParticles() {
  const container = document.getElementById('particles');
  const count = window.innerWidth < 768 ? 15 : 30;
  const shapes = ['🍃', '🌿', '🌱', '✨', '💚'];

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const useEmoji = Math.random() > 0.5;
    if (useEmoji) {
      p.textContent = shapes[Math.floor(Math.random() * shapes.length)];
      p.style.fontSize = `${Math.random() * 14 + 10}px`;
    } else {
      p.style.width = `${Math.random() * 6 + 3}px`;
      p.style.height = p.style.width;
      p.style.background = `rgba(74,173,86,${Math.random() * 0.4 + 0.1})`;
    }
    p.style.left = `${Math.random() * 100}%`;
    p.style.animationDuration = `${Math.random() * 20 + 15}s`;
    p.style.animationDelay = `${Math.random() * 15}s`;
    container.appendChild(p);
  }
}

/* === HERO SLIDER === */
function initHeroSlider() {
  const imgs = document.querySelectorAll('.hero-img');
  let current = 0;
  setInterval(() => {
    imgs[current].classList.remove('active');
    current = (current + 1) % imgs.length;
    imgs[current].classList.add('active');
  }, 5000);
}

/* === NAVBAR === */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
toggle.addEventListener('click', () => {
  toggle.classList.toggle('open');
  links.classList.toggle('open');
});
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    toggle.classList.remove('open');
    links.classList.remove('open');
  });
});

/* === SMOOTH SCROLL === */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* === SCROLL ANIMATIONS === */
function initScrollAnimations() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Trigger counter if has data-target
        const numEl = entry.target.querySelector('[data-target]') || (entry.target.hasAttribute('data-target') ? entry.target : null);
        if (numEl) animateCounter(numEl);
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(el => observer.observe(el));

  // Also observe impact-num directly
  document.querySelectorAll('.impact-num, .stat-num').forEach(el => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    obs.observe(el);
  });

  // Progress bar
  const progressFill = document.querySelector('.progress-fill');
  if (progressFill) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const width = progressFill.getAttribute('data-width');
          setTimeout(() => { progressFill.style.width = width + '%'; }, 300);
          obs.unobserve(progressFill);
        }
      });
    }, { threshold: 0.3 });
    obs.observe(progressFill);
  }
}

/* === COUNTER ANIMATION === */
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  if (!target || el.dataset.animated) return;
  el.dataset.animated = true;
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current).toLocaleString();
    }
  }, 16);
}

/* === QR GRID === */
(function buildQR() {
  const grid = document.querySelector('.qr-grid');
  if (!grid) return;
  for (let i = 0; i < 25; i++) {
    const cell = document.createElement('div');
    cell.style.width = '6px';
    cell.style.height = '6px';
    cell.style.background = Math.random() > 0.4 ? '#1a4d2e' : 'transparent';
    cell.style.borderRadius = '1px';
    grid.appendChild(cell);
  }
})();

/* === DONATE MODAL === */
function openDonate(amount) {
  const modal = document.getElementById('donateModal');
  const donationAmount = Math.max(MIN_DONATION_AMOUNT, Math.floor(Number(amount) || MIN_DONATION_AMOUNT));
  document.getElementById('modalAmount').textContent = donationAmount.toLocaleString(LOCALE_BY_LANG[PAGE_LANG] || 'hy-AM') + ' ֏';
  const modalCardNumber = document.getElementById('modalCardNumber');
  if (modalCardNumber) modalCardNumber.textContent = DONATION_CARD_DISPLAY;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function openCustomDonate() {
  const input = document.getElementById('customAmount');
  const error = document.getElementById('customAmountError');
  const amount = Math.floor(Number(input.value));

  if (!Number.isFinite(amount) || amount < MIN_DONATION_AMOUNT) {
    error.textContent = (TEXT_BY_LANG[PAGE_LANG] || TEXT_BY_LANG.hy).minDonation;
    input.focus();
    return;
  }

  error.textContent = '';
  openDonate(amount);
}

function closeDonate() {
  document.getElementById('donateModal').classList.remove('open');
  document.body.style.overflow = '';
}

function closeModal(e) {
  if (e.target === document.getElementById('donateModal')) closeDonate();
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeDonate();
});

/* === COPY CARD === */
function copyCard() {
  navigator.clipboard.writeText(DONATION_CARD_NUMBER).then(() => {
    const btn = document.querySelector('.copy-btn');
    btn.textContent = '✓';
    btn.style.background = '#c8f0cd';
    setTimeout(() => { btn.textContent = '📋'; btn.style.background = ''; }, 2000);
  });
}

/* === ACTIVE NAV LINK ON SCROLL === */
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 120;
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        link.style.color = 'var(--green-light)';
      } else {
        link.style.color = '';
      }
    }
  });
});

/* === PARALLAX HERO === */
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero-content');
  if (hero && window.scrollY < window.innerHeight) {
    hero.style.transform = `translateY(${window.scrollY * 0.25}px)`;
    hero.style.opacity = 1 - (window.scrollY / window.innerHeight) * 0.8;
  }
});

/* === HOVER TILT ON CARDS === */
document.querySelectorAll('.feature-card, .donate-card, .impact-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateY(-8px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* === SECTION ENTRANCE ANIMATIONS === */
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(s => sectionObserver.observe(s));

console.log(`%c${(TEXT_BY_LANG[PAGE_LANG] || TEXT_BY_LANG.hy).consoleTitle}`, 'color:#4aad56;font-size:16px;font-weight:bold;');
console.log(`%c${(TEXT_BY_LANG[PAGE_LANG] || TEXT_BY_LANG.hy).consoleSubtitle}`, 'color:#2d7a3a;font-size:12px;');
