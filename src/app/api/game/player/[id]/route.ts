import { NextApiRequest } from 'next';

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { ErrorResponse } from '@/types/ErrorResponse';
import { Player } from '@/types/Player';

export async function GET(req: NextApiRequest, { params }: { params: { id: string } }) {
  try {
    const player: Player | undefined = await db
      .selectFrom('players')
      .selectAll()
      .where('id', '=', parseInt(params.id))
      .executeTakeFirst();
    if (!player)
      return NextResponse.json<ErrorResponse>(
        { error: 'Question not found' },
        { status: 404, statusText: 'Question not found' },
      );

    return NextResponse.json<Player>(player);
  } catch (error) {
    console.error(error);
    return NextResponse.json<ErrorResponse>(
      { error: 'Internal server error' },
      { status: 500, statusText: 'Internal server error' },
    );
  }
}
