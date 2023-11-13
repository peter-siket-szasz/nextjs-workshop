import csv from 'csv-parser';
import fs from 'fs';

import { CsvQuestion, QuestionWithAnswer } from '@/types/Question';

export async function getQuestions(filePath: string): Promise<QuestionWithAnswer[]> {
  return new Promise((resolve, reject) => {
    const questions: CsvQuestion[] = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        questions.push(data);
      })
      .on('end', () => {
        resolve(
          questions.map((apiQuestion) => ({
            id: parseInt(apiQuestion.questionId),
            question: apiQuestion.question,
            option1: apiQuestion.option1,
            option2: apiQuestion.option2,
            option3: apiQuestion.option3,
            option4: apiQuestion.option4,
            correctOptionId: parseInt(apiQuestion.correctOptionId),
          })),
        );
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}
