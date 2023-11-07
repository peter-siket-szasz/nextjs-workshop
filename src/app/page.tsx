import GamePageHeader from './components/GamePageHeader';

export default function Home() {
  return (
    <>
      <GamePageHeader isRoot={true} />
      <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
    </>
  );
}
