import { useEffect } from 'react';

const useClickOutside = <T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  onClickOutside?: Function,
) => {
  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      const el = ref.current;
      const target = e.target as HTMLElement;

      if (!el || !target || el.contains(target)) return;
      onClickOutside?.();
    };

    window.addEventListener('click', clickHandler);

    return () => window.removeEventListener('click', clickHandler);
  }, []);
};

export default useClickOutside;
