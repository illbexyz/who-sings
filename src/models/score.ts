import { QUESTION_TIME_MS } from "../store/store";
import { sum } from "../utils/sum";
import { zip } from "../utils/zip";
import { Game, GameAnswer } from "./game";

export interface Score {
  username: string;
  points: number;
  timestamp: number;
}

export const RIGHT_ANSWER_SCORE = 1000;

function bonusPointsOfQuestion(answer: GameAnswer): number {
  return Math.round((QUESTION_TIME_MS - answer.elapsedMs) / 30);
}

export function rightAnswersOfGame(game: Game): number {
  return zip(game.config.questions, game.answers)
    .map(([question, answer]) =>
      question.track.artist.id === answer.artist?.id ? 1 : 0
    )
    .reduce(sum, 0);
}

export function bonusPointsOfGame(game: Game): number {
  return zip(game.config.questions, game.answers)
    .map(([question, answer]) =>
      question.track.artist.id === answer.artist?.id
        ? bonusPointsOfQuestion(answer)
        : 0
    )
    .reduce(sum, 0);
}

export function bestScoreOfUser(scores: Score[], user: string): number {
  return scores
    .filter((score) => score.username === user)
    .reduce((acc, curr) => Math.max(acc, curr.points), 0);
}

export function recentScores(scores: Score[], length: number): Score[] {
  return scores.reverse().slice(0, length);
}

export function bestScores(scores: Score[]): Score[] {
  return [...scores].sort((s1, s2) => s2.points - s1.points).slice(0, 10);
}
