import { Box } from '@chakra-ui/react';
import IndexButton from './IndexButton';

const CorrectAnswerStyling = {
  textColor: 'white',
  background: 'green',
};

const WrongAnswerStyling = {
  textColor: 'white',
  background: 'brand.coral.800',
};

interface Props {
  text: string;
  onClick: () => {};
  state: boolean | undefined;
}

export default function QuizAnswerButton({ text, onClick, state }: Props) {
  if (state) {
    // after selection give feedback to the user
    return (
      <Box>
        <IndexButton
          width='300px'
          height='100px'
          label={text}
          onClick={() => {}}
          textColor={state ? CorrectAnswerStyling.textColor : WrongAnswerStyling.textColor}
          background={state ? CorrectAnswerStyling.background : WrongAnswerStyling.background}
        ></IndexButton>
      </Box>
    );
  } else {
    // if no option has been selected yet
    return (
      <Box>
        <IndexButton width='300px' height='100px' label={text} onClick={onClick}></IndexButton>
      </Box>
    );
  }
}
