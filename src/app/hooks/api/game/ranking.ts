import { RankingEntry } from '@/app/api/game/ranking/[gameId]/route';
import useSWR from 'swr';

export function useRanking(gameId: string) {
  async function fetcher(url: string): Promise<RankingEntry[]> {
    return fetch(url).then((res) => {
      const r = res.json();
      if ('error' in r) throw new Error(r.error as string);
      return r;
    });
  }

  return useSWR(`/api/game/ranking/${gameId}`, fetcher);
}
