import { Generated } from 'kysely';

export interface PlayerTable {
  id: Generated<number>;
  token: string;
  name: string;
}
