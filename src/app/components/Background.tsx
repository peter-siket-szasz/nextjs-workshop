import { Box } from '@chakra-ui/react';

type Props = {
  children: React.ReactNode;
};

export default function Background(props: Props) {
  return (
    <Box
      w="100%"
      h="100%"
      bgGradient={['linear(to-tr, orange.100, purple.300)']}
    >
      {props.children}
    </Box>
  );
}
