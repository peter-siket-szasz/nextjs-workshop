import { Generated } from 'kysely';
import { GameTable } from './GameTable';
import { PlayerTable } from './PlayerTable';
import { QuestionTable } from './QuestionTable';

export interface Database {
  questions: QuestionTable;
  games: GameTable;
  players: PlayerTable;
  // Bridge tables
  gamePlayer: {
    gameId: number;
    playerId: number;
    score: Generated<number>;
  };
  gamePlayerQuestion: {
    gameId: number;
    playerId: number;
    questionId: number;
  };
}
