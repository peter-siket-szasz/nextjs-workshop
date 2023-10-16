import { getQuestions } from "@/lib/getQuestions";

export const QuestionTable = async () => {
  const data = await getQuestions("./data/questions.csv");

  return (
    <table className="w-full bg-white border border-gray-300">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">Question ID</th>
          <th className="py-2 px-4 border-b">Question</th>
          <th className="py-2 px-4 border-b">Option 1</th>
          <th className="py-2 px-4 border-b">Option 2</th>
          <th className="py-2 px-4 border-b">Option 3</th>
          <th className="py-2 px-4 border-b">Option 4</th>
        </tr>
      </thead>
      <tbody>
        {data.map((question) => (
          <tr key={question.id}>
            <td className="py-2 px-4 border-b">{question.id}</td>
            <td className="py-2 px-4 border-b">{question.option1}</td>
            <td className="py-2 px-4 border-b">{question.option2}</td>
            <td className="py-2 px-4 border-b">{question.option3}</td>
            <td className="py-2 px-4 border-b">{question.option4}</td>
            <td className="py-2 px-4 border-b">{question.question}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
