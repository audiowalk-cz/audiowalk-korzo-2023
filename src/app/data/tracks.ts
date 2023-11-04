import { TrackDefinition } from "../schema/track";

export enum TrackId {
  "spejbl-1" = "spejbl-1",
  "spejbl-2" = "spejbl-2",
  "spejbl-3" = "spejbl-3",
  "spejbl-4" = "spejbl-4",
  "havel" = "havel",
}

export const Tracks: { [key in TrackId]: TrackDefinition } = {
  "spejbl-1": {
    id: TrackId["spejbl-1"],
    title: "Spejbl 1",
    url: "assets/audio/spejbl-1.mp3",
    type: "audio",
    mimeType: "audio/mpeg",
  },
  "spejbl-2": {
    id: TrackId["spejbl-2"],
    title: "Spejbl 2",
    url: "assets/audio/spejbl-2.mp3",
    type: "audio",
    mimeType: "audio/mpeg",
  },
  "spejbl-3": {
    id: TrackId["spejbl-3"],
    title: "Spejbl 3",
    url: "assets/audio/spejbl-3.mp3",
    type: "audio",
    mimeType: "audio/mpeg",
  },
  "spejbl-4": {
    id: TrackId["spejbl-4"],
    title: "Spejbl 4",
    url: "assets/audio/spejbl-4.mp3",
    type: "audio",
    mimeType: "audio/mpeg",
  },
  havel: {
    id: TrackId["havel"],
    title: "Havel",
    url: "assets/video/havel.mp4",
    type: "video",
    mimeType: "video/mp4",
  },
};
