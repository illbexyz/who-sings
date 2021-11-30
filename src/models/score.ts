import { QUESTION_TIME_MS } from "../store/store";
import { zip } from "../utils/zip";
import { Game } from "./game";

export interface Score {
  username: string;
  points: number;
}

export function scoreOfGame(game: Game): number {
  const singleScores = zip(game.config.questions, game.answers).map(
    ([question, answer]) =>
      question.track.artist.id === answer.artist?.id
        ? QUESTION_TIME_MS - answer.elapsedMs
        : 0
  );

  return singleScores.reduce((accScore, currScore) => accScore + currScore, 0);
}
