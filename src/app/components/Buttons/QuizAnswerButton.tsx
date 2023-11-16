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
  state: boolean | undefined;
  isDisabled: boolean;
}

export default function QuizAnswerButton({ text, state, isDisabled }: Props) {
  // after selection give feedback to the user
  return state === undefined ? (
    <IndexButton width='300px' height='100px' label={text} isDisabled={isDisabled} type='submit'></IndexButton>
  ) : (
    <IndexButton
      width='300px'
      height='100px'
      label={text}
      textColor={state ? CorrectAnswerStyling.textColor : WrongAnswerStyling.textColor}
      background={state ? CorrectAnswerStyling.background : WrongAnswerStyling.background}
      isDisabled={true}
    ></IndexButton>
  );
}
