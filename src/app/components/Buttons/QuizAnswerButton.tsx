'use client';

import { Box } from '@chakra-ui/react';
import IndexButton from './IndexButton';

const CorrectAnswerStyling = {
  textColor: 'white',
  background: 'green',
};

const WrongAnswerStyling = {
  textColor: 'white',
  background: 'puprle',
};

export default function QuizAnswerButton({
  key,
  text,
  onClick,
  state,
}: {
  key: number;
  text: string;
  onClick: () => {};
  state: boolean | null;
}) {
  if (state == null) {
    // if no option has been selected yet
    return (
      <Box key={key}>
        <IndexButton
          width="300px"
          height="100px"
          label={text}
          onClick={onClick}
        ></IndexButton>
      </Box>
    );
  } else {
    // give feedback to the user
    return (
      <Box key={key}>
        <IndexButton
          width="300px"
          height="100px"
          label={text}
          onClick={() => {}}
          textColor={
            state
              ? CorrectAnswerStyling.textColor
              : WrongAnswerStyling.textColor
          }
          background={
            state
              ? CorrectAnswerStyling.background
              : WrongAnswerStyling.background
          }
        ></IndexButton>
      </Box>
    );
  }
}
