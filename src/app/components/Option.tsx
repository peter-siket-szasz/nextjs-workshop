'use client';
import { Card, CardHeader, Heading, LinkBox, LinkOverlay } from '@chakra-ui/react';

export default function Option({option, href}: {option?: string, href?: string}) {
  return (
    <LinkBox key={option} as={Card} width='sm' mx='auto'>
      <CardHeader>
        <Heading size='md'>
          <LinkOverlay  href={href}>
            {option}
          </LinkOverlay>
        </Heading>
      </CardHeader>
    </LinkBox>
  );
}