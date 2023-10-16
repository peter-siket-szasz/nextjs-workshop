import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Amazing game incoming</h1>
      <Link
        href="/game/questions"
        className="inline-block px-6 py-3 mt-4 text-white bg-blue-500 hover:bg-blue-600 rounded shadow-md"
      >
        Go to Questions
      </Link>

      <Link
        href="/game/questionsServerComponent"
        className="inline-block px-6 py-3 mt-4 text-white bg-blue-500 hover:bg-blue-600 rounded shadow-md"
      >
        Go to Questions Server Component
      </Link>
    </main>
  );
}
