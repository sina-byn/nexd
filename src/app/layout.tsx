import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';

import './globals.css';

export const dynamic = 'force-static';

// * components
import Header from '@/core/layout/Header';
import Footer from '@/core/layout/Footer';
import DevMode from '@/core/components/DevMode';
import FluidCursor from '@/components/FluidCursor';

// * config
import { resolveFavicon } from '../../nexd.config';

export const metadata: Metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
  icons: {
    icon: resolveFavicon(),
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en' className={GeistSans.className} suppressHydrationWarning>
      <head>
        <script src='/js/no-fouc.js'></script>
      </head>

      <body>
        <FluidCursor />

        <div className='relative z-20'>
          <Header />
          {children}

          <Footer />
        </div>

        <div id='popup-root' />
        <DevMode />
      </body>
    </html>
  );
};

export default RootLayout;
