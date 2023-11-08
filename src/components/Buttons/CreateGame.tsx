import { LinkBox, LinkOverlay } from '@chakra-ui/react';

export default function CreateGame() {
  return (
    <LinkBox
      as="button"
      width="200px"
      height="45px"
      margin="20px"
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
    >
      <LinkOverlay href='/api/game/new'>
        New Quiz
      </LinkOverlay>
    </LinkBox>
  );
}
