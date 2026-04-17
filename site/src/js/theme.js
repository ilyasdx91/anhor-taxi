// ============================================================================
// Переключатель темы (dark/light) с сохранением в localStorage
// ============================================================================

const STORAGE_KEY = 'anhor-theme';
const ICONS = { light: '☀️', dark: '🌙' };

function apply(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const button = document.getElementById('theme-toggle');
  if (button) {
    const span = button.querySelector('span');
    if (span) span.textContent = theme === 'dark' ? ICONS.dark : ICONS.light;
    button.setAttribute(
      'aria-label',
      theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему',
    );
  }
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', theme === 'dark' ? '#0A0A0A' : '#FFFFFF');
}

export function initTheme() {
  const stored = localStorage.getItem(STORAGE_KEY);
  // Дефолт — тёмная тема (по выбору клиента)
  const initial = stored === 'light' || stored === 'dark' ? stored : 'dark';
  apply(initial);

  const button = document.getElementById('theme-toggle');
  if (!button) return;

  button.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    apply(next);
    localStorage.setItem(STORAGE_KEY, next);
  });
}
