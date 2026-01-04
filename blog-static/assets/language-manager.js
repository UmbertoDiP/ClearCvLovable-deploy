/**
 * Language Manager - Vanilla JS version of LanguageContext
 * Manages multilingual routing with localStorage persistence
 * Compatible with main app storage format: cv-app-language
 */

const LANGUAGE_KEY = 'cv-app-language';

const SUPPORTED_LANGUAGES = [
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'ro', name: 'Română', flag: '🇷🇴' },
  { code: 'el', name: 'Ελληνικά', flag: '🇬🇷' },
  { code: 'cs', name: 'Čeština', flag: '🇨🇿' },
  { code: 'hu', name: 'Magyar', flag: '🇭🇺' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
  { code: 'da', name: 'Dansk', flag: '🇩🇰' },
  { code: 'fi', name: 'Suomi', flag: '🇫🇮' },
  { code: 'no', name: 'Norsk', flag: '🇳🇴' },
  { code: 'sk', name: 'Slovenčina', flag: '🇸🇰' },
  { code: 'hr', name: 'Hrvatski', flag: '🇭🇷' },
  { code: 'sl', name: 'Slovenščina', flag: '🇸🇮' },
  { code: 'bg', name: 'Български', flag: '🇧🇬' },
  { code: 'lt', name: 'Lietuvių', flag: '🇱🇹' },
  { code: 'lv', name: 'Latviešu', flag: '🇱🇻' },
  { code: 'et', name: 'Eesti', flag: '🇪🇪' }
];

function getLanguageFromPath() {
  const match = window.location.pathname.match(/^\/([a-z]{2})(\/|$)/);
  if (match && SUPPORTED_LANGUAGES.some(l => l.code === match[1])) {
    return match[1];
  }
  return null;
}

function getCurrentLanguage() {
  // Priority: URL > localStorage > browser > default
  const urlLang = getLanguageFromPath();
  if (urlLang) return urlLang;

  const savedLang = localStorage.getItem(LANGUAGE_KEY);
  if (savedLang && SUPPORTED_LANGUAGES.some(l => l.code === savedLang)) {
    return savedLang;
  }

  const browserLang = navigator.language.split('-')[0];
  if (SUPPORTED_LANGUAGES.some(l => l.code === browserLang)) {
    return browserLang;
  }

  return 'it'; // Default to Italian
}

function setLanguage(newLang) {
  localStorage.setItem(LANGUAGE_KEY, newLang);

  // Update URL path
  const currentPath = window.location.pathname;
  const existingLang = getLanguageFromPath();

  let newPath;
  if (existingLang) {
    // Replace existing language in path
    newPath = currentPath.replace(/^\/([a-z]{2})(\/|$)/, `/${newLang}$2`);
  } else {
    // Add language prefix
    newPath = `/${newLang}${currentPath}`;
  }

  window.location.href = newPath;
}

function initLanguageSelector() {
  const currentLang = getCurrentLanguage();
  const currentLangData = SUPPORTED_LANGUAGES.find(l => l.code === currentLang) || SUPPORTED_LANGUAGES[0];

  const button = document.getElementById('language-selector-button');
  const dropdown = document.getElementById('language-selector-dropdown');

  if (!button || !dropdown) return;

  // Update button with current language
  button.innerHTML = `
    <span class="text-lg mr-1">${currentLangData.flag}</span>
    <span class="hidden sm:inline">${currentLangData.name}</span>
    <span class="sm:hidden">${currentLangData.code.toUpperCase()}</span>
    <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
    </svg>
  `;

  // Populate dropdown
  dropdown.innerHTML = SUPPORTED_LANGUAGES.map(lang => `
    <button
      class="language-option flex items-center gap-2 px-4 py-2 text-sm w-full text-left hover:bg-gray-100 dark:hover:bg-gray-800 ${lang.code === currentLang ? 'bg-gray-100 dark:bg-gray-800' : ''}"
      data-lang="${lang.code}"
    >
      <span class="text-lg">${lang.flag}</span>
      <span>${lang.name}</span>
    </button>
  `).join('');

  // Toggle dropdown visibility
  button.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('hidden');
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', () => {
    dropdown.classList.add('hidden');
  });

  // Prevent dropdown from closing when clicking inside
  dropdown.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  // Handle language selection
  dropdown.querySelectorAll('.language-option').forEach(option => {
    option.addEventListener('click', () => {
      const lang = option.getAttribute('data-lang');
      setLanguage(lang);
    });
  });
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', initLanguageSelector);
