// ============================================================================
// Плавный скролл по якорям с учётом sticky-header
// ============================================================================

export function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const headerHeight =
        parseInt(
          getComputedStyle(document.documentElement).getPropertyValue(
            '--header-height',
          ),
        ) || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 8;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}
