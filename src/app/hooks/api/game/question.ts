import { Question } from '@/types/Question';
import useSWR from 'swr';

export function useQuestionId(questionId: string) {
  async function fetcher(url: string): Promise<Question> {
    return fetch(url)
      .then((res) => res.json())
      .then((json) => {
        if ('error' in json) throw new Error(json.error as string);
        return json;
      });
  }

  return useSWR(`/api/game/question/${questionId}`, fetcher);
}
