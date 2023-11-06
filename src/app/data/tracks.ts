import { TrackDefinition } from "../schema/track";

export enum TrackId {
  "spejbl-1" = "spejbl-1",
  "spejbl-2" = "spejbl-2",
  "spejbl-3" = "spejbl-3",
  "spejbl-4" = "spejbl-4",
  "spejbl-5" = "spejbl-5",
  "spejbl-6" = "spejbl-6",
  "spejbl-7" = "spejbl-7",
  "havel" = "havel",
}

export const Tracks: { [key in TrackId]: { id: key } & TrackDefinition } = {
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
  "spejbl-5": {
    id: TrackId["spejbl-5"],
    title: "Spejbl 5",
    url: "assets/audio/spejbl-5.mp3",
    type: "audio",
    mimeType: "audio/mpeg",
  },
  "spejbl-6": {
    id: TrackId["spejbl-6"],
    title: "Spejbl 6",
    url: "assets/audio/spejbl-6.mp3",
    type: "audio",
    mimeType: "audio/mpeg",
  },
  "spejbl-7": {
    id: TrackId["spejbl-7"],
    title: "Spejbl 7",
    url: "assets/audio/spejbl-7.mp3",
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
