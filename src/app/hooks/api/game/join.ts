import { JoinGameRequest, JoinGameResponse } from '@/app/api/game/join/route';
import useSWRMutation from 'swr/mutation';

export function useGameJoin() {
  async function fetcher(url: string, { arg }: { arg: JoinGameRequest }): Promise<JoinGameResponse> {
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

  return useSWRMutation('/api/game/join', fetcher);
}
