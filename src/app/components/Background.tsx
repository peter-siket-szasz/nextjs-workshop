import { Box } from '@chakra-ui/react';

type Props = {
  children: React.ReactNode;
};

export default function Background(props: Props) {
  return (
    <Box w='100%' h='100%' bgGradient={['linear(to-tr, brand.yellow.200, brand.lilac.400)']}>
      {props.children}
    </Box>
  );
}
