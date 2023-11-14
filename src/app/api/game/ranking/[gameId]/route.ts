import { NextApiRequest } from 'next';

import { NextResponse } from 'next/server';
import { ErrorResponse } from '@/types/ErrorResponse';
import { getPlayersWithScore } from '../../game/[id]/route';

interface RankingEntry {
  name: string;
  score: number;
}

export async function GET(req: NextApiRequest, { params }: { params: { gameId: string } }) {
  try {
    const players = await getPlayersWithScore(parseInt(params.gameId));
    const sorted = players.toSorted((a, b) => b.score - a.score);
    return NextResponse.json<RankingEntry[]>(sorted);
  } catch {
    return NextResponse.json<ErrorResponse>(
      { error: 'Internal server error' },
      { status: 500, statusText: 'Internal server error' },
    );
  }
}
