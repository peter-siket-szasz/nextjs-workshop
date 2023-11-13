import { NextApiRequest } from 'next';

import { NextResponse } from 'next/server';
import { Question } from '@/types/Question';
import { db } from '@/lib/db';

export async function GET(req: NextApiRequest, { params }: { params: { id: string } }) {
  try {
    const question: Question | undefined = await db
      .selectFrom('questions')
      .selectAll()
      .where('id', '=', parseInt(params.id))
      .executeTakeFirst();
    return question
      ? NextResponse.json<Question>(question)
      : NextResponse.json({ error: 'Question not found' }, { status: 404, statusText: 'Question not found' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, statusText: 'Internal server error' });
  }
}
