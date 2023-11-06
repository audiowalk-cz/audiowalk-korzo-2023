import { Chapter } from "../schema/chapter";
import { TrackId } from "./tracks";

export const Chapters: Chapter[] = [
  {
    directions: "Jděte Divadelní ulicí ke Karlovu mostu a poté zahněte doprava do divadla Disk",
    durationMinutes: 7,
    title: "David byl včera na demonstraci",
    description:
      "Na demonstraci potkal kamaráda a šli spolu na pivo. Davidovi se to moc nelíbilo, ale nechtěl kamaráda urazit. Když se vrátil domů, řekl manželce, že byl v divadle.",
    pathIndex: 0,
    track: TrackId["spejbl-1"],
  },
  {
    directions: "Pokračujte přes Mariánské náměstí za magistrát k pivnici U Kata",
    durationMinutes: 3,
    title: "Tajná schůze v pivnici U Kata",
    description:
      "David se sešel s kamarádem v pivnici U Kata. Kamarád mu řekl, že byl na demonstraci a že to bylo super. Davidovi se to moc nelíbilo, ale nechtěl kamaráda urazit. Když se vrátil domů, řekl manželce, že byl v divadle.",
    pathIndex: 1,
    track: TrackId["spejbl-2"],
  },
  {
    directions: "Jděte směrem na Národní třídu, těsně před ní zahněte do ulice Bartolomějská",
    durationMinutes: 9,
    title: "Výslech v Bartolomějské",
    description:
      "Výslech v Bartolomějské byl velmi nepříjemný. Davidovi tam rozbili nos a vyhrožovali mu, že ho zavřou.",
    pathIndex: 2,
    track: TrackId["spejbl-3"],
  },
  {
    directions: "Jděte směrem k Vltavě, přes piazettu Národního divadla do ulice Na Struze.",
    durationMinutes: 6,
    title: "Setkání s StB",
    description: "Setkání s StB bylo ...",
    pathIndex: 3,
    track: TrackId["spejbl-4"],
  },
  {
    directions: "Jděte směrem k Vltavě, přes piazettu Národního divadla do ulice Na Struze.",
    durationMinutes: 6,
    title: "Setkání s StB",
    description: "Setkání s StB bylo ...",
    pathIndex: 4,
    track: TrackId["spejbl-5"],
  },
  {
    directions: "Jděte směrem k Vltavě, přes piazettu Národního divadla do ulice Na Struze.",
    durationMinutes: 2,
    title: "Setkání s StB",
    description: "Setkání s StB bylo ...",
    pathIndex: 5,
    track: TrackId["spejbl-6"],
  },
  {
    directions: "Jděte směrem k Vltavě, přes piazettu Národního divadla do ulice Na Struze.",
    durationMinutes: 4,
    title: "Setkání s StB",
    description: "Setkání s StB bylo ...",
    pathIndex: 6,
    track: TrackId["spejbl-7"],
  },
];
