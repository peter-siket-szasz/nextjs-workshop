import { createKysely } from '@vercel/postgres-kysely';
import { Database } from './Database';
import { CamelCasePlugin } from 'kysely';

export const db = createKysely<Database>().withPlugin(new CamelCasePlugin());
export { sql } from 'kysely';
