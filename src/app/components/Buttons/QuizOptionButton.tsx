'use client';

import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import IndexButton from './IndexButton';

export default function QuizOptionButton({
  option,
  href,
}: {
  option?: string;
  href: string;
}) {
  const router = useRouter();
  return (
    <Box key={option}>
      <IndexButton
        width="300px"
        height="100px"
        label={option ?? ''}
        onClick={() => router.push(href)}
      ></IndexButton>
    </Box>
  );
}
