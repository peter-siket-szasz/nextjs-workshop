import useSWRMutation from 'swr/mutation';

export function useGameJoin() {
  async function fetcher(url: string, { arg }: { arg: { gameId: number } }) {
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(arg),
    }).then((res) => res.json());
  }

  return useSWRMutation('/api/game/join', fetcher);
}
