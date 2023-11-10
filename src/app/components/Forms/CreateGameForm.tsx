'use client';

import { Box, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useState } from 'react';
import FancyHeading from '../FancyHeading';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import CreateGameButton from '../Buttons/CreateGameButton';

export default function CreateGameForm() {
  const [createdGameId, setCreatedGameId] = useState(null);

  async function createGame() {
    try {
      await fetch('/api/game/new', {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((data) => setCreatedGameId(data.body.gameId));
    } catch (error) {
      console.log(error);
    }
  }

  if (!createdGameId) {
    return <CreateGameButton onClick={() => createGame()} />;
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