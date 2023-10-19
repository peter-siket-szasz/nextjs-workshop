import { ReactNode } from "react";
import GoHomeButton from "./GoHomeButton";
import Header from "./Header";
import ButtonLink from "./ButtonLink";

export default function GamePageHeader(props: { isRoot: boolean }) {
  return (
    <Header
      actionsLeft={!props.isRoot && <GoHomeButton />}
      title="Amazing game incoming"
      actionsRight={
        props.isRoot && (
          <ButtonLink href="/game/questions">Admin Questions</ButtonLink>
        )
      }
    />
  );
}
