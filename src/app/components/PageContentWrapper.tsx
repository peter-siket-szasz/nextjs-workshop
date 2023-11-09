import { Box } from '@chakra-ui/react';

type Props = {
  children: React.ReactNode;
};

export default function PageContentWrapper(props: Props) {
  return (
    <Box
      width="100%"
      height="90vh"
      padding="8"
      alignItems="center"
      justifyContent="center"
      display="flex"
      flexDirection="column"
    >
      {props.children}
    </Box>
  );
}
