import useSWR from 'swr';

export function useQuestionId(questionId: string) {
  async function fetcher(url: string) {
    return fetch(url).then((res) => res.json());
  }

  return useSWR(`/api/game/question/${questionId}`, fetcher);
}
