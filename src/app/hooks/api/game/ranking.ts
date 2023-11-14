import useSWR from 'swr';

export function useRanking(gameId: string) {
  async function fetcher(url: string) {
    return fetch(url).then((res) => res.json());
  }

  return useSWR(`/api/game/ranking/${gameId}`, fetcher);
}
