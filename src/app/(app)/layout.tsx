// * types
type AppLayoutProps = { children: React.ReactNode };

const AppLayout = ({ children }: AppLayoutProps) => {
  return <div className='min-h-dvh pt-16'>{children}</div>;
};

export default AppLayout;
