const NotFound = () => {
  return (
    <div
      className='fixed inset-0 isolate z-50 flex flex-col items-center justify-center bg-background'
      style={{
        fontFamily:
          'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
      }}
    >
      <div>
        <h1 className='mr-5 inline-block border-r border-black/30 pr-6 align-top text-2xl font-medium leading-10 dark:border-white/30'>
          404
        </h1>

        <div className='inline-block'>
          <h2 className='m-0 text-sm font-normal leading-10'>This page could not be found.</h2>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
