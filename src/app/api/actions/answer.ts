'use server';

import { cookies } from 'next/headers';
import { ErrorResponse } from '@/types/ErrorResponse';
import { db } from '@/lib/db';
import { z } from 'zod';

interface AnswerRequest {
  gameId: number;
  questionId: number;
  answer: number;
  token?: string;
}

export interface AnswerResponse {
  nextQuestion?: number;
  receivedAnswer?: number;
  correctAnswer?: number;
}

export async function answer(prevState: any, formData: FormData): Promise<AnswerResponse | ErrorResponse> {
  //   return new Promise((resolve, reject) => setTimeout(() => resolve({}), 2000));
  const schema = z.object({
    gameId: z.number().min(1),
    questionId: z.number().min(1),
    answer: z.number().min(1),
    token: z.string().optional().nullable(),
  });
  let { gameId, questionId, answer, token } = schema.parse({
    gameId: Number(formData.get('gameId')),
    questionId: Number(formData.get('questionId')),
    answer: Number(formData.get('answer')),
    token: formData.get('token'),
  });

  const cookieStore = cookies();
  token ||= cookieStore.get('playerId')?.value;

  if (!token) {
    return { error: 'No player cookie found' };
  }

  try {
    const correctAnswerId = (
      await db.selectFrom('questions').select('correctOptionId').where('id', '=', questionId).executeTakeFirst()
    )?.correctOptionId;

    if (!correctAnswerId) {
      return { error: 'Question not found' };
    }

    const playerId = (await db.selectFrom('players').select('id').where('token', '=', token).executeTakeFirst())?.id;
    if (!playerId) {
      return { error: 'Player not found' };
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

    return {
      nextQuestion: nextQuestion?.questionId,
      receivedAnswer: answer,
      correctAnswer: correctAnswerId,
    };
  } catch (error) {
    console.error(error);
    return { error: 'Internal server error' };
  }
}
