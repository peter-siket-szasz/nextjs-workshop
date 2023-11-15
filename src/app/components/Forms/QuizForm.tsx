'use client';

import { Box, LinkBox, LinkOverlay, SimpleGrid, Text } from '@chakra-ui/react';
import QuizAnswerButton from '../Buttons/QuizAnswerButton';
import { NextButton } from '../Buttons/NextButton';
import FancyHeading from '../FancyHeading';
import { Question } from '@/types/Question';
import { experimental_useFormState as useFormState } from 'react-dom';
import { AnswerResponse, answer } from '@/app/actions/answer';
import { ErrorResponse } from '@/types/ErrorResponse';

type Props = {
  gameId: string;
  questionId: string;
  question: Question;
};

export function QuestionForm({ gameId, questionId, question }: Props) {
  const [questionState, formAction] = useFormState(answer, undefined);

  function getOptionState(questionState: AnswerResponse | ErrorResponse | undefined, idx: number): boolean | undefined {
    // No answer or error
    if (!questionState || (questionState && 'error' in questionState)) {
      return undefined;
    }
    // Selected answer
    if (idx === questionState.receivedAnswer) {
      return idx === questionState.correctAnswer;
      // Not selected answer, return correct as true
    } else {
      return idx === questionState.correctAnswer ? true : undefined;
    }
  }

  return (
    <>
      <Text as='i'>Question No. {questionId}</Text>
      <FancyHeading text={question?.question} fontSize='70px' />
      <Box margin='40px'>
        {questionState && 'error' in questionState && (
          <Box textAlign='center' color='red' fontSize='xl'>
            {questionState.error}
          </Box>
        )}
        <SimpleGrid spacing={20} columns={2} justifyContent='center'>
          {questionToOptions(question).map((option, idx) => {
            return (
              <form key={idx} action={formAction}>
                <input type='hidden' name='gameId' value={gameId} />
                <input type='hidden' name='questionId' value={questionId} />
                <input type='hidden' name='answer' value={idx + 1} />
                <QuizAnswerButton
                  text={option ?? ''}
                  state={getOptionState(questionState, idx + 1)}
                  isDisabled={!!questionState}
                />
              </form>
            );
          })}
        </SimpleGrid>
        <LinkBox paddingTop='100px' display='flex' justifyContent='flex-end'>
          {questionState ? (
            <LinkOverlay
              href={
                'nextQuestion' in questionState
                  ? `/game/${gameId}/question/${questionState.nextQuestion}`
                  : `/game/${gameId}/ranking`
              }
            >
              <NextButton label={'nextQuestion' in questionState ? 'Next' : 'Finish'} />
            </LinkOverlay>
          ) : (
            <NextButton label={'Next'} isDisabled={true} />
          )}
        </LinkBox>
      </Box>
    </>
  );
}

function questionToOptions(question: Question) {
  return [question.option1, question.option2, question.option3, question.option4];
}
