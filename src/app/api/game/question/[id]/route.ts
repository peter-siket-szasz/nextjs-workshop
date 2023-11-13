import { NextApiRequest } from 'next';

import { NextResponse } from 'next/server';
import { Question, QuestionWithAnswer } from '@/types/Question';
import { db } from '@/lib/db';
import { ErrorResponse } from '@/types/ErrorResponse';

export async function GET(req: NextApiRequest, { params }: { params: { id: string } }) {
  try {
    const question: QuestionWithAnswer | undefined = await db
      .selectFrom('questions')
      .selectAll()
      .where('id', '=', parseInt(params.id))
      .executeTakeFirst();
    if (!question)
      return NextResponse.json<ErrorResponse>(
        { error: 'Question not found' },
        { status: 404, statusText: 'Question not found' },
      );

    const { correctOptionId, ...questionWithoutAnswer } = question;
    return NextResponse.json<Question>(questionWithoutAnswer);
  } catch (error) {
    console.error(error);
    return NextResponse.json<ErrorResponse>(
      { error: 'Internal server error' },
      { status: 500, statusText: 'Internal server error' },
    );
  }
}
