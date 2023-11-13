import { db } from '@/lib/db';
import { ErrorResponse } from '@/types/ErrorResponse';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const response = await db
      .insertInto('games')
      .values({ createdBy: 123 })
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
