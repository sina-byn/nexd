import type { Icon, IconProps } from '@tabler/icons-react';

type IconOverrides = { size?: number; stroke?: number };

export const withIconOverrides = (_Icon: Icon, overrides: IconOverrides) => {
  const { size, stroke } = overrides;

  return (props: Omit<IconProps, 'size' | 'stroke'>) => {
    return <_Icon size={size} stroke={stroke} {...props} />;
  };
};
