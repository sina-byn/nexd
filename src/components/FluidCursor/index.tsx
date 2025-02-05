'use client';

import { useEffect } from 'react';

import fluidCursor from './fluidCursor';

const FluidCursor = () => {
  useEffect(() => {
    fluidCursor();
  }, []);

  return (
    <div className='fixed inset-0'>
      <canvas id='fluid' className='size-full' />
    </div>
  );
};

export default FluidCursor;
