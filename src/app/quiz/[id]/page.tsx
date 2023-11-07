import { db } from '@/lib/db';

export default async function Question({ params }: { params: { id: string } }) {
  const data = await db.selectFrom('questions').where('id', '=', parseInt(params.id)).execute();

  return (
    <>
      <div>Question {params.id}</div>
      <div>Question {data[0].toString()}</div>
    </>
  );
}
