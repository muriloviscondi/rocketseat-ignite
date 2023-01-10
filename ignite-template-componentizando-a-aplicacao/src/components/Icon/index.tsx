import { useIcon } from './hook/useIcon';

import { IconProps } from './interface';

export function Icon({ name, color }: IconProps) {
  const { icon } = useIcon({ color });

  return icon[name];
}
