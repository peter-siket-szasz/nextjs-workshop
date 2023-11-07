import { Table } from '@/app/components/Table';
import { db } from '@/lib/db';
import DeleteQuestionButton from '../components/DeleteQuestionButton';

export const QuestionTable = async () => {
  // const data = await getQuestions("./data/questions.csv");
  const data = await db.selectFrom('questions').selectAll().execute();

  return (
    <Table
      columns={[
        { key: 'id', label: 'ID' },
        { key: 'question', label: 'Question' },
        { key: 'option1', label: 'Option 1' },
        { key: 'option2', label: 'Option 2' },
        { key: 'option3', label: 'Option 3' },
        { key: 'option4', label: 'Option 4' },
        { key: 'delete', label: 'Delete' },
      ]}
      rows={data.map((question) => ({
        ...question,
        delete: (
          <DeleteQuestionButton id={question.id.toString()} reloadOnRefresh />
        ),
      }))}
    />
  );
};
