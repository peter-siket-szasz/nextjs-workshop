import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = cookies();
  const playerId = cookieStore.get('playerId')?.value;

  const response = await fetch(`${process.env.BACKEND_BASE_URL}/game/new`, {
    headers: { 'Content-type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({ playerId }),
  });

  const bodyJson = await response.json();

  return Response.json({
    status: response.status,
    body: bodyJson,
  });
}
