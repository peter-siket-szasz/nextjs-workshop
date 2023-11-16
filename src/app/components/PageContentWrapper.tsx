import { Box } from '@chakra-ui/react';

type Props = {
  children: React.ReactNode;
};

export default function PageContentWrapper(props: Props) {
  return (
    <Box width='100%' alignItems='center' justifyContent='space-around' display='flex' flexDirection='column'>
      {props.children}
    </Box>
  );
}
