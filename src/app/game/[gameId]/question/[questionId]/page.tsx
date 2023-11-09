import Option from '@/app/components/Option';
import { db } from '@/lib/db';
import {
  Box,
  Card,
  CardHeader,
  Flex,
  Heading,
  SimpleGrid,
} from '@chakra-ui/react';

export async function generateStaticParams() {
  const questions = await db.selectFrom('questions').selectAll().execute();
  const params = questions.map((question) => {
    return {
      questionId: question.id.toString(),
    };
  });
  return params;
}

export default async function Question({ params }: { params: { gameId: string, questionId: string } }) {
  console.log(params);
  const question = await db
    .selectFrom('questions')
    .selectAll()
    .where('id', '=', parseInt(params.questionId))
    .executeTakeFirst();
  console.log(question);

  return (
    <Box width="100%" p={8}>
      <Flex width="100%" justify="center" placeContent="center" mb={8}>
        <Card width="80">
          <CardHeader>
            <Heading size="xl" textAlign="center">
              {question?.question}
              {params.gameId}
            </Heading>
          </CardHeader>
        </Card>
      </Flex>
      <Box>
        <SimpleGrid spacing={10} columns={2} justifyContent="center">
          {[
            question?.option1,
            question?.option2,
            question?.option3,
            question?.option4,
          ].map((option, idx) => {
            return (
              <Option
                option={option}
                href={`/api/game/${params.questionId}/${idx + 1}`}
                key={option}
              />
            );
          })}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
