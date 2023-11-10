import { NextApiRequest } from 'next';

import { Question } from '@/types/Question';
import { NextResponse } from 'next/server';

export type GetQuestionsResponse = Question[];
export type GetQuestionsError = { error: string };

export async function GET(req: NextApiRequest) {
  const response = await fetch(`${process.env.BACKEND_BASE_URL}/questions`);

  if (!response.ok) {
    const { error } = await response.json();
    return NextResponse.json<GetQuestionsError>(
      { error },
      { status: response.status, statusText: 'Internal server error' }
    );
  }

  const questions: Question[] = await response.json();
  return NextResponse.json<Question[]>(questions);
}
