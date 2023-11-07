import { db } from '@/lib/db';
import { getQuestions } from '../getQuestions';

export async function seed() {
  const createTable = await db.schema
    .createTable('questions')
    .ifNotExists()
    .addColumn('id', 'serial', (cb) => cb.primaryKey())
    .addColumn('question', 'varchar(255)', (cb) => cb.notNull())
    .addColumn('option1', 'varchar(255)')
    .addColumn('option2', 'varchar(255)')
    .addColumn('option3', 'varchar(255)')
    .addColumn('option4', 'varchar(255)')
    .addColumn('answer', 'integer')
    .execute();

  console.log('Created "questions" table');

  const questions = await getQuestions('./data/questions.csv');

  const addUsers = await db
    .insertInto('questions')
    .values(questions.map(({ id, ...questionWithoutId }) => questionWithoutId))
    .execute();
  console.log('Seeded database with questions');

  return {
    createTable,
    addUsers,
  };
}
