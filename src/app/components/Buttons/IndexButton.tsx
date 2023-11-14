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

export default function IndexButton({
  width,
  height,
  label,
  onClick,
  textColor,
  background,
  isDisabled,
  type,
}: Props) {
  return (
    <Button
      width={width}
      height={height}
      margin="10px"
      borderWidth="3px"
      textColor={textColor ?? 'black'}
      borderColor="white"
      background={background ?? 'white'}
      rounded="lg"
      _hover={{
        textColor: textColor ?? 'white',
        background: background ?? '#FF0080',
        borderColor: 'white',
      }}
      onClick={onClick}
      isDisabled={isDisabled ?? false}
      type={type}
    >
      {label}
    </Button>
  );
}
