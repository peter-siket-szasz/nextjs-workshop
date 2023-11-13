import { NextApiRequest } from 'next';

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { ErrorResponse } from '@/types/ErrorResponse';
import { Game } from '@/types/Game';
import { Player } from '@/types/Player';

export async function GET(req: NextApiRequest, { params }: { params: { id: string } }) {
  try {
    const game: Game | undefined = await db
      .selectFrom('games')
      .selectAll()
      .where('id', '=', parseInt(params.id))
      .executeTakeFirst();
    if (!game)
      return NextResponse.json<ErrorResponse>(
        { error: 'Question not found' },
        { status: 404, statusText: 'Question not found' },
      );
    // Get player ids of game
    const playerIds = (
      await db.selectFrom('gamePlayer').select('playerId').where('gameId', '=', game.id).execute()
    ).map((obj) => obj.playerId);
    // Map player ids to players
    const players: Player[] = await Promise.all(
      playerIds.map(
        async (playerId) => await db.selectFrom('players').selectAll().where('id', '=', playerId).executeTakeFirst(),
      ),
      // Filter out undefined players (TypeScript compliance)
    ).then((res) => res.filter((player): player is Player => !!player));
    return NextResponse.json<Game>({ ...game, players: players });
  } catch (error) {
    console.error(error);
    return NextResponse.json<ErrorResponse>(
      { error: 'Internal server error' },
      { status: 500, statusText: 'Internal server error' },
    );
  }
}
