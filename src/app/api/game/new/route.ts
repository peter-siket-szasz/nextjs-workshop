import { ErrorResponse } from '@/types/ErrorResponse';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = cookies();
  const playerId = cookieStore.get('playerId')?.value;

  const response = await fetch(`${process.env.BACKEND_BASE_URL}/game/new`, {
    headers: { 'Content-type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({ playerId }),
  });

  if (!response.ok) {
    const { error } = await response.json();
    return NextResponse.json<ErrorResponse>(
      { error },
      { status: response.status, statusText: 'Internal server error' }
    );
  }

  const bodyJson = await response.json();

  return Response.json({
    status: response.status,
    body: bodyJson,
  });
}
