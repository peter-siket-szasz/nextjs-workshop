import Option from '@/app/components/Option';
import { db } from '@/lib/db';
import { Card, CardHeader, Heading, SimpleGrid } from '@chakra-ui/react';

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
  const question = await db.selectFrom('questions').selectAll().where('id', '=', parseInt(params.id)).executeTakeFirst();

  return (
    <div className='w-full p-8'>
      <div className='w-full flex justify-center place-content-center mb-8'>
        <Card className='w-80'>
          <CardHeader>
            <Heading size='xl' className='text-center'>{question?.question}</Heading>
          </CardHeader>
        </Card>
      </div>
      <div>
        <SimpleGrid spacing={10} columns={2}>
          {[question?.option1, question?.option2, question?.option3, question?.option4].map((option, idx) => {
            return (
              <Option option={option} href={`/api/game/answer/${params.id}/${idx + 1}`} key={option}/>
            );
          })}
        </SimpleGrid>
      </div>
    </div>
  );
}
