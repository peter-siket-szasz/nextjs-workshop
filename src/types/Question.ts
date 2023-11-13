export interface CsvQuestion {
  questionId: string;
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correctOptionId: string;
}
export interface BaseQuestion {
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
}

export interface QuestionWithoutId extends BaseQuestion {
  correctOptionId: number;
}

export interface Question extends QuestionWithoutId {
  id: number;
}

export interface QuestionWithoutAnswer extends BaseQuestion {
  id: number;
}
