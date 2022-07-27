import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const UnlockIcon = ({ color, ...props }: SvgProps) => (
  <Svg
    width={30}
    height={30}
    fill='none'
    viewBox='0 0 15 15'
    {...props}
  >
    <Path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M0 7.5a7.5 7.5 0 1 1 15 0 7.5 7.5 0 0 1-15 0ZM7.621 4C6.726 4 6 4.726 6 5.621V6h3.5A1.5 1.5 0 0 1 11 7.5v3A1.5 1.5 0 0 1 9.5 12h-4A1.5 1.5 0 0 1 4 10.5v-3a1.5 1.5 0 0 1 1-1.415v-.464a2.621 2.621 0 0 1 4.475-1.853l.379.378-.708.708-.378-.38A1.621 1.621 0 0 0 7.62 4Z'
      fill={color}
    />
  </Svg>
);

export default UnlockIcon;
