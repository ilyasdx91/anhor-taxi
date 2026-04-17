// ============================================================================
// Формирование реферальной ссылки Яндекс Про с UTM-метками
// ============================================================================

import { REFERRAL } from './config.js';

/**
 * @param {string} source — место клика (hero | perks | calculator | start | header)
 * @returns {string} полный URL реферальной формы
 */
export function buildReferralUrl(source) {
  const url = new URL(REFERRAL.baseUrl);
  url.searchParams.set('specification', REFERRAL.specification);
  url.searchParams.set('ref_id', REFERRAL.refId);
  // UTM — для нашей аналитики; Яндекс их проигнорирует
  url.searchParams.set('utm_source', 'anhor-landing');
  url.searchParams.set('utm_medium', 'cta');
  url.searchParams.set('utm_campaign', source || 'unknown');
  return url.toString();
}

/**
 * Находит все ссылки с data-cta и проставляет им реферальный URL.
 */
export function wireReferralLinks() {
  document.querySelectorAll('a[data-cta]').forEach((link) => {
    const source = link.dataset.cta || 'unknown';
    link.href = buildReferralUrl(source);
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener');
  });
}
