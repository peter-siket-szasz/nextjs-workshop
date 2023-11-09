import FancyHeading from '@/app/components/FancyHeading';
import PageContentWrapper from '@/app/components/PageContentWrapper';
import { QuestionForm } from '@/app/components/Forms/QuizForm';
import { db } from '@/lib/db';
import { Text } from '@chakra-ui/react';

export async function generateStaticParams() {
  const questions = await db.selectFrom('questions').selectAll().execute();
  const params = questions.map((question) => {
    return {
      questionId: question.id.toString(),
    };
  });
  return params;
}

export default async function Question({
  params,
}: {
  params: { gameId: string; questionId: string };
}) {
  const question = await db
    .selectFrom('questions')
    .selectAll()
    .where('id', '=', parseInt(params.questionId))
    .executeTakeFirst();

  return (
    <PageContentWrapper>
      <Text as="i">Question No. {params.questionId}</Text>
      <FancyHeading text={question?.question ?? ''} fontSize="70px" />
      <QuestionForm gameId={params.gameId} question={question} />
    </PageContentWrapper>
  );
}
