import { db } from '@/lib/db';

export default async function GameLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { gameId: string };
}) {
  try {
    await db.selectFrom('games').where('id', '=', parseInt(params.gameId)).executeTakeFirstOrThrow();
  } catch (error) {
    return <div>404 Game not found</div>;
  }
  return <>{children}</>;
}
