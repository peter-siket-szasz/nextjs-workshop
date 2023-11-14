export default function Game({ params }: { params: { gameId: string } }) {
  return <div className="text-3xl text-black p-8">Game ID: {params.gameId}</div>;
}
