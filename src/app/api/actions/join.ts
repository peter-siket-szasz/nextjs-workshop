'use server';

import { db } from '@/lib/db';
import { ErrorResponse } from '@/types/ErrorResponse';
import { cookies } from 'next/headers';
import { z } from 'zod';

// interface JoinGameRequest {
//   gameId: number;
//   playerName: string;
//   token?: string;
// }

export interface JoinGameResponse {
  nextQuestion?: number | undefined;
  playerAdded: boolean;
  gameId: number;
}

export async function joinGame(prevState: any, formData: FormData): Promise<JoinGameResponse | ErrorResponse> {
  const schema = z.object({
    gameId: z.number(),
    playerName: z.string(),
    token: z.string().optional().nullable(),
  });
  let { gameId, token, playerName } = schema.parse({
    gameId: Number(formData.get('gameId')),
    playerName: formData.get('playerName'),
    token: formData.get('token'),
  });

  const cookieStore = cookies();
  token ||= cookieStore.get('playerId')?.value;

  if (!token) {
    return { error: 'No player cookie found' };
  }

  const game = await db.selectFrom('games').selectAll().where('id', '=', gameId).executeTakeFirst();
  if (!game) {
    return { error: 'Game not found' };
  }

  const player =
    (await db.selectFrom('players').selectAll().where('token', '=', token).executeTakeFirst()) ||
    (await db.insertInto('players').values({ name: playerName, token }).returningAll().executeTakeFirst());

  if (!player) {
    return { error: 'Error while getting or inserting player' };
  }

  // Check if player is already in game
  const playerGameCheck = await db
    .selectFrom('gamePlayer')
    .selectAll()
    .where('playerId', '=', player.id)
    .where('gameId', '=', game.id)
    .executeTakeFirst();
  if (playerGameCheck) {
    // Get the next question id
    const res: { questionId: number } | undefined = await db
      .selectFrom('gamePlayerQuestion')
      .select('questionId')
      .where('playerId', '=', player.id)
      .where('gameId', '=', game.id)
      .executeTakeFirst();
    return { nextQuestion: res?.questionId, playerAdded: false, gameId };
  }

  const playerGame = await db
    .insertInto('gamePlayer')
    .values({ playerId: player.id, gameId: game.id })
    .returningAll()
    .executeTakeFirst();

  const questionIds = (await db.selectFrom('questions').select('id').execute()).map((q) => q.id);
  const randomQuestions = questionIds.sort(() => 0.5 - Math.random()).slice(0, 10);

  const playerGameQuestions = randomQuestions.map((questionId) => ({
    playerId: player.id,
    gameId: game.id,
    questionId,
  }));
  await db.insertInto('gamePlayerQuestion').values(playerGameQuestions).execute();
  return { nextQuestion: randomQuestions[0], playerAdded: true, gameId };
}
