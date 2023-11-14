import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ErrorResponse } from '@/types/ErrorResponse';
import { db } from '@/lib/db';

interface AnswerRequest {
  gameId: number;
  questionId: number;
  answer: number;
  token?: string;
}

interface AnswerResponse {
  nextQuestion: number | undefined;
  receivedAnswer: number;
  correctAnswer: boolean;
}

export async function POST(request: NextRequest) {
  let { gameId, questionId, answer, token }: AnswerRequest = await request.json();

  const cookieStore = cookies();
  token ||= cookieStore.get('playerId')?.value;

  if (!token) {
    return NextResponse.json<ErrorResponse>(
      { error: 'No player cookie found' },
      { status: 400, statusText: 'Bad request' },
    );
  }

  try {
    const correctAnswerId = (
      await db.selectFrom('questions').select('correctOptionId').where('id', '=', questionId).executeTakeFirst()
    )?.correctOptionId;

    const playerId = (await db.selectFrom('players').select('id').where('token', '=', token).executeTakeFirst())?.id;
    if (!playerId) {
      return NextResponse.json<ErrorResponse>(
        { error: 'Player not found' },
        { status: 404, statusText: 'Player not found' },
      );
    }

    const removeQuestionFromPlayer = await db
      .deleteFrom('gamePlayerQuestion')
      .where('playerId', '=', playerId)
      .where('questionId', '=', questionId)
      .where('gameId', '=', gameId)
      .execute();

    const isAnswerCorrect = correctAnswerId === answer;

    if (isAnswerCorrect) {
      await db
        .updateTable('gamePlayer')
        .set((eb) => ({ score: eb('score', '+', 100) }))
        .where('gameId', '=', gameId)
        .where('playerId', '=', playerId)
        .execute();
    }
    const nextQuestion = await db
      .selectFrom('gamePlayerQuestion')
      .select('questionId')
      .where('gameId', '=', gameId)
      .where('playerId', '=', playerId)
      .executeTakeFirst();

    return NextResponse.json<AnswerResponse>({
      nextQuestion: nextQuestion?.questionId,
      receivedAnswer: answer,
      correctAnswer: correctAnswerId === answer,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json<ErrorResponse>(
      { error: 'Internal server error' },
      { status: 500, statusText: 'Internal server error' },
    );
  }
}
