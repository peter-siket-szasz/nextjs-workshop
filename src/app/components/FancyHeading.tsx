import { Text } from '@chakra-ui/react';

type Props = {
  text: string;
  fontSize: string;
};

export default function FancyHeading({ text, fontSize }: Props) {
  return (
    <Text as='b' fontSize={fontSize} bgClip='text' bgGradient='linear(to-l, brand.coral.800, brand.lilac.800)'>
      {text}
    </Text>
  );
}
