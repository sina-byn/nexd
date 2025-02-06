console.log('here');

// * constants
const [SYSTEM, DARK, LIGHT] = ['system', 'dark', 'light'];
const STORAGE_KEY = 'nexd-theme';

const disableTransitions = () => {
  const style = document.createElement('style');

  style.textContent = '*,*:after,*:before{transition: none !important;}';
  document.head.append(style);

  return () => {
    getComputedStyle(document.documentElement);

    const timerId = setTimeout(() => {
      clearTimeout(timerId);
      style.remove();
    }, 1);
  };
};

const media = matchMedia(`(prefers-color-scheme: ${DARK})`);

window.setTheme = forcedTheme => {
  const enableTransitions = disableTransitions();

  const theme = forcedTheme ?? localStorage.getItem(STORAGE_KEY) ?? SYSTEM;
  const systemTheme = media.matches ? DARK : LIGHT;
  const resolvedTheme = theme === SYSTEM ? systemTheme : theme;
  const classList = document.documentElement.classList;

  document.documentElement.dataset.theme = theme;
  classList.toggle(DARK, resolvedTheme === DARK);
  classList.toggle(LIGHT, resolvedTheme === LIGHT);

  enableTransitions();
};

window.setTheme();
media.addEventListener('change', () => window.setTheme());
