import { Generated } from 'kysely';

export interface GameTable {
  id: Generated<number>;
  createdAt: Generated<Date>;
  createdBy: number;
}
