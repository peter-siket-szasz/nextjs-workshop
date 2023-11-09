import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = cookies();
  const playerId = cookieStore.get('playerId')?.value;

  const response = await fetch(`${process.env.BACKEND_BASE_URL}/game`, {
    headers: { 'Content-type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({ playerId: playerId }),
  });

  const bodyJson = await response.json();

  return Response.json({
    status: response.status,
    body: bodyJson,
  });
}
