import { db } from '@/lib/db';
import assert from 'assert';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

async function selectRandomQuestion() {
  // Get all questions from db
  const questions = await db.selectFrom('questions').selectAll().execute();
  // Select a random id for the next question
  const randomIndex = Math.floor(Math.random() * questions.length);
  const randomQuestionId = questions.map((q) => q.id)[randomIndex];
  return randomQuestionId;
}

export async function GET(request: NextRequest, {params}: {params:{question: string, answer: string}}) {
  const {question, answer} = params;
  try {
    assert(parseInt(question));
    assert(parseInt(answer));
  } catch (e) {
    return Response.json({ status: 400, body: 'Question and answer must be integers' });
  }

  const nextQuestion = await selectRandomQuestion();

  return redirect(`/quiz/${nextQuestion}`);
}
