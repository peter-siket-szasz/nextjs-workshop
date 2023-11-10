import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(
  request: NextRequest,
) {
  let { gameId, questionId, answer }: { gameId: number, questionId: number, answer: number } = await request.json();
  const cookieStore = cookies();
  const playerId = cookieStore.get('playerId')?.value;

  const res = await fetch(`${process.env.BACKEND_BASE_URL}/game/answer`, {
    headers: { 'Content-type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({ questionId, answer, gameId, playerId }),
  });
  if (!res.ok) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, statusText: 'Internal server error' }
    );
  }
  const { nextQuestion, receivedAnswer, correctAnswer } = await res.json();
  return Response.json({ nextQuestion, receivedAnswer, correctAnswer });
}
