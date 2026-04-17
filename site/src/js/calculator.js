// ============================================================================
// Калькулятор примерного дохода водителя
// ============================================================================

import { CALC_RATES } from './config.js';

function formatSum(value) {
  // Разделитель тысяч — неразрывный пробел, валюта — сум
  return (
    Math.round(value / 1000) * 1000
  ).toLocaleString('ru-RU').replaceAll(',', ' ') + ' сум';
}

/**
 * Очень грубая модель: hours × days/week × 4.33 недели × ставка за час.
 * Парк первые 2 недели = 0 % комиссия, далее ~5 % — усредним на месяц ≈ 2.5 %.
 */
function calculate(hours, days, tier) {
  const hourRate = CALC_RATES[tier] ?? CALC_RATES.comfort;
  const gross = hours * days * 4.33 * hourRate;
  const commissionAvg = 0.025;
  return gross * (1 - commissionAvg);
}

export function initCalculator() {
  const form = document.getElementById('calculator');
  if (!form) return;

  const hoursEl = document.getElementById('calc-hours');
  const daysEl = document.getElementById('calc-days');
  const tierEl = document.getElementById('calc-tier');
  const hoursOut = document.getElementById('calc-hours-out');
  const daysOut = document.getElementById('calc-days-out');
  const result = document.getElementById('calc-result');

  function update() {
    hoursOut.textContent = hoursEl.value;
    daysOut.textContent = daysEl.value;
    const amount = calculate(
      Number(hoursEl.value),
      Number(daysEl.value),
      tierEl.value,
    );
    result.textContent = formatSum(amount);
  }

  [hoursEl, daysEl, tierEl].forEach((el) => {
    el.addEventListener('input', update);
  });

  update();
}
