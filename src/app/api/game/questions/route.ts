import { NextApiRequest } from 'next';

import { Question } from '@/types/Question';
import { NextResponse } from 'next/server';

export type GetQuestionsResponse = Question[];
export type GetQuestionsError = { error: string };

export async function GET(req: NextApiRequest) {
  try {
    const response = await fetch(`${process.env.BACKEND_BASE_URL}/questions`);
    const questions: Question[] = await response.json();
    return NextResponse.json<Question[]>(questions);
  } catch (error) {
    console.error(error);
    return NextResponse.json<GetQuestionsError>(
      { error: 'Internal server error' },
      { status: 500, statusText: 'Internal server error' }
    );
  }
}
