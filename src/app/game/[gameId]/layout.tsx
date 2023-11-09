import { redirect } from 'next/navigation';

export default async function GameLayout({ children, params }: {children: React.ReactNode, params: {gameId: string}}) {
  const response = await fetch(`${process.env.BACKEND_BASE_URL}/games`, { cache: 'no-store' });
  let ids: string[] = [];
  ({ ids }  = await response.json());
  console.log(ids);
  if (!ids.includes(params.gameId)) {
    return redirect('/404');
  }
  return (
    <>{ children }</>
  );
}
  