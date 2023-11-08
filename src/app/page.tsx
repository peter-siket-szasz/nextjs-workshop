import { Box, Flex, Text } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import JoinGame from '@/components/Buttons/JoinGame';
import CreateGame from '@/components/Buttons/CreateGame';
import Background from './components/Background';

export default function Home() {
  return (
    <Background>
      <Navbar />
      <Flex
        height="90vh"
        alignItems="center"
        justifyContent="center"
        display="flex"
        flexDirection="column"
      >
        <Text
          as="b"
          fontSize="100px"
          bgClip="text"
          bgGradient="linear(to-l, #7928CA, #FF0080)"
        >
          You have the choice
        </Text>
        <Box
          width="50%"
          alignItems="center"
          justifyContent="center"
          display="flex"
          flexDirection="row"
        >
          <CreateGame />
          <JoinGame />
        </Box>
      </Flex>
    </Background>
  );
}
