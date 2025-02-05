// * utils
import { extractSidebarTree } from '@/utils/sidebar';

// * components
import Sidebar from '@/layout/Sidebar';
import MenuMobile from '@/core/MenuMobile';
import SidebarBackdrop from '@/core/SidebarBackdrop';

// * types
type DocLayoutProps = { children: React.ReactNode };

const DocLayout = async ({ children }: DocLayoutProps) => {
  const sidebarTree = await extractSidebarTree();

  return (
    <div className='relative lg:grid lg:grid-cols-[auto_1fr_auto]'>
      <div className='sidebar-pane stack pointer-events-none fixed inset-y-0 left-0 z-30 w-full lg:sticky lg:top-16 lg:z-0 lg:h-[calc(100dvh_-_4rem)] lg:w-[300px]'>
        <SidebarBackdrop />

        <div className='pointer-events-none top-16 h-full overflow-y-auto'>
          <Sidebar sidebarTree={sidebarTree} />
        </div>

        <MenuMobile />
      </div>

      {children}
    </div>
  );
};

export default DocLayout;
