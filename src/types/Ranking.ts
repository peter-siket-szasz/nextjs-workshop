import { Player } from './Player';

export interface Ranking extends Array<Player & { score: number }> {}
