import { ReactNode } from 'react';

export default function Header(props: {
  actionsLeft?: ReactNode;
  title: ReactNode;
  actionsRight?: ReactNode;
}) {
  return (
    <header className="flex flex-row gap-4 justify-between items-center w-full shadow-md p-4">
      <div>{props.actionsLeft}</div>
      <h1 className="flex-grow text-center"> {props.title}</h1>
      <div>{props.actionsRight}</div>
    </header>
  );
}
