import { NextApiRequest } from 'next';

import { Question, QuestionWithAnswer } from '@/types/Question';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export type GetQuestionsResponse = Question[];
export type GetQuestionsError = { error: string };

export async function GET(req: NextApiRequest) {
  try {
    const questions: QuestionWithAnswer[] = await db.selectFrom('questions').selectAll().execute();
    return NextResponse.json<Question[]>(questions.map(({ correctOptionId, ...question }) => question));
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, statusText: 'Internal server error' });
  }
}
