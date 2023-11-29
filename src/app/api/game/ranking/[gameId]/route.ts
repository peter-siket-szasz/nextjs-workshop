import { NextRequest, NextResponse } from 'next/server';
import { ErrorResponse } from '@/types/ErrorResponse';
import { getRanking } from '@/app/actions/util';

interface RankingEntry {
  name: string;
  score: number;
}

export async function GET(req: NextRequest, { params }: { params: { gameId: string } }) {
  try {
    const players = await getRanking(parseInt(params.gameId));
    return NextResponse.json<RankingEntry[]>(players);
  } catch {
    return NextResponse.json<ErrorResponse>(
      { error: 'Internal server error' },
      { status: 500, statusText: 'Internal server error' },
    );
  }
}
