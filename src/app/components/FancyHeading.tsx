import { Box, Text } from '@chakra-ui/react';

type Props = {
  text: string;
  fontSize: string | { [key: string]: string };
};

export default function FancyHeading({ text, fontSize }: Props) {
  return (
    <Box textAlign='center'>
      <Text as='b' fontSize={fontSize} bgClip='text' bgGradient='linear(to-l, brand.coral.800, brand.lilac.800)'>
        {text}
      </Text>
    </Box>
  );
}
