import { GameTable } from './GameTable';
import { PlayerTable } from './PlayerTable';
import { QuestionTable } from './QuestionTable';

export interface Database {
  questions: QuestionTable;
  games: GameTable;
  players: PlayerTable;
  // Bridge tables
  gamePlayerTable: {
    gameId: number;
    playerId: number;
    score: number;
  };
  gamePlayerQuestionTable: {
    gameId: number;
    playerId: number;
    questionId: number;
  };
}
