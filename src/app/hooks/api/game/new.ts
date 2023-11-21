import { CreateResponse } from '@/app/api/game/new/route';
import useSWRMutation from 'swr/mutation';

export function useNewGame() {
  async function fetcher(url: string): Promise<CreateResponse> {
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify({}),
    }).then((res) => {
      const r = res.json();
      if ('error' in r) throw new Error(r.error as string);
      return r;
    });
  }

  return useSWRMutation('/api/game/new', fetcher);
}
