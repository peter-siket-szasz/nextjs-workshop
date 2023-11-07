import { Box, Button } from '@chakra-ui/react';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <Box width="100vw" height="90vh" bgColor="white" textAlign='center'>
        <Box margin='center' display='inline-grid'>
          <Button>New Quiz</Button>
          <Button>Join Quiz</Button>
        </Box>
      </Box>
    </>
  );
}
