'use client';

import { Box } from '@chakra-ui/react';
import IndexButton from './IndexButton';
import { useRouter } from 'next/navigation';

export default function CreateGameButton() {
  const router = useRouter();
  const id = 1;
  const questionId = 27;

  return (
    <Box>
      <IndexButton
        width="100px"
        height="50px"
        label="New Quiz"
        onClick={() => router.push(`/game/${id}/question/${questionId}`)}
      ></IndexButton>
    </Box>
  );
}
