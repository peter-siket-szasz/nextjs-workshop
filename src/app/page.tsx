import { Box, Button, Flex, Text } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import flock from '../../public/images/flock.png';

export default function Home() {
  return (
    <>
      <Navbar />
      <Box width="100vw" height="90vh">
        <div
          style={{
            backgroundImage: `url('${flock.src}')`,
            width: '90%',
            height: '90%',
            position: 'absolute',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
          }}
        ></div>
        <Flex alignItems="center">
          <Box>
            <Text fontSize="xl">You have the choice</Text>
          </Box>
          <Box margin="center" display="inline-grid">
            <Button>New Quiz</Button>
            <Button>Join Quiz</Button>
          </Box>
        </Flex>
      </Box>
    </>
  );
}
