// ============================================================================
// Scroll-reveal для секций (GSAP + ScrollTrigger)
// ============================================================================

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initReveal() {
  // Hero-текст: плавное появление копи. (Саму SVG-сцену анимирует hero.js.)
  gsap.from('.hero__copy > *', {
    y: 24,
    opacity: 0,
    duration: 0.7,
    ease: 'power2.out',
    stagger: 0.1,
  });

  // Карточки плюшек
  gsap.utils.toArray('.perk-card').forEach((card, i) => {
    gsap.from(card, {
      y: 32,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      delay: (i % 4) * 0.05,
      scrollTrigger: { trigger: card, start: 'top 85%' },
    });
  });

  // Шаги «Как начать»
  gsap.utils.toArray('.step').forEach((step, i) => {
    gsap.from(step, {
      y: 24,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      delay: i * 0.12,
      scrollTrigger: { trigger: step, start: 'top 85%' },
    });
  });

  // Строки сравнительной таблицы
  gsap.utils.toArray('.compare__table tbody tr').forEach((row, i) => {
    gsap.from(row, {
      x: -16,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
      delay: i * 0.05,
      scrollTrigger: { trigger: row, start: 'top 92%' },
    });
  });

  // Отзывы
  gsap.utils.toArray('.review-card').forEach((card, i) => {
    gsap.from(card, {
      y: 24,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      delay: i * 0.1,
      scrollTrigger: { trigger: card, start: 'top 85%' },
    });
  });
}
