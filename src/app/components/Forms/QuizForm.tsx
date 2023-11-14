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

type Props = {
  gameId: string;
  questionId: string;
};

export function QuestionForm({ gameId, questionId }: Props) {
  const router = useRouter();

  const { data: dataQuestion } = useQuestionId(questionId);
  const { data: dataGameAnswer, trigger } = useAnswer();

  const [correctAnswerId, setCorrectAnswerId] = useState(null);
  const [nextQuestionId, setNextQuestionId] = useState(null);

  /* useEffect(() => {
    setCorrectAnswerId(dataGameAnswer.correctAnswerId);
    setNextQuestionId(dataGameAnswer.nextQuestionId);
  }, [dataGameAnswer]); */

  return (
    <>
      <Text as="i">Question No. {questionId}</Text>
      <FancyHeading text={dataQuestion?.question} fontSize="70px" />
      <Box margin="40px">
        <SimpleGrid spacing={20} columns={2} justifyContent="center">
          {mapQuestions(dataQuestion ?? []).map((option, idx) => {
            return (
              <QuizAnswerButton
                key={idx}
                text={option ?? ''}
                onClick={() =>
                  trigger({
                    gameId: Number(gameId),
                    questionId: Number(questionId),
                    answer: idx,
                  })
                }
                state={getStateOfOption(correctAnswerId, idx)}
              />
            );
          })}
        </SimpleGrid>
        <Box paddingTop="100px" display="flex" justifyContent="flex-end">
          <NextButton
            onClick={() =>
              router.push(`/game/${gameId}/question/${nextQuestionId}`)
            }
            isDisabled={!correctAnswerId}
          />
        </Box>
      </Box>
    </>
  );
}

function mapQuestions(data: Question) {
  return [data.option1, data.option2, data.option3, data.option4];
}

function getStateOfOption(
  correctAnswerId: number | null,
  optionId: number
): boolean | null {
  if (correctAnswerId) {
    return correctAnswerId == optionId ? true : false;
  } else {
    return null;
  }
}
