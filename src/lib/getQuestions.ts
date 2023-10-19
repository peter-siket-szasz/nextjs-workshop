import csv from "csv-parser";
import fs from "fs";

import { CsvQuestion, QuestionWithAnswer } from "@/types/Question";

export async function getQuestions(
  filePath: string
): Promise<QuestionWithAnswer[]> {
  return new Promise((resolve, reject) => {
    const questions: CsvQuestion[] = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => {
        questions.push(data);
      })
      .on("end", () => {
        resolve(
          questions.map((apiQuestion) => ({
            id: parseInt(apiQuestion.Question_id),
            question: apiQuestion.Question,
            option1: apiQuestion.Option_1,
            option2: apiQuestion.Option_2,
            option3: apiQuestion.Option_3,
            option4: apiQuestion.Option_4,
            answer: parseInt(apiQuestion.Correct_Option_Id),
          }))
        );
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}
