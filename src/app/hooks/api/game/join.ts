import { JoinGameRequest, JoinGameResponse } from '@/app/api/game/join/route';
import useSWRMutation from 'swr/mutation';

export function useGameJoin() {
  async function fetcher(url: string, { arg }: { arg: JoinGameRequest }): Promise<JoinGameResponse> {
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(arg),
    }).then((res) => {
      const r = res.json();
      if ('error' in r) throw new Error(r.error as string);
      return r;
    });
  }

  return useSWRMutation('/api/game/join', fetcher);
}
