'use client';

import IndexButton from './IndexButton';

type Props = {
  onClick: () => {};
};

export default function CreateGameButton({ onClick }: Props) {
  return (
    <IndexButton
      width="100px"
      height="50px"
      label="New Quiz"
      onClick={onClick}
    />
  );
}
