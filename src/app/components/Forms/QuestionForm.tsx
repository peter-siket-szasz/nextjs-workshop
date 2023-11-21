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
  // Data fetching with fetch
  // TODO: Refactor to make use of useSWR (why?)
  const [dataQuestion, setDataQuestion] = useState<Question | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch('').then((res) => {
      /* Insert data handling */
    });
  }, [questionId]);

  // TODO: Post request with answer
  const [dataGameAnswer, setDataGameAnswer] = useState<AnswerResponse | undefined>(undefined);
  const postAnswer = (req: AnswerRequest) => {
    fetch('', {
      method: 'POST',
      body: JSON.stringify({
        /* ... */
      }),
    }).then((res) => {
      /* Insert data handling */
    });
    return {};
  };

  const [selectedAnswerId, setselectedAnswerId] = useState<number | undefined>(undefined);
  const [correctAnswerId, setCorrectAnswerId] = useState<number | undefined>(undefined);
  const [nextQuestionId, setNextQuestionId] = useState<number | undefined>(undefined);

  useEffect(() => {
    // TODO: Set state based on response
  }, [dataGameAnswer]);

  function getOptionState(answerId: number): boolean | undefined {
    if (correctAnswerId) {
      if (correctAnswerId == answerId) {
        return true;
      } else if (selectedAnswerId == answerId) {
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

  // if (error) {
  //   return <Text>An error occured.</Text>;
  // }

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
                    isDisabled={!!selectedAnswerId}
                  />
                );
              })}
            </SimpleGrid>
            <Box mt={5} display='flex' justifyContent='flex-end'>
              <NextButton
                href={nextQuestionId ? `/game/${gameId}/question/${nextQuestionId}` : `/game/${gameId}/ranking`}
                isDisabled={!selectedAnswerId}
                label={selectedAnswerId && !nextQuestionId ? 'Finish' : 'Next'}
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
