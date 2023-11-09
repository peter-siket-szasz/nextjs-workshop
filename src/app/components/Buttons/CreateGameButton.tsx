'use client';

import { Alert, AlertIcon, Box } from '@chakra-ui/react';
import IndexButton from './IndexButton';
import { useState } from 'react';

export default function CreateGameButton() {
  const [createdGameId, setCreatedGameId] = useState('');

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

  return (
    <>
      <Box>
        <IndexButton
          width="100px"
          height="50px"
          label="New Quiz"
          onClick={createGame}
        ></IndexButton>
      </Box>
      {createdGameId != '' ?? (
        <Alert status="info">
          <AlertIcon />A game with id {createdGameId} has been successfully
          created.
        </Alert>
      )}
    </>
  );
}
