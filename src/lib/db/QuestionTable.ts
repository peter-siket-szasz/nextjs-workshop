import { QuestionWithoutId } from '@/types/Question';
import { Generated } from 'kysely';

export interface QuestionTable extends QuestionWithoutId {
  id: Generated<number>;
}
