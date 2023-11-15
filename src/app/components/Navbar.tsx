import { Box, Flex, Link, Text } from '@chakra-ui/react';
import NextImage from 'next/image';
import NextLink from 'next/link';
import netlightLogo from '../../../public/images/boid.png';

export default function Navbar() {
  return (
    <Box px={4} height='10vh'>
      <Flex h={16} alignItems='center' justifyContent='space-between'>
        <Box width='50px' alignItems='center'>
          <Link as={NextLink} href='/' isExternal>
            <NextImage src={netlightLogo} alt='logo' />
          </Link>
        </Box>
        <Flex alignItems='center'>
          <Box>
            <Link as={NextLink} href='/game/new' isExternal>
              <Text as='i' color='#E2DFF4'>
                Play an amazing game ...
              </Text>
            </Link>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
