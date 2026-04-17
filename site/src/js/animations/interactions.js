// ============================================================================
// Интерактивные анимации: hover на CTA, пульс шагов, tween калькулятора,
// параллакс hero, анимация FAQ.
// ============================================================================

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Магнитный hover для primary-кнопок.
 * Кнопка мягко «притягивается» к курсору (2-4 px), возвращается при выходе.
 */
export function initMagneticButtons() {
  const buttons = document.querySelectorAll('.btn--primary');
  if (!buttons.length) return;

  buttons.forEach((btn) => {
    const strength = 0.18; // амплитуда «магнитизма»
    const onMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, {
        x: x * strength,
        y: y * strength,
        duration: 0.35,
        ease: 'power2.out',
      });
    };
    const onLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.4, ease: 'power3.out' });
    };

    btn.addEventListener('mousemove', onMove);
    btn.addEventListener('mouseleave', onLeave);
  });
}

/**
 * Пульсация цифр шагов «Как начать» при появлении в viewport.
 */
export function initStepPulse() {
  const numbers = document.querySelectorAll('.step__number');
  if (!numbers.length) return;

  numbers.forEach((num, i) => {
    gsap.fromTo(
      num,
      { scale: 0, rotate: -90 },
      {
        scale: 1,
        rotate: 0,
        duration: 0.7,
        ease: 'back.out(1.8)',
        delay: i * 0.15,
        scrollTrigger: { trigger: num, start: 'top 85%' },
      },
    );
  });

  // Лёгкая постоянная пульсация
  gsap.to('.step__number', {
    scale: 1.06,
    duration: 1.6,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
    stagger: 0.3,
  });
}

/**
 * Плавный tween результата калькулятора — вместо резкого обновления.
 * Привязываемся к сменам #calc-result и анимируем цифру.
 */
export function initCalculatorTween() {
  const result = document.getElementById('calc-result');
  if (!result) return;

  let current = 0;
  const state = { value: 0 };

  // Начальное значение из DOM
  const parse = (txt) => parseInt((txt || '').replace(/\D/g, ''), 10) || 0;

  const render = () => {
    const v = Math.round(state.value / 1000) * 1000;
    result.textContent = v.toLocaleString('ru-RU').replaceAll(',', ' ') + ' сум';
  };

  const observer = new MutationObserver(() => {
    const target = parse(result.textContent);
    if (target === current) return;
    current = target;
    gsap.to(state, {
      value: target,
      duration: 0.6,
      ease: 'power2.out',
      onUpdate: render,
    });
  });

  // Инициализация
  current = parse(result.textContent);
  state.value = current;

  observer.observe(result, { childList: true, characterData: true, subtree: true });
}

/**
 * Параллакс для hero: при скролле солнце и город движутся медленнее,
 * машина — быстрее. Создаёт эффект глубины.
 */
export function initHeroParallax() {
  const host = document.getElementById('hero-visual');
  if (!host) return;

  // Подождём, пока hero.js внедрит SVG (не более 3 секунд)
  const deadline = Date.now() + 3000;
  const attach = () => {
    const sun  = host.querySelector('.hero-sun');
    const city = host.querySelector('.hero-city');
    const win  = host.querySelector('.hero-windows');
    const car  = host.querySelector('.hero-car');
    if (!sun || !car) {
      if (Date.now() < deadline) requestAnimationFrame(attach);
      return;
    }

    gsap.to(sun,  { y: -40, ease: 'none', scrollTrigger: { trigger: host, start: 'top top', end: 'bottom top', scrub: 0.5 } });
    gsap.to(city, { y: -20, ease: 'none', scrollTrigger: { trigger: host, start: 'top top', end: 'bottom top', scrub: 0.5 } });
    gsap.to(win,  { y: -20, ease: 'none', scrollTrigger: { trigger: host, start: 'top top', end: 'bottom top', scrub: 0.5 } });
    gsap.to(car,  { y: 20, ease: 'none', scrollTrigger: { trigger: host, start: 'top top', end: 'bottom top', scrub: 0.5 } });
  };

  attach();
}

/**
 * Анимированное раскрытие FAQ-аккордеона.
 * Нативный <details> без анимации — «прыгает». GSAP даёт плавность.
 */
export function initFaqAnimation() {
  document.querySelectorAll('.faq-item').forEach((item) => {
    const answer = item.querySelector('.faq-item__answer');
    if (!answer) return;

    // Начальное состояние, когда закрыто
    if (!item.open) {
      gsap.set(answer, { height: 0, opacity: 0, overflow: 'hidden' });
    }

    item.addEventListener('toggle', () => {
      if (item.open) {
        // Open: измерить natural-высоту и анимировать к ней
        gsap.set(answer, { height: 'auto', opacity: 1 });
        const h = answer.getBoundingClientRect().height;
        gsap.fromTo(
          answer,
          { height: 0, opacity: 0 },
          { height: h, opacity: 1, duration: 0.35, ease: 'power2.out',
            onComplete: () => gsap.set(answer, { height: 'auto' }) },
        );
      } else {
        gsap.to(answer, { height: 0, opacity: 0, duration: 0.25, ease: 'power2.in' });
      }
    });
  });
}

/**
 * Hover-эффект на карточки плюшек.
 * Текст НЕ масштабируем — transform: scale на блок с текстом вызывает
 * subpixel-blur (шрифт рендерится в composited layer и мутнеет).
 * Анимируем только иконку (скейл + лёгкий наклон) — визуально живо,
 * текст остаётся кристально чётким. Лифт карточки делает CSS (mixin hover-lift).
 */
export function initPerkCardsHover() {
  document.querySelectorAll('.perk-card').forEach((card) => {
    const icon = card.querySelector('.perk-card__icon');
    if (!icon) return;

    card.addEventListener('mouseenter', () => {
      gsap.to(icon, {
        scale: 1.12,
        rotate: -6,
        duration: 0.35,
        ease: 'back.out(2)',
        transformOrigin: '50% 50%',
      });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(icon, {
        scale: 1,
        rotate: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    });
  });
}
