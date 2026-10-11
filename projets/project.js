/* ═══════════════════════════════════════════════════
   Kylian Rousseau — Portfolio Projets
   Script interactions pour les pages détaillées
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  /* ─── THEME SYNCHRONIZATION ─── */
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle?.querySelector('.theme-icon');
  const root = document.documentElement;

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

  /* ─── NATIVE DIALOG IMAGE LIGHTBOX ─── */
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const modalCaption = document.getElementById('modalCaption');
  const modalClose = document.getElementById('modalClose');

  if (modal && modalImg) {
    // Open modal on image click
    const clickableImgs = document.querySelectorAll('.gallery-item img, .project-banner-preview__img');
    clickableImgs.forEach(img => {
      img.addEventListener('click', () => {
        modalImg.src = img.src;
        modalImg.alt = img.alt || 'Aperçu du projet';
        if (modalCaption) {
          modalCaption.textContent = img.alt || img.title || 'Aperçu haute définition';
        }
        modal.showModal();
      });
    });

    // Close button
    modalClose?.addEventListener('click', () => {
      modal.close();
    });

    // Light dismiss (click on backdrop)
    modal.addEventListener('click', (e) => {
      const rect = modal.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        modal.close();
      }
    });
  }
});
