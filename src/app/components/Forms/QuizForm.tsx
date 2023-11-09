'use client';

import { Box, SimpleGrid } from '@chakra-ui/react';
import { useState } from 'react';
import QuizOptionButton from '../Buttons/QuizOptionButton';
import { useRouter } from 'next/navigation';
import { NextButton } from '../Buttons/NextButton';

type Props = {
  gameId: string;
  question: any;
};

export function QuestionForm({ gameId, question }: Props) {
  const router = useRouter();
  const [correctAnswerID, setCorrectAnswerId] = useState(null);
  const [nextQuestionId, setNextQuestionId] = useState(null);

  async function sendAnswer(optionId: number) {
    try {
      await fetch('api/...', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          selectedAnswer: optionId,
          question: question.params.questionId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setCorrectAnswerId(data.correctAnswerId);
          setNextQuestionId(data.nextQuestionId);
        });
    } catch (error) {
      console.log(error);
    }
  }

  function getStateOfOption(optionId: number): boolean | null {
    if (correctAnswerID) {
      return correctAnswerID == optionId ? true : false;
    } else {
      return null;
    }
  }
  return (
    <Box margin="40px">
      <SimpleGrid spacing={20} columns={2} justifyContent="center">
        {[
          question?.option1,
          question?.option2,
          question?.option3,
          question?.option4,
        ].map((option, idx) => {
          return (
            <QuizOptionButton
              key={idx}
              text={option ?? ''}
              onClick={() => sendAnswer(idx)}
              state={getStateOfOption(idx)}
            />
          );
        })}
      </SimpleGrid>
      <Box paddingTop="100px" display="flex" justifyContent="flex-end">
        <NextButton
          onClick={() =>
            router.push(`/game/${gameId}/question/${nextQuestionId}`)
          }
          isDisabled={!correctAnswerID}
        />
      </Box>
    </Box>
  );
}
