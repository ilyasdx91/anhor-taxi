// ============================================================================
// i18n — переключатель языков (uz / en)
// Дефолтный язык: uz. Русский текст в HTML — fallback.
// ============================================================================

const STORAGE_KEY = 'anhor-lang';

let currentLang = 'uz';
let translations = {};

async function loadTranslations(lang) {
  const mod = await import(`../i18n/${lang}.js`);
  return mod.default;
}

const SUPPORTED = ['uz', 'ru', 'en'];

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    const text = translations[key];
    if (text === undefined) return;
    // Для элементов без дочерних элементов — textContent, иначе — только прямые текстовые узлы
    if (el.children.length === 0) {
      el.textContent = text;
    } else {
      // Обновляем первый прямой текстовый узел (prepositional span и т.п.)
      for (const node of el.childNodes) {
        if (node.nodeType === Node.TEXT_NODE) {
          node.textContent = text;
          break;
        }
      }
    }
  });

  document.documentElement.lang = currentLang;
  localStorage.setItem(STORAGE_KEY, currentLang);

  document.querySelectorAll('.lang-switcher__btn').forEach((btn) => {
    btn.classList.toggle('lang-switcher__btn--active', btn.dataset.lang === currentLang);
  });
}

export async function switchLang(lang) {
  if (lang === currentLang && Object.keys(translations).length > 0) return;
  currentLang = lang;
  translations = await loadTranslations(lang);
  applyTranslations();
}

export function initI18n() {
  const saved = SUPPORTED.includes(localStorage.getItem(STORAGE_KEY))
    ? localStorage.getItem(STORAGE_KEY)
    : 'uz';

  document.querySelectorAll('.lang-switcher__btn').forEach((btn) => {
    btn.addEventListener('click', () => switchLang(btn.dataset.lang));
  });

  switchLang(saved);
}
