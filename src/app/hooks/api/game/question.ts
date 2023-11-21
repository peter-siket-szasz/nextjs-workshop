import { Question } from '@/types/Question';
import useSWR from 'swr';

export function useQuestionId(questionId: string) {
  async function fetcher(url: string): Promise<Question> {
    return fetch(url).then((res) => {
      const r = res.json();
      if ('error' in r) throw new Error(r.error as string);
      return r;
    });
  }

  return useSWR(`/api/game/question/${questionId}`, fetcher);
}
