import PageContentWrapper from '@/app/components/PageContentWrapper';
import { QuestionForm } from '@/app/components/Forms/QuizForm';
import { db } from '@/lib/db';

export async function generateStaticParams() {
  const questions = await db.selectFrom('questions').selectAll().execute();
  const params = questions.map((question) => {
    return {
      questionId: question.id.toString(),
    };
  });
  return params;
}

type Props = {
  params: {
    gameId: string;
    questionId: string;
  };
};

export default async function QuestionPage({ params }: Props) {
  return (
    <PageContentWrapper>
      <QuestionForm gameId={params.gameId} questionId={params.questionId} />
    </PageContentWrapper>
  );
}
