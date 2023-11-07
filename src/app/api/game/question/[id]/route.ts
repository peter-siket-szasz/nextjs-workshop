import { NextApiRequest } from 'next';

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

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
