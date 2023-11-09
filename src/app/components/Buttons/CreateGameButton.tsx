'use client';

import { Box } from '@chakra-ui/react';
import IndexButton from './IndexButton';
import { useRouter } from 'next/navigation';

export default function CreateGameButton() {
  const router = useRouter();
  return (
    <Box>
      <IndexButton
        width="200px"
        height="50px"
        label="New Quiz"
        onClick={() => router.push('/quiz/1')}
      ></IndexButton>
    </Box>
  );
}
