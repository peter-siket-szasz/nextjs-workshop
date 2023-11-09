import { Box, Flex, Text } from '@chakra-ui/react';
import JoinGameButton from './components/Buttons/JoinGameButton';
import CreateGameButton from './components/Buttons/CreateGameButton';

export default function Home() {
  return (
    <Flex
      height="90vh"
      alignItems="center"
      justifyContent="center"
      display="flex"
      flexDirection="column"
    >
      <Text
        as="b"
        fontSize="150px"
        bgClip="text"
        bgGradient="linear(to-l, #7928CA, #FF0080)"
      >
        Let&apos;s play a game
      </Text>
      <Box
        width="50%"
        alignItems="center"
        justifyContent="center"
        display="flex"
        flexDirection="row"
      >
        <CreateGameButton />
        <JoinGameButton />
      </Box>
    </Flex>
  );
}
