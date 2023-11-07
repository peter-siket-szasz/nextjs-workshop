import { NextApiRequest } from 'next';

import { Question } from '@/types/Question';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export type GetQuestionsResponse = Question[];
export type GetQuestionsError = { error: string };

export async function GET(req: NextApiRequest) {
  try {
    const questions = await db.selectFrom('questions').selectAll().execute();
    return NextResponse.json<GetQuestionsResponse>(
      questions.map(({ answer, ...question }) => question)
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json<GetQuestionsError>(
      { error: 'Internal server error' },
      { status: 500, statusText: 'Internal server error' }
    );
  }
}
