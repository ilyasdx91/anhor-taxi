// ============================================================================
// GSAP-анимации hero-секции: загружаем inline SVG и оживляем.
// ============================================================================

import { gsap } from 'gsap';

const SVG_URL = '/images/hero-illustration.svg';

export async function initHeroAnimation() {
  const host = document.getElementById('hero-visual');
  if (!host) return;

  // Подгружаем SVG inline — только так GSAP получает доступ к его внутренностям
  try {
    const res = await fetch(SVG_URL);
    const text = await res.text();
    host.innerHTML = text;
    const svg = host.querySelector('svg');
    if (svg) {
      svg.style.width = '100%';
      svg.style.height = '100%';
      svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    }
  } catch (err) {
    console.warn('[hero] не удалось загрузить иллюстрацию', err);
    return;
  }

  // Короткое имя для таймлайна
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // Стартовые состояния
  gsap.set('.hero-sun',    { transformOrigin: '50% 50%', scale: 0.6, y: 100, opacity: 0 });
  gsap.set('.hero-city',   { y: 30, opacity: 0 });
  gsap.set('.hero-windows',{ opacity: 0 });
  gsap.set('.hero-stars',  { opacity: 0 });
  gsap.set('.hero-stars-x',{ opacity: 0 });
  gsap.set('.hero-speed',  { x: -60, opacity: 0 });
  gsap.set('.hero-car',    { x: 200, opacity: 0 });
  gsap.set('.hero-road',   { opacity: 0 });

  // Таймлайн
  tl
    .to('.hero-sun',    { scale: 1, y: 0, opacity: 1, duration: 1.1, ease: 'power2.out' })
    .to('.hero-city',   { y: 0, opacity: 1, duration: 0.8 }, '-=0.6')
    .to('.hero-stars',  { opacity: 0.85, duration: 0.6 }, '-=0.8')
    .to('.hero-stars-x',{ opacity: 0.65, duration: 0.6 }, '<')
    .to('.hero-windows',{ opacity: 0.8, duration: 0.6 }, '-=0.4')
    .to('.hero-road',   { opacity: 0.6, duration: 0.5 }, '-=0.5')
    .to('.hero-speed',  { x: 0, opacity: 0.55, duration: 0.5 }, '-=0.3')
    .to('.hero-car', {
      x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
    }, '-=0.3')
    // Небольшой подскок машины на финише — как будто «приземлилась»
    .to('.hero-car', { y: -8, duration: 0.14, yoyo: true, repeat: 1, ease: 'power2.out' });

  // Постоянные петли: мерцание звёзд
  gsap.to('.hero-stars circle', {
    opacity: 0.3,
    duration: 1.4,
    ease: 'sine.inOut',
    stagger: { each: 0.18, from: 'random' },
    yoyo: true,
    repeat: -1,
  });

  // Пульсация speed-lines
  gsap.to('.hero-speed line', {
    x: 12,
    opacity: 0.85,
    duration: 0.8,
    stagger: 0.1,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut',
  });

  // Очень лёгкое «дыхание» у солнца
  gsap.to('.hero-sun', {
    scale: 1.04,
    duration: 3.2,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut',
  });
}
