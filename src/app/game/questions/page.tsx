import { QuestionTable } from "./QuestionTable";
import GamePageHeader from "@/app/components/GamePageHeader";

const QuestionsPage = () => {
  return (
    <>
      <GamePageHeader isRoot={false} />
      <main className="flex h-min-auto flex-col items-center justify-between p-24">
        <QuestionTable />
      </main>
    </>
  );
};

export default QuestionsPage;
