import { db } from '@/lib/db';
import { ErrorResponse } from '@/types/ErrorResponse';
import { Game } from '@/types/Game';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const games = await db.selectFrom('games').selectAll().execute();
    return NextResponse.json<Game[]>(games);
  } catch (error) {
    console.error(error);
    return NextResponse.json<ErrorResponse>(
      { error: 'Internal server error' },
      { status: 500, statusText: 'Internal server error' },
    );
  }
}
