export default async function GameLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { gameId: string };
}) {
  const response = await fetch(`${process.env.BACKEND_BASE_URL}/games`, {
    cache: 'no-store',
  });
  let ids: string[] = [];
  //({ ids }  = await response.json());
  console.log(ids);
  return <>{children}</>;
}
