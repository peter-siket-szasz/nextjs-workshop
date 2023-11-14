import { db } from '@/lib/db';
import { ErrorResponse } from '@/types/ErrorResponse';
import { Game } from '@/types/Game';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // const games = await db.selectFrom('games').selectAll().execute();
    const rows = await db
      .selectFrom('games')
      .leftJoin('gamePlayer', 'gamePlayer.gameId', 'games.id')
      .leftJoin('players', 'gamePlayer.playerId', 'players.id')
      .select(({ fn, val, ref }) => [
        ref('games.id').as('gameId'),
        'games.createdAt',
        ref('players.id').as('playerId'),
        'players.name',
        'players.token',
        'score',
      ])
      .execute();
    // Format into Game[] format with players inside as an array
    const gamesWithPlayers = rows.reduce((acc, row) => {
      const gameIndex = acc.findIndex((g) => g.id === row.gameId);
      if (gameIndex === -1) {
        acc.push({
          id: row.gameId,
          createdAt: row.createdAt,
          players:
            row.playerId && row.name && row.token
              ? [{ id: row.playerId, name: row.name, token: row.token, score: row.score || 0 }]
              : [],
        });
      } else {
        if (row.playerId && row.name && row.token) {
          acc[gameIndex].players?.push({ id: row.playerId, name: row.name, token: row.token, score: row.score || 0 });
        }
      }
      return acc;
    }, [] as Game[]);
    return NextResponse.json<Game[]>(gamesWithPlayers.toSorted((a, b) => a.id - b.id));
  } catch (error) {
    console.error(error);
    return NextResponse.json<ErrorResponse>(
      { error: 'Internal server error' },
      { status: 500, statusText: 'Internal server error' },
    );
  }
}
