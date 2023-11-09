'use client';

import IndexButton from './IndexButton';

type Props = {
  isDisabled: boolean;
  onClick: () => void;
};

const EnabledStyling = {
  textColor: 'white',
  background: '#7928CA',
};

const DisabledStyling = {
  textColor: 'white',
  background: 'transparent',
};

export function NextButton({ isDisabled, onClick }: Props) {
  return (
    <IndexButton
      width="100px"
      height="50px"
      label="Next"
      onClick={!isDisabled ? onClick : () => {}}
      isDisabled={isDisabled}
      textColor={
        isDisabled ? DisabledStyling.textColor : EnabledStyling.textColor
      }
      background={
        isDisabled ? DisabledStyling.background : EnabledStyling.textColor
      }
    />
  );
}
