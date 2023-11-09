import QuizOptionButton from '@/app/components/Buttons/QuizOptionButton';
import FancyHeading from '@/app/components/FancyHeading';
import PageContentWrapper from '@/app/components/PageContentWrapper';
import { db } from '@/lib/db';
import { Box, Text, SimpleGrid } from '@chakra-ui/react';

export async function generateStaticParams() {
  const questions = await db.selectFrom('questions').selectAll().execute();
  const params = questions.map((question) => {
    return {
      id: question.id.toString(),
    };
  });
  return params;
}

export default async function Question({ params }: { params: { id: string } }) {
  const question = await db
    .selectFrom('questions')
    .selectAll()
    .where('id', '=', parseInt(params.id))
    .executeTakeFirst();

  return (
    <PageContentWrapper>
      <Box>
        <Text as="i">Question No. {params.id}</Text>
      </Box>
      <Box width="100" mb={20}>
        <FancyHeading text={question?.question ?? ''} fontSize="70px" />
      </Box>
      <Box>
        <SimpleGrid spacing={20} columns={2} justifyContent="center">
          {[
            question?.option1,
            question?.option2,
            question?.option3,
            question?.option4,
          ].map((option, idx) => {
            return (
              <QuizOptionButton
                option={option}
                href={`/api/game/${params.id}/${idx + 1}`}
                key={option}
              />
            );
          })}
        </SimpleGrid>
      </Box>
    </PageContentWrapper>
  );
}
