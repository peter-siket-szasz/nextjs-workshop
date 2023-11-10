import { NextApiRequest } from 'next';

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Question } from '@/types/Question';
import { GetQuestionsError } from '../../questions/route';

export async function GET(req: NextApiRequest, { params }: {params: {id: string}}) {
  try {
    const response = await fetch(`${process.env.BACKEND_BASE_URL}/question/${params.id}`);
    const question: Question = await response.json();
    return NextResponse.json(question);
  } catch (error) {
    console.error(error);
    return NextResponse.json<GetQuestionsError>(
      { error: 'Internal server error' },
      { status: 500, statusText: 'Internal server error' }
    );
  }
}


export async function DELETE(
  req: NextApiRequest,
  { params }: { params: { id: string } }
) {
  try {
    await db
      .deleteFrom('questions')
      .where('id', '=', parseInt(params.id))
      .executeTakeFirst();
    return NextResponse.json({ status: 'OK' });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, statusText: 'Internal server error' }
    );
  }
}
