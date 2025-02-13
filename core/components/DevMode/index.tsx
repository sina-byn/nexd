// * components
import DevModeBtton from './DevModeButton';
import DevModePopover from './DevModePopover';

const DevMode = () => {
  if (process.env.NODE_ENV === 'production') return null;

  return (
    <div id='dev-mode-root' className='isolate fixed bottom-4 right-4 z-50'>
      <DevModeBtton>
        <DevModePopover />
      </DevModeBtton>
    </div>
  );
};

export default DevMode;
