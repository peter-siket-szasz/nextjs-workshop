import { redirect } from 'next/navigation';

export async function GET({ids}: {ids: string[]}) {
  console.log(ids)
  const [question, answer] = ids;
  return redirect(`/question/${question+1}`);
}