'use client';

import { memo, useState, useEffect } from 'react';

// * utils
import { cn } from '@/utils';

// * HOCs
import { withIconOverrides } from '../HOCs';

// * icons
import { IconSun, IconMoon, IconDeviceDesktop } from '@tabler/icons-react';

const ICONS = {
  dark: IconMoon,
  light: IconSun,
  system: IconDeviceDesktop,
};

// * types
type Theme = 'system' | 'dark' | 'light';

type SetTheme = () => void | ((forcedTheme?: Theme) => void);

declare global {
  var _setTheme: SetTheme;
}

// * constants
const THEMES = ['light', 'system', 'dark'] as const;

const STORAGE_KEY = 'nexd-theme';

let _setTheme: SetTheme;

const NoFOUCScript = (storageKey: string) => {
  const [SYSTEM, DARK, LIGHT] = ['system', 'dark', 'light'];

  const disableTransitions = () => {
    const style = document.createElement('style');

    style.textContent = '*,*:after,*:before{transition: none !important}';
    document.head.append(style);

    return () => {
      getComputedStyle(document.body);

      const timeout = setTimeout(() => {
        clearTimeout(timeout);
        style.remove();
      }, 1);
    };
  };

  const media = matchMedia(`(prefers-color-scheme: ${DARK})`);

  window._setTheme = (forcedTheme?: Theme) => {
    const enableTransitions = disableTransitions();

    const theme = forcedTheme ?? localStorage.getItem(storageKey) ?? SYSTEM;
    const systemTheme = media.matches ? DARK : LIGHT;
    const resolvedTheme = theme === SYSTEM ? systemTheme : theme;
    const classList = document.documentElement.classList;

    document.documentElement.dataset.theme = theme;
    classList.toggle(DARK, resolvedTheme === DARK);
    classList.toggle(LIGHT, resolvedTheme === LIGHT);

    enableTransitions();
  };

  window._setTheme();
  media.addEventListener('change', () => window._setTheme());
};

const Script = memo(() => (
  <script
    suppressHydrationWarning
    dangerouslySetInnerHTML={{ __html: `(${NoFOUCScript.toString()})('${STORAGE_KEY}')` }}
  />
));

const ThemeSwitcher = () => {
  const [client, setClient] = useState<boolean>(false);
  const [theme, setTheme] = useState<Theme>(
    () =>
      ((typeof localStorage !== 'undefined' && localStorage.getItem(STORAGE_KEY)) ??
        'system') as Theme,
  );

  useEffect(() => {
    setClient(true);
    _setTheme = window._setTheme;

    const storageHandler = (e: StorageEvent) => {
      e.key === STORAGE_KEY && setTheme(e.newValue as Theme);
    };

    window.addEventListener('storage', storageHandler);

    return () => window.removeEventListener('storage', storageHandler);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, theme);
    _setTheme();
  }, [theme]);

  return (
    <div className='border-default flex items-center overflow-hidden rounded-full border p-1'>
      {THEMES.map(th => {
        const Icon = withIconOverrides(ICONS[th], {
          size: 16,
          stroke: th === 'light' ? 2.25 : 1.5,
        });

        return (
          <button
            key={th}
            type='button'
            onClick={setTheme.bind(null, th)}
            className={cn(
              'flex size-8 items-center justify-center rounded-full',
              client && th === theme && 'bg-neutral',
            )}
          >
            <Icon />
          </button>
        );
      })}
    </div>
  );
};

const ThemeSwitch = () => {
  return (
    <>
      <Script />
      <ThemeSwitcher />
    </>
  );
};

export default ThemeSwitch;
