import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = cookies();
  const playerId = cookieStore.get('playerId')?.value;

  const response = await fetch(`${process.env.BACKEND_BASE_URL}/game`, {
    headers: { 'Content-type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({ player_id: playerId }),
  });

  const { gameId } = await response.json();

  return Response.json({
    status: 200,
    body: 'Game created with id: ' + gameId + ' for player id: ' + playerId,
  });
}
