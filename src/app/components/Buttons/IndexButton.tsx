/* eslint-disable indent */
import { Button } from '@chakra-ui/react';

type Props = {
  width: string;
  height: string;
  label: string;
  onClick?: () => void;
  textColor?: string | undefined;
  background?: string;
  isDisabled?: boolean;
  type?: 'submit' | undefined;
};

export default function IndexButton({ width, height, label, onClick, textColor, background, isDisabled, type }: Props) {
  return (
    <Button
      width={width}
      height={height}
      borderWidth='3px'
      textColor={textColor ?? 'black'}
      borderColor='white'
      background={background ?? 'white'}
      rounded='lg'
      _hover={
        !isDisabled
          ? {
              textColor: textColor ?? 'white',
              background: background ?? 'brand.lilac.500',
              borderColor: 'white',
            }
          : {}
      }
      onClick={onClick}
      isDisabled={isDisabled}
      _disabled={{ pointerEvents: 'none', opacity: 0.4 }}
      type={type}
    >
      {label}
    </Button>
  );
}
