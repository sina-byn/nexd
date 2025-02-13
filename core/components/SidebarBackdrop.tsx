'use client';

const SidebarBackdrop = () => {
  const closeHandler = () => {
    document.documentElement.classList.remove('menu-open', 'sidebar-open');
  };

  return (
    <div
      onClick={closeHandler}
      className='sidebar-backdrop pointer-events-auto size-full -translate-x-full bg-black/60 duration-200 lg:hidden'
    />
  );
};

export default SidebarBackdrop;
