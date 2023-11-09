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

export async function GET(
  request: NextRequest,
  { params }: { params: { gameId: string, questionId: string; answer: string } }
) {
  const { gameId, questionId, answer } = params;
  try {
    assert(parseInt(gameId));
    assert(parseInt(questionId));
    assert(parseInt(answer));
  } catch (e) {
    return Response.json({
      status: 400,
      body: 'Question, answer and game must be integers',
    });
  }

  const nextQuestion = await selectRandomQuestion();
  const res = await fetch(`${process.env.BACKEND_BASE_URL}/answer/`, {
    headers: { 'Content-type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({ question_id: questionId, selected_option_id: answer }),
  });
  console.log(await res.json());

  return redirect(`/game/${gameId}/question/${nextQuestion}`);
}
