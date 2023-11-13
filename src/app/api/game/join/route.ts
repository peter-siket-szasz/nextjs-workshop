import { db } from '@/lib/db';
import { ErrorResponse } from '@/types/ErrorResponse';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

interface JoinGameRequest {
  gameId: number;
}

interface JoinGameResponse {
  nextQuestion: number;
  playerAdded: boolean;
}

export async function POST(request: NextRequest) {
  let { gameId }: JoinGameRequest = await request.json();

  const cookieStore = cookies();
  // const token = cookieStore.get('playerId')?.value;
  const token = '642985';

  if (!token) {
    return NextResponse.json<ErrorResponse>(
      { error: 'No player cookie found' },
      { status: 400, statusText: 'Bad request' },
    );
  }

  const game = await db.selectFrom('games').selectAll().where('id', '=', gameId).executeTakeFirst();
  if (!game) {
    return NextResponse.json<ErrorResponse>(
      { error: 'Game not found' },
      { status: 404, statusText: 'Game not found.' },
    );
  }

  const player = await db.selectFrom('players').selectAll().where('token', '=', token).executeTakeFirst();
  if (!player) {
    return NextResponse.json<ErrorResponse>(
      { error: 'Player not found' },
      { status: 404, statusText: 'Player not found' },
    );
  }

  const playerGame = await db
    .insertInto('gamePlayer')
    .values({ playerId: player.id, gameId: game.id })
    .returningAll()
    .executeTakeFirst();
  console.log(JSON.stringify(playerGame));
  const questionIds = (await db.selectFrom('questions').select('id').execute()).map((q) => q.id);
  const randomQuestions = questionIds.sort(() => 0.5 - Math.random()).slice(0, 10);

  const playerGameQuestions = randomQuestions.map((questionId) => ({
    playerId: player.id,
    gameId: game.id,
    questionId,
  }));
  await db.insertInto('gamePlayerQuestion').values(playerGameQuestions).execute();
  return NextResponse.json<JoinGameResponse>({ nextQuestion: randomQuestions[0], playerAdded: true });
}
