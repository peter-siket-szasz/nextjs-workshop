import { Generated } from 'kysely';

export interface QuestionTable {
  id: Generated<number>;
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  answer: number;
}
