// * components
import ThemeSwitch from '@/core/ThemeSwitch';
import FooterLink from './FooterLink';

// * config
import { nexdConfig } from '@/nexd.config';
const { footer = [] } = nexdConfig;

const Footer = () => {
  return (
    <footer className='border-default mx-auto w-full space-y-8 border-t bg-white/80 px-4 py-10 backdrop-blur dark:bg-black/80'>
      <div
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(212px, 1fr))' }}
        className='footer-top mx-auto grid max-w-4xl gap-x-4 gap-y-10'
      >
        {footer.map((column, index) => (
          <div key={index} className='flex flex-col gap-y-3 capitalize'>
            {column.title && <div className='mt-1 font-semibold'>{column.title}</div>}

            {column.items?.map((item, index) => <FooterLink key={index} item={item} />)}
          </div>
        ))}
      </div>

      <div className='footer-bottom mx-auto flex max-w-4xl items-center justify-between gap-x-4'>
        <p className='pb-2 text-center text-sm text-neutral-lighter'>
          &copy; {new Date().getFullYear()} Nexd
        </p>

        <ThemeSwitch />
      </div>
    </footer>
  );
};

export default Footer;
