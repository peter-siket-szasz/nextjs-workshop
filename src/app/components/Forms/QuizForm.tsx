'use client';

import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import QuizAnswerButton from '../Buttons/QuizAnswerButton';
import { NextButton } from '../Buttons/NextButton';
import FancyHeading from '../FancyHeading';
import { Question } from '@/types/Question';
import { useQuestionId } from '../../hooks/api/game/question';
import { useAnswer } from '@/app/hooks/api/game/answer';
import LoadingSpinner from '../LoadingSpinner';

type Props = {
  gameId: string;
  questionId: string;
};

export function QuestionForm({ gameId, questionId }: Props) {
  const router = useRouter();

  const { data: dataQuestion, isLoading, error } = useQuestionId(questionId);
  const { data: dataGameAnswer, trigger } = useAnswer();

  const [selectedAnswerId, setselectedAnswerId] = useState(null);
  const [correctAnswerId, setCorrectAnswerId] = useState(null);
  const [nextQuestionId, setNextQuestionId] = useState(null);

  useEffect(() => {
    if (dataGameAnswer) {
      setselectedAnswerId(dataGameAnswer.receivedAnswer);
      setCorrectAnswerId(dataGameAnswer.correctAnswer);
      setNextQuestionId(dataGameAnswer.nextQuestion);
    }
  });

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

  if (error) {
    <Text>An error occured.</Text>;
  }

  if (dataQuestion) {
    {
      return (
        <>
          <Text as='i'>Question No. {questionId}</Text>
          <FancyHeading text={dataQuestion?.question} fontSize='70px' />
          <Box margin='40px'>
            <SimpleGrid spacing={20} columns={2} justifyContent='center'>
              {mapQuestions(dataQuestion ?? []).map((option, idx) => {
                const answerId = idx + 1;
                return (
                  <QuizAnswerButton
                    key={answerId}
                    text={option ?? ''}
                    onClick={() =>
                      trigger({
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
            <Box paddingTop='100px' display='flex' justifyContent='flex-end'>
              <NextButton
                label={selectedAnswerId && !nextQuestionId ? 'Finish' : 'Next'}
                onClick={() =>
                  nextQuestionId
                    ? router.push(`/game/${gameId}/question/${nextQuestionId}`)
                    : router.push(`/game/${gameId}/ranking`)
                }
                isDisabled={!selectedAnswerId}
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
