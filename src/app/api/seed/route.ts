import { NextResponse } from 'next/server';
import { up, down, insertQuestions } from '@/lib/db/seed';

export async function GET() {
  await down();
  console.log('------------');
  await up();
  console.log('------------');
  await insertQuestions();
  return NextResponse.json({ result: 'OK' });
}
