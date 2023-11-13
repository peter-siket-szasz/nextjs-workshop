import { NextApiRequest } from 'next';

import { Question } from '@/types/Question';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export type GetQuestionsResponse = Question[];
export type GetQuestionsError = { error: string };

export async function GET(req: NextApiRequest) {
  try {
    const questions: Question[] = await db.selectFrom('questions').selectAll().execute();
    return NextResponse.json<Question[]>(questions);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, statusText: 'Internal server error' });
  }
}
