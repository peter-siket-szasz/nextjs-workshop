'use client';

import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import QuizAnswerButton from '../Buttons/QuizAnswerButton';
import FancyHeading from '../FancyHeading';
import { Question } from '@/types/Question';
import { useQuestionId } from '../../hooks/api/game/question';
import { useAnswer } from '@/app/hooks/api/game/answer';
import LoadingSpinner from '../LoadingSpinner';
import { NextButton } from '../Buttons/NextButton';

type Props = {
  gameId: string;
  questionId: string;
};

export function QuestionForm({ gameId, questionId }: Props) {
  const router = useRouter();

  const { data: dataQuestion, isLoading, error } = useQuestionId(questionId);
  const { data: dataGameAnswer, trigger } = useAnswer();

  const [selectedAnswerId, setselectedAnswerId] = useState<number | undefined>(undefined);
  const [correctAnswerId, setCorrectAnswerId] = useState<number | undefined>(undefined);
  const [nextQuestionId, setNextQuestionId] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (dataGameAnswer) {
      setselectedAnswerId(dataGameAnswer.receivedAnswer);
      setCorrectAnswerId(dataGameAnswer.correctAnswer);
      setNextQuestionId(dataGameAnswer.nextQuestion);
    }
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

  if (error) {
    return <Text>An error occured.</Text>;
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
