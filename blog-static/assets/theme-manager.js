/**
 * Theme Manager - Vanilla JS version of useTheme hook
 * Manages light/dark mode with localStorage persistence
 * Compatible with main app storage format: clearcv_settings
 */

const SETTINGS_KEY = 'clearcv_settings';

// Initialize theme immediately to prevent flash
(function initTheme() {
  const settings = getSettings();
  const theme = settings.theme || 'system';
  const resolvedTheme = resolveTheme(theme);
  applyTheme(resolvedTheme);
})();

function getSettings() {
  try {
    const data = localStorage.getItem(SETTINGS_KEY);
    return data ? JSON.parse(data) : { theme: 'system' };
  } catch {
    return { theme: 'system' };
  }
}

function saveSettings(newSettings) {
  const current = getSettings();
  localStorage.setItem(SETTINGS_KEY, JSON.stringify({ ...current, ...newSettings }));
}

function resolveTheme(theme) {
  if (theme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return theme;
}

function applyTheme(resolvedTheme) {
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(resolvedTheme);
}

function toggleTheme() {
  const settings = getSettings();
  const currentTheme = settings.theme || 'system';
  const currentResolved = resolveTheme(currentTheme);

  // Toggle between light and dark (not system)
  const newTheme = currentResolved === 'dark' ? 'light' : 'dark';
  saveSettings({ theme: newTheme });
  applyTheme(newTheme);

  // Update button icon
  updateThemeButton();
}

function updateThemeButton() {
  const settings = getSettings();
  const theme = settings.theme || 'system';
  const resolved = resolveTheme(theme);
  const button = document.getElementById('theme-toggle');
  if (button) {
    const icon = button.querySelector('.theme-icon');
    if (icon) {
      // Sun for light mode, Moon for dark mode
      icon.textContent = resolved === 'dark' ? '☀️' : '🌙';
    }
  }
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  const settings = getSettings();
  if (settings.theme === 'system') {
    const resolvedTheme = resolveTheme('system');
    applyTheme(resolvedTheme);
    updateThemeButton();
  }
});

// Initialize button on page load
window.addEventListener('DOMContentLoaded', updateThemeButton);
