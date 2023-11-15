import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  //Get all entries from player_game_question
  const playerGameQuestion = await db.selectFrom('gamePlayer').selectAll().execute();
  return NextResponse.json(playerGameQuestion);
}
