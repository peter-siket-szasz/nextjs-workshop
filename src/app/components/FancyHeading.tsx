import { Text } from '@chakra-ui/react';

type Props = {
  text: string;
  fontSize: string;
};

export default function FancyHeading({ text, fontSize }: Props) {
  return (
    <Text
      as="b"
      fontSize={fontSize}
      bgClip="text"
      bgGradient="linear(to-l, #7928CA, #FF0080)"
    >
      {text}
    </Text>
  );
}
