'use client';

import useSWR from 'swr';
import {
  GetQuestionsError,
  GetQuestionsResponse,
} from '../../api/game/questions/route';
import { Table } from '@/components/Table';
import DeleteQuestionButton from '../components/DeleteQuestionButton';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const QuestionTable = () => {
  const { data, error } = useSWR<GetQuestionsResponse, GetQuestionsError>(
    '/api/game/questions',
    fetcher
  );

  if (error) {
    return <div>Error loading questions</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

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
        delete: <DeleteQuestionButton id={question.id.toString()} />,
      }))}
    />
  );
};
