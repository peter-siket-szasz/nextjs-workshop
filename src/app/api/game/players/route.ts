import { db } from '@/lib/db';
import { ErrorResponse } from '@/types/ErrorResponse';
import { Player } from '@/types/Player';
import { NextResponse } from 'next/server';

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
