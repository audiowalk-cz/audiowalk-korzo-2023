import { Chapter } from "./schema/chapter";

export const Chapters: Chapter[] = [
  {
    directions: "Jděte Divadelní ulicí ke Karlovu mostu a poté zahněte doprava do divadla Disk",
    durationMinutes: 7,
    title: "David byl včera na demonstraci",
    description:
      "Na demonstraci potkal kamaráda a šli spolu na pivo. Davidovi se to moc nelíbilo, ale nechtěl kamaráda urazit. Když se vrátil domů, řekl manželce, že byl v divadle.",
    pathIndex: 0,
    track: {
      id: "spejbl-1",
      url: "assets/audio/spejbl-1.mp3",
      title: "Spejbl 1",
    },
  },
  {
    directions: "Pokračujte přes Mariánské náměstí za magistrát k pivnici U Kata",
    durationMinutes: 3,
    title: "Tajná schůze v pivnici U Kata",
    description:
      "David se sešel s kamarádem v pivnici U Kata. Kamarád mu řekl, že byl na demonstraci a že to bylo super. Davidovi se to moc nelíbilo, ale nechtěl kamaráda urazit. Když se vrátil domů, řekl manželce, že byl v divadle.",
    pathIndex: 1,
    track: {
      id: "spejbl-2",
      url: "assets/audio/spejbl-1.mp3",
      title: "Spejbl 2",
    },
  },
  {
    directions: "Jděte směrem na Národní třídu, těsně před ní zahněte do ulice Bartolomějská",
    durationMinutes: 9,
    title: "Výslech v Bartolomějské",
    description:
      "Výslech v Bartolomějské byl velmi nepříjemný. Davidovi tam rozbili nos a vyhrožovali mu, že ho zavřou.",
    pathIndex: 2,
    track: {
      id: "spejbl-3",
      url: "assets/audio/spejbl-1.mp3",
      title: "Spejbl 3",
    },
  },
  {
    directions: "Jděte směrem k Vltavě, přes piazettu Národního divadla do ulice Na Struze.",
    durationMinutes: 6,
    title: "Setkání s StB",
    description: "Setkání s StB bylo ...",
    pathIndex: 3,
    track: {
      id: "spejbl-4",
      url: "assets/audio/spejbl-1.mp3",
      title: "Spejbl 4",
    },
  },
];
