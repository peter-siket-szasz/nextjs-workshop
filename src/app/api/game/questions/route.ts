import { NextApiRequest } from 'next';

import { Question, QuestionWithoutAnswer } from '@/types/Question';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { ErrorResponse } from '@/types/ErrorResponse';

export async function GET(req: NextApiRequest) {
  try {
    const questions: Question[] = await db.selectFrom('questions').selectAll().execute();
    return NextResponse.json<QuestionWithoutAnswer[]>(questions.map(({ correctOptionId, ...question }) => question));
  } catch (error) {
    console.error(error);
    return NextResponse.json<ErrorResponse>(
      { error: 'Internal server error' },
      { status: 500, statusText: 'Internal server error' },
    );
  }
}
