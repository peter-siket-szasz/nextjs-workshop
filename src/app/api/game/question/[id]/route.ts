import { NextApiRequest } from 'next';

import { NextResponse } from 'next/server';
import { Question } from '@/types/Question';
import { ErrorResponse } from '@/types/ErrorResponse';

export async function GET(req: NextApiRequest, { params }: {params: {id: string}}) {
  const response = await fetch(`${process.env.BACKEND_BASE_URL}/question/${params.id}`);

  if (!response.ok) {
    const { error } = await response.json();
    return NextResponse.json<ErrorResponse>(
      { error },
      { status: response.status, statusText: 'Internal server error' }
    );
  }

  const question: Question = await response.json();
  return NextResponse.json<Question>(question);
}
