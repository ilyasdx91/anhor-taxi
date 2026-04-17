// ============================================================================
// Anhor Taxi — входная точка
// ============================================================================

import { initTheme } from './theme.js';
import { initI18n } from './i18n.js';
import { wireReferralLinks } from './referral.js';
import { initCalculator } from './calculator.js';
import { initSmoothScroll } from './smooth-scroll.js';
import { initReveal } from './animations/reveal.js';
import { initHeroAnimation } from './animations/hero.js';
import {
  initMagneticButtons,
  initStepPulse,
  initCalculatorTween,
  initHeroParallax,
  initFaqAnimation,
  initPerkCardsHover,
} from './animations/interactions.js';

function init() {
  initTheme();
  initI18n();
  wireReferralLinks();
  initCalculator();
  initSmoothScroll();
  initReveal();
  initHeroAnimation();
  // Дополнительные анимации-интеракции
  initMagneticButtons();
  initStepPulse();
  initCalculatorTween();
  initHeroParallax();
  initFaqAnimation();
  initPerkCardsHover();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
