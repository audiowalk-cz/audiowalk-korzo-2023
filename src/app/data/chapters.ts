import { Chapter } from "../schema/chapter";
import { TrackId } from "./tracks";

export const Chapters: Chapter[] = [
  {
    title: "Co se stalo?",
    directions: "Jděte Divadelní ulicí, kolem divadla Na&nbsp;Zábradlí a Královskou cestou až před Divadelní&nbsp;fakultu&nbsp;AMU.",
    durationMinutes: 14,
    description: "",
    pathIndex: 0,
    track: TrackId["track-1"],
  },
  {
    title: "Střetnutí s&nbsp;letáky a&nbsp;prádlem",
    directions: "Vydejte se k restaraci U Vejvodů. Na křižovatce zahněte doprava do Husové, dále za kostelem doleva Zlatou ulicí a&nbsp;pak hned doprava.",
    durationMinutes: 3,
    description: "",
    pathIndex: 1,
    track: TrackId["track-2"],
  },
  {
    title: "Ty jsi tam b<span class='text-danger'>i</span>l taky?",
    directions: "Jděte do ulice Na Perštýně, zahněte do Bartolomějské k&nbsp;Hlavnímu sídlu StB (kachličkovaný dům s&nbsp;pověstným sklepením).",
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
    directions: "Pokračujte Vodičkovou, doprava do ulice V&nbsp;Jámě a pak Štěpánskou pasáží projděte před Činoherní klub",
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
