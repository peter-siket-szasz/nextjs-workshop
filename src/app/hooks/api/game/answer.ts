import { AnswerRequest, AnswerResponse } from '@/app/api/game/answer/route';
import useSWRMutation from 'swr/mutation';

export function useAnswer() {
  async function fetcher(url: string, { arg }: { arg: AnswerRequest }): Promise<AnswerResponse> {
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(arg),
    }).then((res) => {
      const r = res.json();
      if ('error' in r) throw new Error(r.error as string);
      return r;
    });
  }

  return useSWRMutation('/api/game/answer', fetcher);
}
