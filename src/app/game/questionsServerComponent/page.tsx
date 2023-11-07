import Link from 'next/link';
import { QuestionTable } from './QuestionTable';

const QuestionsPage = () => {
  return (
    <div>
      <Link
        href="/"
        className="inline-block px-6 py-3 mt-4 text-white bg-blue-500 hover:bg-blue-600 rounded shadow-md"
      >
        Go to Home
      </Link>
      <h1>Questions</h1>
      <div className="flex justify-center">
        <QuestionTable />
      </div>
    </div>
  );
};

export default QuestionsPage;
