import { RankingEntry } from '@/app/api/game/ranking/[gameId]/route';
import useSWR from 'swr';

export function useRanking(gameId: string) {
  async function fetcher(url: string): Promise<RankingEntry[]> {
    return fetch(url)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if ('error' in json) throw new Error(json.error as string);
        return json;
      });
  }

  return useSWR(`/api/game/ranking/${gameId}`, fetcher);
}
