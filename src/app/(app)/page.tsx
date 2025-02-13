import Link from 'next/link';

// * components
import Box from '@/components/Box';
import Picture from '@/core/components/Picture';

const AppPage = () => {
  return (
    <div className='z-20 px-4'>
      <img src='/bg.svg' className='fixed top-0 ml-16 opacity-90' />

      <main className='mx-auto flex max-w-6xl flex-col'>
        <div className='relative top-0 flex flex-col items-center justify-center gap-y-8 py-32'>
          <Box />

          <Picture
            alt='nexd logo'
            className='mx-auto'
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

          <Link
            href='/docs/getting-started'
            className='mt-7 rounded-md bg-primary px-6 py-2 font-medium text-foreground-light'
          >
            Get Started
          </Link>
        </div>

        <div className='relative flex h-fit items-center justify-center'>
          <Box />

          <div className='grid w-full items-center justify-items-center gap-6 px-10 py-32 sm:px-24 md:grid-cols-4 lg:px-32'>
            <h2 className='mb-12 text-center text-3xl font-bold md:col-span-4'>Built with</h2>

            <a href='https://nextjs.org' target='_blank' rel='noopener nofollow noreferrer'>
              <img src='/logos/nextjs.svg' className='w-20 grayscale hover:grayscale-0' />
            </a>

            <a href='https://tailwindcss.com/' target='_blank' rel='noopener nofollow noreferrer'>
              <img src='/logos/tailwind.svg' className='w-20 grayscale hover:grayscale-0' />
            </a>

            <a
              href='https://www.typescriptlang.org/'
              target='_blank'
              rel='noopener nofollow noreferrer'
            >
              <img src='/logos/ts.svg' className='w-20 grayscale hover:grayscale-0' />
            </a>

            <a href='https://mdxjs.com/' target='_blank' rel='noopener nofollow noreferrer'>
              <img src='/logos/mdx.svg' className='w-20 grayscale hover:grayscale-0' />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AppPage;
