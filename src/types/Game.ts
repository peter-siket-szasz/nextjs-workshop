import { Player } from './Player';

export interface Game {
  id: number;
  createdAt: Date;
  createdBy: string;
  players?: (Player & { score: number })[];
}
