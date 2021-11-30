import { GameConfig } from "../models/game";

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
