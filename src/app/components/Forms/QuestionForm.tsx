'use client';

import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import QuizAnswerButton from '../Buttons/QuizAnswerButton';
import FancyHeading from '../FancyHeading';
import { Question } from '@/types/Question';
import { NextButton } from '../Buttons/NextButton';
import LoadingSpinner from '../LoadingSpinner';
import { AnswerRequest, AnswerResponse } from '@/app/api/game/answer/route';

type Props = {
  gameId: string;
  questionId: string;
};

export function QuestionForm({ gameId, questionId }: Props) {
  // Data fetching with `fetch` and `useEffect`
  // TODO: Implement data fetching. Example implementation together.
  // Take a look at what the Question type looks like.

  const [dataQuestion, setDataQuestion] = useState<Question | null>(null); // State to keep the Question
  const [isLoading, setIsLoading] = useState(true); // Loading state. Set this to false once data is loaded.
  useEffect(() => {
    fetch(`/api/game/question/${questionId}`).then((res) => {
      /* Insert data handling */
    });
  }, [questionId]);

  // TODO: Post request with answer. You can look at what AnswerResponse looks like.
  const [dataGameAnswer, setDataGameAnswer] = useState<AnswerResponse | null>(null);
  // What do you think AnswerRequest should contain? Take a look at what it looks like and compare.
  const postAnswer = (req: AnswerRequest) => {
    fetch('/api/game/answer', {
      method: 'POST',
      body: JSON.stringify({
        /* Insert request body */
        // Request body should contain an AnswerRequest
      }),
    }).then((res) => {
      /* Insert data handling */
      // Should be similar to above
    });
  };

  function getOptionState(answerId: number): boolean | undefined {
    if (dataGameAnswer?.correctAnswer) {
      if (dataGameAnswer?.correctAnswer == answerId) {
        return true;
      } else if (dataGameAnswer?.receivedAnswer == answerId) {
        return false;
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (dataQuestion) {
    {
      return (
        <>
          <Text as='i'>Question No. {questionId}</Text>
          <FancyHeading text={dataQuestion?.question} fontSize='70px' />
          <Box margin='40px'>
            <SimpleGrid spacing={{ base: 5, lg: 20 }} columns={{ base: 1, lg: 2 }} justifyContent='center'>
              {mapQuestions(dataQuestion).map((option, idx) => {
                const answerId = idx + 1;
                return (
                  <QuizAnswerButton
                    key={answerId}
                    text={option}
                    onClick={() =>
                      postAnswer({
                        gameId: Number(gameId),
                        questionId: Number(questionId),
                        answer: answerId,
                      })
                    }
                    state={getOptionState(answerId)}
                    isDisabled={!!dataGameAnswer?.receivedAnswer}
                  />
                );
              })}
            </SimpleGrid>
            <Box mt={5} display='flex' justifyContent='flex-end'>
              <NextButton
                href={
                  dataGameAnswer?.nextQuestion
                    ? `/game/${gameId}/question/${dataGameAnswer?.nextQuestion}`
                    : `/game/${gameId}/ranking`
                }
                isDisabled={!dataGameAnswer?.receivedAnswer}
                label={dataGameAnswer?.receivedAnswer && !dataGameAnswer?.nextQuestion ? 'Finish' : 'Next'}
              />
            </Box>
          </Box>
        </>
      );
    }
  }
}

function mapQuestions(data: Question) {
  return [data.option1, data.option2, data.option3, data.option4];
}
