'use client';

import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import QuizAnswerButton from '../Buttons/QuizAnswerButton';
import { NextButton } from '../Buttons/NextButton';
import FancyHeading from '../FancyHeading';
import { Question } from '@/types/Question';

type Props = {
  gameId: string;
  questionId: any;
};

export function QuestionForm({ gameId, questionId }: Props) {
  const router = useRouter();
  const [correctAnswerId, setCorrectAnswerId] = useState(null);
  const [nextQuestionId, setNextQuestionId] = useState(null);

  const { data: dataQuestion } = useSWR(`/api/game/question/${questionId}`);
  const { data: dataGameAnswer, trigger } = useSWRMutation(
    '/api/game/answer',
    sendAnswer
  );

  useEffect(() => {
    setCorrectAnswerId(dataGameAnswer.correctAnswerId);
    setNextQuestionId(dataGameAnswer.nextQuestionId);
  }, [dataGameAnswer]);

  return (
    <>
      <Text as="i">Question No. {questionId}</Text>
      <FancyHeading text={dataQuestion.question.question} fontSize="70px" />
      <Box margin="40px">
        <SimpleGrid spacing={20} columns={2} justifyContent="center">
          {mapQuestions(dataQuestion).map((option, idx) => {
            return (
              <QuizAnswerButton
                key={idx}
                text={option ?? ''}
                onClick={() =>
                  trigger({
                    gameId: gameId,
                    questionId: questionId,
                    optionId: idx,
                  }).then
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

async function sendAnswer(
  url: string,
  { arg }: { arg: { gameId: string; questionId: number; optionId: number } }
) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
  }).then((res) => res.json());
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
