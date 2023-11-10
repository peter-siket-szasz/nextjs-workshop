import { NextApiRequest } from 'next';

import { NextResponse } from 'next/server';
import { Ranking } from '@/types/Ranking';
import { ErrorResponse } from '@/types/ErrorResponse';

export async function GET(req: NextApiRequest, { params }: {params: {gameId: string}}) {
  const response = await fetch(`${process.env.BACKEND_BASE_URL}/ranking/${params.gameId}`);

  if (!response.ok) {
    const { error } = await response.json();
    return NextResponse.json<ErrorResponse>(
      { error },
      { status: response.status, statusText: 'Internal server error' }
    );
  }

  const ranking: Ranking = await response.json();
  return NextResponse.json<Ranking>(ranking);
}
