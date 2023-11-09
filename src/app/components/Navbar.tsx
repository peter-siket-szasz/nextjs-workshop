import { Box, Flex, Text } from '@chakra-ui/react';
import NextImage from 'next/image';
import netlightLogo from '../../../public/images/boid.png';

export default function Navbar() {
  return (
    <Box px={4} height="10vh">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box width="50px" alignItems="center">
          <NextImage src={netlightLogo} alt="logo" />
        </Box>
        <Flex alignItems="center">
          <Box>
            <Text as="i" color="#E2DFF4">
              Play an amazing game ...
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
