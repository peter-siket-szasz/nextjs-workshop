import { CreateResponse } from '@/app/api/game/new/route';
import useSWRMutation from 'swr/mutation';

export function useNewGame() {
  async function fetcher(url: string): Promise<CreateResponse> {
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if ('error' in json) throw new Error(json.error as string);
        return json;
      });
  }

  return useSWRMutation('/api/game/new', fetcher);
}
