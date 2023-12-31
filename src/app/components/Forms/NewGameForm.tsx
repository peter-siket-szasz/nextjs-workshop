'use client';

import { Box, Link, Text } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import { useNewGame } from '../../hooks/api/game/new';
import { useEffect, useState } from 'react';
import CreateGameButton from '../Buttons/CreateGameButton';
import LoadingSpinner from '../LoadingSpinner';

export default function NewGameForm() {
  const { data, trigger, isMutating, error } = useNewGame();

  const [createdGameId, setCreatedGameId] = useState<number | undefined>(undefined);

  useEffect(() => {
    setCreatedGameId(data?.id);
  }, [data]);

  if (!createdGameId) {
    return <CreateGameButton onClick={() => trigger()} />;
  } else if (isMutating) {
    return <LoadingSpinner />;
  } else if (error) {
    return (
      <Box display='flex' flexDirection='column' background='white' padding='20px' borderRadius='md'>
        <Text as='i' fontSize='xl'>
          {error}
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
            {createdGameId}
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
