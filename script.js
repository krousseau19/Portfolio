/* ═══════════════════════════════════════════════════
   Kylian Rousseau — Portfolio
   Animations & Interactions
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  /* ─── THEME TOGGLE (Light / Dark) ─── */
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle?.querySelector('.theme-icon');
  const root = document.documentElement;

  // Restore saved theme or default to light
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    root.dataset.theme = savedTheme;
  }

  const updateIcon = () => {
    const isDark = root.dataset.theme === 'dark';
    if (themeIcon) themeIcon.textContent = isDark ? 'light_mode' : 'dark_mode';
  };
  updateIcon();

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = root.dataset.theme === 'dark';
      const next = isDark ? 'light' : 'dark';
      root.dataset.theme = next;
      localStorage.setItem('theme', next);
      updateIcon();
    });
  }

  // Follow system preference changes
  globalThis.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      root.dataset.theme = e.matches ? 'dark' : 'light';
      updateIcon();
    }
  });

  /* ─── NAV SCROLL EFFECT ─── */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    nav.classList.toggle('nav--scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ─── MOBILE MENU ─── */
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      burger.querySelector('.material-symbols-rounded').textContent =
        isOpen ? 'close' : 'menu';
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        burger.querySelector('.material-symbols-rounded').textContent = 'menu';
      });
    });
  }

  /* ─── SMOOTH NAV LINKS ─── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ─── REVEAL ON SCROLL (Intersection Observer) ─── */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px',
    }
  );

  revealElements.forEach(el => revealObserver.observe(el));

  /* ─── SKILL BARS ANIMATION ─── */
  const levelBars = document.querySelectorAll('.level-bar__fill, .lang-card__fill');

  const barObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const level = entry.target.dataset.level || 0;
          entry.target.style.width = level + '%';
          barObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  levelBars.forEach(bar => barObserver.observe(bar));

  /* ─── SUBTLE TILT ON PROJECT CARDS ─── */
  const tiltCards = document.querySelectorAll('[data-tilt]');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;

      card.style.transform =
        `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ─── ACTIVE NAV LINK HIGHLIGHT ─── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__links a');

  const highlightNav = () => {
    const scrollY = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.style.background = '';
          link.style.color = '';
          if (link.getAttribute('href') === `#${id}`) {
            link.style.background = 'var(--md-primary-container)';
            link.style.color = 'var(--md-on-primary-container)';
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });
});
