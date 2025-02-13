// * components
import Logo from '@/core/components/Logo';
import Menu from '@/core/components/Menu';
import Search from '@/core/components/Search';
import MenuButton from '@/core/components/MenuButton';

const Header = () => {
  return (
    <header className='fixed inset-x-0 top-0 z-30 h-16'>
      <div className='border-default flex h-full items-center justify-between gap-x-4 border-b bg-white/80 px-4 backdrop-blur dark:bg-black/80'>
        <div className='left flex items-center gap-x-4'>
          <MenuButton />
          <Logo className='w-14 lg:w-16' />
          <Menu />
        </div>

        <div className='right flex items-center gap-x-2'>
          <Search />
        </div>
      </div>
    </header>
  );
};

export default Header;
