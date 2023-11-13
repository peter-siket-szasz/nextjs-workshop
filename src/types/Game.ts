import { Player } from './Player';

export interface Game {
  id: number;
  createdAt: Date;
  players?: Player[];
}
