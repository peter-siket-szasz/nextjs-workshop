import { NextApiRequest } from 'next';

import { NextResponse } from 'next/server';
import { Question } from '@/types/Question';
import { GetQuestionsError } from '../../questions/route';

export async function GET(req: NextApiRequest, { params }: {params: {id: string}}) {
  try {
    const response = await fetch(`${process.env.BACKEND_BASE_URL}/question/${params.id}`);
    const question: Question = await response.json();
    return NextResponse.json<Question>(question);
  } catch (error) {
    console.error(error);
    return NextResponse.json<GetQuestionsError>(
      { error: 'Internal server error' },
      { status: 500, statusText: 'Internal server error' }
    );
  }
}
