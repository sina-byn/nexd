'use client';

import { useState, useEffect } from 'react';

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
type Theme = (typeof THEMES)[number];

type SetTheme = () => void | ((forcedTheme?: Theme) => void);

declare global {
  var setTheme: SetTheme;
}

// * constants
const THEMES = ['light', 'system', 'dark'] as const;
const STORAGE_KEY = 'nexd-theme';

let globalSetTheme: SetTheme;

const ThemeSwitch = () => {
  const [client, setClient] = useState<boolean>(false);
  const [theme, setTheme] = useState<Theme>(
    () =>
      ((typeof localStorage !== 'undefined' && localStorage.getItem(STORAGE_KEY)) ??
        'system') as Theme,
  );

  useEffect(() => {
    setClient(true);
    globalSetTheme = window.setTheme;

    const storageHandler = (e: StorageEvent) => {
      e.key === STORAGE_KEY && setTheme(e.newValue as Theme);
    };

    window.addEventListener('storage', storageHandler);

    return () => window.removeEventListener('storage', storageHandler);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, theme);
    globalSetTheme?.();
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

export default ThemeSwitch;
