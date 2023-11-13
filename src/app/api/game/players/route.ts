import { db } from '@/lib/db';
import { ErrorResponse } from '@/types/ErrorResponse';
import { Player } from '@/types/Player';
import { NextRequest, NextResponse } from 'next/server';

interface CreatePlayerRequest {
  name: string;
  token: string;
}

export async function GET() {
  try {
    const players = await db.selectFrom('players').selectAll().execute();
    return NextResponse.json<Player[]>(players);
  } catch (error) {
    console.error(error);
    return NextResponse.json<ErrorResponse>(
      { error: 'Internal server error' },
      { status: 500, statusText: 'Internal server error' },
    );
  }
}

export async function PUT(request: NextRequest) {
  let { name, token }: CreatePlayerRequest = await request.json();
  if (!name || !token) {
    return NextResponse.json<ErrorResponse>(
      { error: 'Invalid request body. Name and token are required.' },
      { status: 400, statusText: 'Bad request' },
    );
  }

  try {
    const res = await db.insertInto('players').values({ name, token }).returning('id').executeTakeFirst();
    return NextResponse.json<number | undefined>(res?.id);
  } catch (error) {
    console.error(error);
    return NextResponse.json<ErrorResponse>(
      { error: 'Internal server error' },
      { status: 500, statusText: 'Internal server error' },
    );
  }
}
