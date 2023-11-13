import { db } from '@/lib/db';
import { getQuestions } from '../getQuestions';

export async function seed() {
  const dropTable = await db.schema.dropTable('questions').ifExists().execute();

  console.log('Dropped "questions" table');

  const createTable = await db.schema
    .createTable('questions')
    .ifNotExists()
    .addColumn('id', 'serial', (cb) => cb.primaryKey())
    .addColumn('question', 'varchar(255)', (cb) => cb.notNull())
    .addColumn('option1', 'varchar(255)')
    .addColumn('option2', 'varchar(255)')
    .addColumn('option3', 'varchar(255)')
    .addColumn('option4', 'varchar(255)')
    .addColumn('correctOptionId', 'integer')
    .execute();

  console.log('Created "questions" table');

  const questions = await getQuestions('./data/questions.csv');

  const addQuestions = await db
    .insertInto('questions')
    .values(questions.map(({ id, ...questionWithoutId }) => questionWithoutId))
    .execute();
  console.log('Seeded database with questions');

  return {
    dropTable,
    createTable,
    addQuestions,
  };
}
