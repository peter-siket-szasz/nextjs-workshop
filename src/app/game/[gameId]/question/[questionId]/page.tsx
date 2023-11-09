import QuizOptionButton from '@/app/components/Buttons/QuizOptionButton';
import { db } from '@/lib/db';
import {
  Box,
  SimpleGrid,
  Text,
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
    <Box
      width="100%"
      height="90vh"
      padding="8"
      alignItems="center"
      justifyContent="center"
      display="flex"
      flexDirection="column"
    >
      <Box>
        <Text as="i">Question No. {params.questionId}</Text>
      </Box>
      <Box width="100" justifyContent="center" placeContent="center" mb={20}>
        <Text
          as="b"
          fontSize="70px"
          bgClip="text"
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          textAlign="center"
        >
          {question?.question}
        </Text>
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
