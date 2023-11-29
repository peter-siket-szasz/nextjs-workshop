import { Question, QuestionWithAnswer } from '@/types/Question';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { ErrorResponse } from '@/types/ErrorResponse';

export async function GET(req: NextRequest) {
  try {
    const questions: QuestionWithAnswer[] = await db.selectFrom('questions').selectAll().execute();
    return NextResponse.json<Question[]>(questions.map(({ correctOptionId, ...question }) => question));
  } catch (error) {
    console.error(error);
    return NextResponse.json<ErrorResponse>(
      { error: 'Internal server error' },
      { status: 500, statusText: 'Internal server error' },
    );
  }
}
