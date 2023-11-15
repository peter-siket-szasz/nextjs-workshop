import { Question, QuestionWithAnswer } from '@/types/Question';
import { db } from '@/lib/db';
import { Ranking } from '@/types/Ranking';

export async function getQuestion(id: number): Promise<Question | undefined> {
  try {
    const question: QuestionWithAnswer | undefined = await db
      .selectFrom('questions')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst();
    if (!question) return undefined;

    const { correctOptionId, ...questionWithoutAnswer } = question;
    return questionWithoutAnswer;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export async function getRanking(gameId: number): Promise<Ranking> {
  const players = await db
    .selectFrom('gamePlayer')
    .innerJoin('players', 'gamePlayer.playerId', 'players.id')
    .select(['players.id', 'players.name', 'players.token', 'gamePlayer.score'])
    .where('gameId', '=', gameId)
    .orderBy('score', 'desc')
    .execute();
  return players;
}
