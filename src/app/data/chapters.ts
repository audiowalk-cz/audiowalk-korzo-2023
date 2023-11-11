import { Chapter } from "../schema/chapter";
import { TrackId } from "./tracks";

export const Chapters: Chapter[] = [
  {
    title: "Co se stalo?",
    directions: "Jděte po nábřeží, dále kolem divadla Na Zábradlí až před Divadelní fakultu AMU",
    durationMinutes: 14,
    description: "",
    pathIndex: 0,
    track: TrackId["spejbl-1"],
  },
  {
    title: "Střetnutí s letáky a prádlem",
    directions: "Vydejte se k&nbsp;mléčnému baru (dnešní pivnice U&nbsp;Kata) přes Mariánské náměstí, ulici dál za&nbsp;magistrátem.",
    durationMinutes: 3,
    description: "",
    pathIndex: 1,
    track: TrackId["spejbl-2"],
  },
  {
    title: "Ty jsi tam byl taky?",
    directions: "Jděte směrem k&nbsp;Národní třídě, těsně před ní zahněte do&nbsp;ulice Bartolomějská k&nbsp;Hlavnímu sídlu StB.",
    durationMinutes: 10,
    description: "",
    pathIndex: 2,
    track: TrackId["spejbl-3"],
  },
  {
    title: "Citlivé materiály",
    directions: "Pokračujte dál směrem k&nbsp;Vltavě, Až&nbsp;dojděte na&nbsp;křižovatku s&nbsp;divadelní ulicí dejte se doleva podchodem, pokračujte dále až za&nbsp;národní divadlo do&nbsp;ulice na&nbsp;struze k&nbsp;archivu StB (dnes Archiv bezpečnostních složek).",
    durationMinutes: 7,
    description: "",
    pathIndex: 3,
    track: TrackId["spejbl-4"],
  },
  {
    title: "Ve škole života není prázdnin",
    directions: "Vydejte se směrem k Národní třídě a pozorujte mapu. Budete procházet pasáží mezi domy s kavárnou ve vnitro bloku, nadruhé straně je tramvajová zastávka Lazarská. Od ní pokračujete k bráně před budovou Pedagogické fakulty Karlovy Univerzity. Kdyby byl náhodou průchod zavřený, tak blok domů obejděte a vraťte se na cestu na Lazarské",
    durationMinutes: 9,
    description: "",
    pathIndex: 4,
    track: TrackId["spejbl-5"],
  },
  {
    title: "Divadelní stávka",
    directions: "Pokračujte dál podle mapy, po průchodu pasáží dojděte před Činoherní Klub",
    durationMinutes: 12,
    description: "",
    pathIndex: 5,
    track: TrackId["spejbl-6"],
  },
  {
    title: "Co bude pak?",
    directions: "Jděte na Václavské náměstí a pokračujte směrem dolů až k tramvají a lavičkám s výhledem na balkón paláce Hvězda, sídla nakladatelství Melantrich (dnes je na domě nápis Marks & Spencer)",
    durationMinutes: 6,
    description: "",
    pathIndex: 6,
    track: TrackId["spejbl-7"],
  },
];
