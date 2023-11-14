import { NextApiRequest } from 'next';

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { ErrorResponse } from '@/types/ErrorResponse';
import { Game } from '@/types/Game';
import { Player } from '@/types/Player';

export async function getPlayersWithScore(gameId: number): Promise<Array<Player & { score: number }>> {
  const players = await db
    .selectFrom('gamePlayer')
    .innerJoin('players', 'gamePlayer.playerId', 'players.id')
    .select(['players.id', 'players.name', 'players.token', 'gamePlayer.score'])
    .where('gameId', '=', gameId)
    .execute();
  return players;
}

export async function GET(req: NextApiRequest, { params }: { params: { id: string } }) {
  try {
    const game: Game | undefined = await db
      .selectFrom('games')
      .selectAll()
      .where('id', '=', parseInt(params.id))
      .executeTakeFirst();
    if (!game)
      return NextResponse.json<ErrorResponse>(
        { error: 'Game not found' },
        { status: 404, statusText: 'Game not found' },
      );
    const players = await getPlayersWithScore(game.id);
    return NextResponse.json<Game>({ ...game, players: players });
  } catch (error) {
    console.error(error);
    return NextResponse.json<ErrorResponse>(
      { error: 'Internal server error' },
      { status: 500, statusText: 'Internal server error' },
    );
  }
}
