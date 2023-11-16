import { QuestionForm } from '@/app/components/Forms/QuizForm';
import { db } from '@/lib/db';
import { QuestionWithAnswer } from '@/types/Question';

type Props = {
  params: {
    gameId: string;
    questionId: string;
  };
};

export default async function QuestionPage({ params }: Props) {
  const questionWithAnswer: QuestionWithAnswer | undefined = await db
    .selectFrom('questions')
    .selectAll()
    .where('id', '=', parseInt(params.questionId))
    .executeTakeFirst();
  if (!questionWithAnswer) {
    return <div>Question not found</div>;
  }
  const { correctOptionId, ...question } = questionWithAnswer;
  return <QuestionForm gameId={params.gameId} questionId={params.questionId} question={question} />;
}
