import { db } from '@/lib/db';
import { ErrorResponse } from '@/types/ErrorResponse';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

interface CreateRequest {
  token?: string;
}

export async function POST(request: NextRequest) {
  let { token }: CreateRequest = await request.json();

  const cookieStore = cookies();
  token ||= cookieStore.get('playerId')?.value;

  if (!token) {
    return NextResponse.json<ErrorResponse>(
      { error: 'No player cookie found' },
      { status: 400, statusText: 'Bad request' },
    );
  }

  try {
    const response = await db
      .insertInto('games')
      .values({ createdBy: token })
      .returning(['id', 'createdAt', 'createdBy'])
      .executeTakeFirst();
    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json<ErrorResponse>(
      { error: 'Internal server error' },
      { status: 500, statusText: 'Internal server error' },
    );
  }
}
