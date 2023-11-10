import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ErrorResponse } from '@/types/ErrorResponse';

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

  const response = await fetch(`${process.env.BACKEND_BASE_URL}/game/answer`, {
    headers: { 'Content-type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({ questionId, answer, gameId, playerId }),
  });

  if (!response.ok) {
    const { error } = await response.json();
    return NextResponse.json<ErrorResponse>(
      { error },
      { status: response.status, statusText: 'Internal server error' }
    );
  }

  const { nextQuestion, receivedAnswer, correctAnswer }: AnswerResponse = await response.json();
  return NextResponse.json<AnswerResponse>({ nextQuestion, receivedAnswer, correctAnswer });
}
