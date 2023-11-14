import { db } from '@/lib/db';
import { sql } from 'kysely';
import { getQuestions } from '../getQuestions';

export async function down() {
  await db.schema.dropTable('player_game_question').ifExists().execute();
  console.log('Dropped "player_game_question" table');
  await db.schema.dropTable('player_game').ifExists().execute();
  console.log('Dropped "player_game" table');
  await db.schema.dropTable('questions').ifExists().execute();
  console.log('Dropped "questions" table');
  await db.schema.dropTable('players').ifExists().execute();
  console.log('Dropped "players" table');
  await db.schema.dropTable('games').ifExists().execute();
  console.log('Dropped "games" table');
}

export async function up() {
  const createQuestionTable = await db.schema
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

  const createGameTable = await db.schema
    .createTable('games')
    .ifNotExists()
    .addColumn('id', 'serial', (cb) => cb.primaryKey())
    .addColumn('createdAt', 'date', (cb) => cb.notNull().defaultTo(sql`now()`))
    .addColumn('createdBy', 'integer') //, (cb) => cb.references('players.id').notNull())
    .execute();

  console.log('Created "game" table');

  const createPlayerTable = await db.schema
    .createTable('players')
    .ifNotExists()
    .addColumn('id', 'serial', (cb) => cb.primaryKey())
    .addColumn('token', 'varchar(255)', (cb) => cb.notNull().unique())
    .addColumn('name', 'varchar(255)')
    .execute();

  console.log('Created "player" table');

  const createGamePlayerTable = await db.schema
    .createTable('game_player')
    .ifNotExists()
    .addColumn('playerId', 'integer', (cb) => cb.references('players.id').notNull())
    .addColumn('gameId', 'integer', (cb) => cb.references('games.id').notNull())
    .addColumn('score', 'integer', (cb) => cb.defaultTo(0).notNull())
    .execute();

  console.log('Created "player_game" table');

  const createGamePlayerQuestionTable = await db.schema
    .createTable('game_player_question')
    .ifNotExists()
    .addColumn('playerId', 'integer', (cb) => cb.references('players.id').notNull())
    .addColumn('gameId', 'integer', (cb) => cb.references('games.id').notNull())
    .addColumn('questionId', 'integer', (cb) => cb.references('questions.id').notNull())
    .execute();

  console.log('Created "player_game_question" table');

  return {
    createQuestionTable,
    createGameTable,
    createPlayerTable,
    createGamePlayerTable,
    createGamePlayerQuestionTable,
  };
}

export async function insertQuestions() {
  const questions = await getQuestions('./data/questions.csv');

  const addQuestions = await db
    .insertInto('questions')
    .values(questions.map(({ id, ...questionWithoutId }) => questionWithoutId))
    .returning('id')
    .execute();
  console.log(`Seeded database with ${addQuestions.length} questions`);
}

export async function insertPlayers() {
  const player = {
    name: 'Peter',
    token: '642985',
  };

  const seededPlayer = await db
    .insertInto('players')
    .values(player)
    .returning(['id', 'token', 'name'])
    .executeTakeFirst();

  console.log(`Seeded database with player: ${JSON.stringify(seededPlayer)}`);
}
