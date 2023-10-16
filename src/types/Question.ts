export interface ApiQuestion {
  Question_id: string;
  Question: string;
  Option_1: string;
  Option_2: string;
  Option_3: string;
  Option_4: string;
  Correct_Option_Id: string;
}

export interface Question {
  id: string;
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
}

export interface QuestionWithAnswer extends Question {
  answer: number;
}
