import { NextResponse } from 'next/server';
import { up, down, insertQuestions, insertPlayers } from '@/lib/db/seed';

export async function GET() {
  await down();
  console.log('------------');
  await up();
  console.log('------------');
  await insertQuestions();
  console.log('------------');
  await insertPlayers();
  return NextResponse.json({ result: 'OK' });
}
