'use client';

import { Box, Link, Text } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import useSWRMutation from 'swr/mutation';
import { useEffect, useState } from 'react';
import FancyHeading from '../FancyHeading';
import CreateGameButton from '../Buttons/CreateGameButton';

export default function CreateGameForm() {
  const [createdGameId, setCreatedGameId] = useState(null);

  const { data, trigger, error } = useSWRMutation('/api/game/new', createGame);

  useEffect(() => {
    setCreatedGameId(data?.id);
  }, [data]);

  if (!createdGameId) {
    return <CreateGameButton onClick={() => trigger()} />;
  } else if (error) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        background="white"
        padding="20px"
        borderRadius="md"
      >
        <Text as="i" fontSize="xl">
          {error}
        </Text>
      </Box>
    );
  } else {
    return (
      <>
        <Box
          display="flex"
          flexDirection="column"
          background="white"
          padding="20px"
          borderRadius="md"
        >
          <Text as="i" fontSize="xl">
            A new game with id
          </Text>
          <FancyHeading text={createdGameId} fontSize="50px" />
          <Text as="i" fontSize="xl">
            has been created.
          </Text>
        </Box>
        <Box paddingTop="50px">
          <Text>Go back to the</Text>
          <Link as={NextLink} href="/" color="#FF0080" isExternal>
            home page
            <ExternalLinkIcon mx="2px" />
          </Link>
          <Text>to login into the game.</Text>
        </Box>
      </>
    );
  }
}

async function createGame(url: string) {
  return fetch(url, {
    method: 'POST',
  }).then((res) => res.json());
}
