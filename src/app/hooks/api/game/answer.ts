import { AnswerRequest, AnswerResponse } from '@/app/api/game/answer/route';
import useSWRMutation from 'swr/mutation';

export function useAnswer() {
  async function fetcher(url: string, { arg }: { arg: AnswerRequest }): Promise<AnswerResponse> {
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(arg),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if ('error' in json) throw new Error(json.error as string);
        return json;
      });
  }

  return useSWRMutation('/api/game/answer', fetcher);
}
