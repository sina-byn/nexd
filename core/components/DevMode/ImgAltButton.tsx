'use client';

import { useEffect, useRef, useState } from 'react';

const ImgAltButton = () => {
  const [active, setActive] = useState<boolean>(false);
  const styleRef = useRef<HTMLStyleElement>(null);

  const toggleHandler = () => setActive(prev => !prev);

  useEffect(() => {
    if (active) {
      const style = document.createElement('style');
      style.textContent = 'img:not([alt]), img[alt=""] {border: 2px solid red;}';
      document.head.appendChild(style);
      styleRef.current = style;
      return;
    }

    styleRef.current?.remove();

    return () => styleRef.current?.remove();
  }, [active]);

  return (
    <button type='button' onClick={toggleHandler} className='flex w-full items-center gap-x-2 px-3 py-1'>
      <input type='checkbox' readOnly checked={active} className='-mt-0.5' />
      Indicate images with no alt
    </button>
  );
};

export default ImgAltButton;
