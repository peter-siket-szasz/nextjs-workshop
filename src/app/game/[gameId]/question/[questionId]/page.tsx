import PageContentWrapper from '@/app/components/PageContentWrapper';
import { QuestionForm } from '@/app/components/Forms/QuizForm';

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
