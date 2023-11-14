import useSWRMutation from "swr/mutation";

export function useAnswer() {

    async function fetcher(
        url: string,
        { arg }: { arg: { gameId: number; questionId: number; answer: number } }
      ) {
        return fetch(url, {
          method: 'POST',
          body: JSON.stringify(arg),
        }).then((res) => res.json());
      }
      
    return useSWRMutation(
        '/api/game/answer',
        fetcher
      );
}