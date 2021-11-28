import { GameConfig } from "../src/models/game";

export interface MusixmatchResponse<T> {
  message: {
    header: {
      status_code: 200 | 400 | 401 | 402 | 403 | 404 | 405 | 500 | 503;
      execute_time: number;
    };
    body: T;
  };
}

export const baseUrl = "https://api.musixmatch.com/ws/1.1";

export function getBody<T>(musixmatchResponse: MusixmatchResponse<T>): T {
  return musixmatchResponse.message.body;
}

export const MUSIXMATCH_API_KEY = process.env.MUSIXMATCH_API_KEY;

// From: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export function shuffle<T>(array: T[]): T[] {
  const copy = [...array];
  let randomIndex: number;
  let currentIndex = copy.length;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [copy[currentIndex], copy[randomIndex]] = [
      copy[randomIndex],
      copy[currentIndex],
    ];
  }

  return copy;
}

export function randomIntTo(max: number): number {
  return Math.floor(Math.random() * max);
}

export function mockGame(): GameConfig {
  const choices = [
    { id: 0, name: "Maneskin" },
    { id: 1, name: "Linkin Park" },
    { id: 2, name: "Avenged Sevenfold" },
    { id: 3, name: "Caparezza" },
  ];
  return {
    questions: [
      {
        track: {
          id: 0,
          title: "Mammamia",
          artist: choices[0],
          lyrics:
            "They treat me like if I did something criminal\nAll eyes on me, I feel like I'm a superstar",
        },
        choices,
      },
      {
        track: {
          id: 1,
          title: "In The End",
          artist: choices[1],
          lyrics: "I tried so hard\nAnd got so far",
        },
        choices,
      },
      {
        track: {
          id: 2,
          title: "Nightmare",
          artist: choices[2],
          lyrics:
            "You should have known the price of evil\nAnd it hurts to know that you belong here, yeah",
        },
        choices,
      },
      {
        track: {
          id: 3,
          title: "El Sendero",
          artist: choices[3],
          lyrics:
            "Vado incontro alla mia libertà\nGià da come marcio sembra Selma",
        },
        choices,
      },
    ],
  };
}
