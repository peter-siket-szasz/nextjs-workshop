'use client';

import { Box, Link, Text } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import LoadingSpinner from '../LoadingSpinner';
import { experimental_useFormState as useFormState } from 'react-dom';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';
import { create } from '@/app/api/actions/create';
import IndexButton from '../Buttons/IndexButton';

export default function NewGameForm() {
  const [createState, formAction] = useFormState(create, undefined);

  if (!createState) {
    return (
      <form action={formAction}>
        <CreateGameButton />
      </form>
    );
  } else if ('error' in createState) {
    return (
      <Box display='flex' flexDirection='column' background='white' padding='20px' borderRadius='md'>
        <Text as='i' fontSize='xl'>
          {createState.error}
        </Text>
      </Box>
    );
  } else {
    return (
      <>
        <Box display='flex' flexDirection='column' background='white' padding='20px' borderRadius='md'>
          <Text as='i' fontSize='xl'>
            A new game with id
          </Text>
          <Text as='b' fontSize='5xl' color='brand.lilac.800'>
            {createState.id}
          </Text>
          <Text as='i' fontSize='xl'>
            has been created.
          </Text>
        </Box>
        <Box paddingTop='50px'>
          <Text>Go back to the</Text>
          <Link as={NextLink} href='/' color='brand.lilac.800'>
            home page
            <ExternalLinkIcon mx='2px' />
          </Link>
          <Text>to login into the game.</Text>
        </Box>
      </>
    );
  }
}

function CreateGameButton() {
  const { pending } = useFormStatus();

  return pending ? <LoadingSpinner /> : <IndexButton width='100px' height='50px' label='New Quiz' type='submit' />;
}
