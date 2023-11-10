import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

interface JoinGameRequest {
    playerName: string;
    gameId: number;
}

interface JoinGameResponse {
    nextQuestion: number;
    playerAdded: boolean;
}

export async function POST(request: NextRequest) {
  let { playerName, gameId }: JoinGameRequest = await request.json();

  const cookieStore = cookies();
  const playerId = cookieStore.get('playerId')?.value;

  const response = await fetch(`${process.env.BACKEND_BASE_URL}/game/new`, {
    headers: { 'Content-type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({ playerId, playerName, gameId }),
  });

  const { nextQuestion, playerAdded }: JoinGameResponse = await response.json();

  return NextResponse.json<JoinGameResponse>({
    nextQuestion,
    playerAdded,
  });
}
