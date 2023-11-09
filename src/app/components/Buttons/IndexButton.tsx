import { Box } from '@chakra-ui/react';

type Props = {
  width: string;
  height: string;
  label: string;
  onClick: () => void;
};

export default function IndexButton({ width, height, label, onClick }: Props) {
  return (
    <Box
      as="button"
      width={width}
      height={height}
      margin="10px"
      borderWidth="3px"
      textColor="black"
      borderColor="white"
      background="white"
      rounded="lg"
      _hover={{
        background: '#FF0080',
        textColor: 'white',
        borderColor: 'white',
      }}
      onClick={onClick}
    >
      {label}
    </Box>
  );
}
