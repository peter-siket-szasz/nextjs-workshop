import { NextApiRequest, NextApiResponse } from "next";

import { getQuestions } from "@/lib/getQuestions";
import { Question } from "@/types/Question";
import { NextResponse } from "next/server";

export type GetQuestionsResponse = Question[];
export type GetQuestionsError = { error: string };

export async function GET(req: NextApiRequest) {
  try {
    const questions = await getQuestions("./data/questions.csv");
    return NextResponse.json<GetQuestionsResponse>(
      questions.map(({ answer, ...question }) => question)
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json<GetQuestionsError>(
      { error: "Internal server error" },
      { status: 500, statusText: "Internal server error" }
    );
  }
}
