import COLORS from 'config/colors';
import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const ToggleIcon = ({ color = COLORS.PRIMARY_MAIN, ...props }: SvgProps) => (
  <Svg
    width={24}
    height={24}
    viewBox='0 0 15 15'
    fill='none'
    {...props}
  >
    <Path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M0 3.5A3.5 3.5 0 0 1 3.5 0h8a3.5 3.5 0 1 1 0 7h-8A3.5 3.5 0 0 1 0 3.5ZM3.5 2a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM15 11.5a3.5 3.5 0 0 1-3.5 3.5h-8a3.5 3.5 0 1 1 0-7h8a3.5 3.5 0 0 1 3.5 3.5ZM11.5 13a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z'
      fill={color}
    />
  </Svg>
);

export default ToggleIcon;
