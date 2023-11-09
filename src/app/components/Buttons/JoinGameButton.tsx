import IndexButton from './IndexButton';

type Props = {
  label: string;
};

export default function JoinGameButton({ label }: Props) {
  return (
    <IndexButton width="100px" height="50px" label="Join Quiz" type="submit" />
  );
}
