import React from 'react';
import { SvgProps, SvgXml } from 'react-native-svg';

const xml = `
  <svg width="97" height="96" viewBox="0 0 97 96" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0)">
      <circle opacity="0.12" cx="48.5" cy="48" r="48" fill="#E94948"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M31.5056 60.1386C30.1648 61.4794 30.1648 63.6533 31.5056 64.9941C32.8464 66.3349 35.0203 66.3349 36.3611 64.9941L48.4998 52.8554L60.6389 64.9945C61.9797 66.3353 64.1536 66.3353 65.4944 64.9945C66.8352 63.6537 66.8352 61.4799 65.4944 60.139L53.3553 47.9999L65.4941 35.8611C66.8349 34.5203 66.8349 32.3464 65.4941 31.0056C64.1533 29.6648 61.9794 29.6648 60.6386 31.0056L48.4998 43.1444L36.3614 31.0061C35.0206 29.6653 32.8467 29.6653 31.5059 31.0061C30.1651 32.3469 30.1651 34.5208 31.5059 35.8616L43.6443 47.9999L31.5056 60.1386Z" fill="#E94948"/>
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

const ErrorCircleIcon = ({ style }: Props) => (
  <SvgXml
    xml={xml}
    style={style}
    width={100}
    height={100}
  />
);

export default React.memo(ErrorCircleIcon);
