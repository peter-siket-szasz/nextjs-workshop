import { Card, CardHeader, Heading, LinkBox, LinkOverlay } from '@chakra-ui/react';

export default function Option({option}: {option?: string}) {
  return (
    <LinkBox key={option} as={Card} maxW='sm'>
      <CardHeader>
        <Heading size='md'>
          <LinkOverlay href='#'>
            {option}
          </LinkOverlay>
        </Heading>
      </CardHeader>
    </LinkBox>
  );
}