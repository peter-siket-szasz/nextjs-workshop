"use client";

import useSWRMutation from "swr/mutation";

const deleteQuestion = (_url: string, { arg }: { arg: { id: string } }) =>
  fetch(`/api/game/question/${arg.id}`, {
    method: "DELETE",
  });

export default function DeleteQuestionButton(props: {
  id: string;
  reloadOnRefresh?: boolean;
}) {
  const { trigger, isMutating } = useSWRMutation(
    "/api/game/questions",
    deleteQuestion,
    {
      onSuccess: () => {
        if (props.reloadOnRefresh) {
          window.location.reload();
        }
      },
    }
  );

  return (
    <button
      onClick={() => trigger({ id: props.id })}
      disabled={isMutating}
      className="inline-block p-2 text-white bg-red-500 hover:bg-red-600 disabled:opacity-50 rounded shadow-md"
    >
      Delete
    </button>
  );
}
