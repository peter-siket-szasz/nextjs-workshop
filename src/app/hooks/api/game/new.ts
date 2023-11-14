import useSWRMutation from "swr/mutation";

export function useNewGame () {

    async function fetcher(url: string) {
        return fetch(url, {
          method: 'POST',
        }).then((res) => res.json());
    }
      
    return useSWRMutation(
        '/api/game/new',
        fetcher
      );
}