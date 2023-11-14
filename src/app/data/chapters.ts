import { Chapter } from "../schema/chapter";
import { TrackId } from "./tracks";

export const Chapters: Chapter[] = [
  {
    title: "Co se stalo?",
    directions: "Jděte Divadelní ulicí, kolem divadla Na&nbsp;Zábradlí a Královskou cestou až před Divadelní fakultu AMU.",
    durationMinutes: 14,
    description: "",
    pathIndex: 0,
    track: TrackId["track-1"],
  },
  {
    title: "Střetnutí s&nbsp;letáky a&nbsp;prádlem",
    directions: "Vydejte se k&nbsp;mléčnému baru (dnes pivnice U&nbsp;Kata) přes Mariánské náměstí, za&nbsp;magistrát HMP.",
    durationMinutes: 3,
    description: "",
    pathIndex: 1,
    track: TrackId["track-2"],
  },
  {
    title: "Ty jsi tam b<span class='text-danger'>i</span>l taky?",
    directions: "Jděte směrem k&nbsp;Národní třídě, zahněte do Bartolomějské k&nbsp;Hlavnímu sídlu StB (kachličkovaný dům s&nbsp;pověstným sklepením).",
    durationMinutes: 10,
    description: "",
    pathIndex: 2,
    track: TrackId["track-3"],
  },
  {
    title: "Citlivé materiály",
    directions: "Pokračujte Bartolomějskou k&nbsp;Vltavě, poté doleva v Divadelní ulicí podchodem až do&nbsp;ulice Na&nbsp;Struze k&nbsp;archivu StB (dnes Archiv bezp. složek).",
    durationMinutes: 7,
    description: "",
    pathIndex: 3,
    track: TrackId["track-4"],
  },
  {
    title: "Ve škole života není prázdnin",
    directions: "Vydejte se směrem ke stanici Národní třída.<br>Pokud bude otevřený, využijte průchod na&nbsp;zastávku Lazarská až k&nbsp;pedagogické fakultě UK.",
    durationMinutes: 9,
    description: "",
    pathIndex: 4,
    track: TrackId["track-5"],
  },
  {
    title: "Divadelní stávka",
    directions: "Pokračujte Vodičkovou, doprava do ulice V&nbsp;Jámě a pak Štěpánskou pasáží přejděte před Činoherní Klub",
    durationMinutes: 12,
    description: "",
    pathIndex: 5,
    track: TrackId["track-6"],
  },
  {
    title: "Co bude pak?",
    directions: "Jděte na Václavské náměstí dolu k&nbsp;tramvajím před balkon paláce Hvězda (dříve Melantrich, dnes M&amp;S)",
    durationMinutes: 6,
    description: "",
    pathIndex: 6,
    track: TrackId["track-7"],
  },
];
