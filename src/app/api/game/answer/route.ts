import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

interface AnswerRequest {
  gameId: number;
  questionId: number;
  answer: number;
}

interface AnswerResponse {
  nextQuestion: number;
  receivedAnswer: boolean;
  correctAnswer: boolean;
}

interface AnswerErrorResponse {
  error: string;
}

export async function POST(
  request: NextRequest,
) {
  let { gameId, questionId, answer }: AnswerRequest = await request.json();
  const cookieStore = cookies();
  const playerId = cookieStore.get('playerId')?.value;

  const res = await fetch(`${process.env.BACKEND_BASE_URL}/game/answer`, {
    headers: { 'Content-type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({ questionId, answer, gameId, playerId }),
  });
  if (!res.ok) {
    return NextResponse.json<AnswerErrorResponse>(
      { error: 'Internal server error' },
      { status: 500, statusText: 'Internal server error' }
    );
  }
  const { nextQuestion, receivedAnswer, correctAnswer }: AnswerResponse = await res.json();
  return NextResponse.json<AnswerResponse>({ nextQuestion, receivedAnswer, correctAnswer });
}
