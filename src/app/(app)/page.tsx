import Link from 'next/link';

// * components
import Picture from '@/components/core/Picture';

const AppPage = () => {
  return (
    <div className='z-20 h-dvh px-4 pt-40'>
      <main className='mx-auto max-w-4xl'>
        <div className='relative flex flex-col items-center justify-center gap-y-8 py-8'>
          <svg
            viewBox='0 0 1440 780'
            className='pointer-events-none absolute -inset-y-6 mx-auto scale-[1.3]'
          >
            <path
              d='M0 100, L1440 100'
              strokeWidth={2}
              strokeDasharray={5}
              className='stroke-neutral-400/30'
            />

            <path
              d='M1340 0, L1340 780'
              strokeWidth={2}
              strokeDasharray={5}
              className='stroke-neutral-400/30'
            />

            <path
              d='M0 680, L1440 680'
              strokeWidth={2}
              strokeDasharray={5}
              className='stroke-neutral-400/30'
            />

            <path
              d='M100 0, L100 780'
              strokeWidth={2}
              strokeDasharray={5}
              className='stroke-neutral-400/30'
            />
          </svg>

          <Picture
            alt='nexd logo'
            className='mx-auto mt-2'
            darkSrc='/logo-dark.svg'
            lightSrc='/logo-light.svg'
          />

          <p className='max-w-3xl text-center text-3xl font-bold'>
            Creating documentation websites with&nbsp;
            <a
              target='_blank'
              className='text-primary'
              href='https://nextjs.org'
              rel='noopener nofollow noreferrer'
            >
              Next.js
            </a>
            &nbsp;has never been easier
          </p>

          <p className='text-center text-2xl'>
            <span className='font-semibold text-primary'>Open-source</span>
            &nbsp;at its finest
          </p>

          <Link href='/docs' className='mt-7 rounded-md bg-primary px-6 py-2 font-medium'>
            Get Started
          </Link>
        </div>
      </main>
    </div>
  );
};

export default AppPage;
