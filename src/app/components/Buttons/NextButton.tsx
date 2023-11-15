'use client';

import IndexButton from './IndexButton';

type Props = {
  label: string;
  isDisabled: boolean;
  onClick: () => void;
};
export function NextButton({ label, isDisabled, onClick }: Props) {
  return (
    <IndexButton
      width='100px'
      height='50px'
      label={label}
      onClick={!isDisabled ? onClick : () => {}}
      isDisabled={isDisabled}
    />
  );
}
