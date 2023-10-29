import { Track } from "./schema/track";

type TrackListItem = Omit<Track, "isDownloaded">;

export const TrackList: TrackListItem[] = [
  {
    id: "spejbl-1",
    url: "assets/audio/spejbl-1.mp3",
    title: "Spejbl 1",
    description: "První číst cesty, když se vracíme zpět do lesa.",
  },
  {
    id: "spejbl-2",
    url: "assets/audio/spejbl-1.mp3",
    title: "Spejbl 2",
    description: "První číst cesty, když se vracíme zpět do lesa.",
  },
  {
    id: "spejbl-3",
    url: "assets/audio/spejbl-1.mp3",
    title: "Spejbl 3",
    description: "První číst cesty, když se vracíme zpět do lesa.",
  },
  {
    id: "spejbl-4",
    url: "assets/audio/spejbl-1.mp3",
    title: "Spejbl 4",
    description: "První číst cesty, když se vracíme zpět do lesa.",
  },
];
