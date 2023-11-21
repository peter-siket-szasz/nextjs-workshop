import IndexButton from './IndexButton';

type Props = {
  label: string;
  isDisabled?: boolean;
};
export function NextButton({ label, isDisabled }: Props) {
  return <IndexButton width='100px' height='50px' label={label} isDisabled={isDisabled} />;
}
