export interface CsvQuestion {
  questionId: string;
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correctOptionId: string;
}

export interface Question {
  id: number;
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
}

export interface QuestionWithAnswer extends Question {
  correctOptionId: number;
}
