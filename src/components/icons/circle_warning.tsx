import React from 'react';
import { SvgProps, SvgXml } from 'react-native-svg';

const xml = `
  <svg width="97" height="96" viewBox="0 0 97 96" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0)">
      <circle opacity="0.12" cx="48.5" cy="48" r="48" fill="#E94948"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M48.5 30C46.8431 30 45.5 31.3431 45.5 33V55C45.5 56.6569 46.8431 58 48.5 58C50.1569 58 51.5 56.6569 51.5 55V33C51.5 31.3431 50.1569 30 48.5 30ZM48.5 66C46.8431 66 45.5 64.6569 45.5 63C45.5 61.3431 46.8431 60 48.5 60C50.1569 60 51.5 61.3431 51.5 63C51.5 64.6569 50.1569 66 48.5 66Z" fill="#E94948"/>
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="96" height="96" fill="white" transform="translate(0.5)"/>
      </clipPath>
    </defs>
  </svg>
`;

type Props = {
  style?: SvgProps['style']
}

const WarningCircleIcon = ({ style }: Props) => (
  <SvgXml
    xml={xml}
    style={style}
    width={100}
    height={100}
  />
);

export default React.memo(WarningCircleIcon);
