import React from 'react';

const Box = () => {
  return (
    <svg
      viewBox='0 0 1440 780'
      preserveAspectRatio='none'
      className='pointer-events-none absolute inset-0 mx-auto h-full w-full'
    >
      <path
        d='M0 100, L1440 100'
        strokeWidth={2}
        strokeDasharray={5}
        vectorEffect='non-scaling-stroke'
        className='stroke-neutral-400/20'
      />

      <path
        d='M1340 0, L1340 780'
        strokeWidth={2}
        strokeDasharray={5}
        vectorEffect='non-scaling-stroke'
        className='stroke-neutral-400/20'
      />

      <path
        d='M0 680, L1440 680'
        strokeWidth={2}
        strokeDasharray={5}
        vectorEffect='non-scaling-stroke'
        className='stroke-neutral-400/20'
      />

      <path
        d='M100 0, L100 780'
        strokeWidth={2}
        strokeDasharray={5}
        vectorEffect='non-scaling-stroke'
        className='stroke-neutral-400/20'
      />
    </svg>
  );
};

export default Box;
