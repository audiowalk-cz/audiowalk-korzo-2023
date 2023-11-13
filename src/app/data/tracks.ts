import { TrackDefinition } from "../schema/track";

export enum TrackId {
  "track-1" = "track-1",
  "track-2" = "track-2",
  "track-3" = "track-3",
  "track-4" = "track-4",
  "track-5" = "track-5",
  "track-6" = "track-6",
  "track-7" = "track-7",
  "havel" = "havel",
}

export const Tracks: { [key in TrackId]: { id: key } & TrackDefinition } = {
  "track-1": {
    id: TrackId["track-1"],
    title: "Track 1",
    url: "assets/audio/track-1.mp3",
    type: "audio",
    mimeType: "audio/mpeg",
  },
  "track-2": {
    id: TrackId["track-2"],
    title: "Track 2",
    url: "assets/audio/track-2.mp3",
    type: "audio",
    mimeType: "audio/mpeg",
  },
  "track-3": {
    id: TrackId["track-3"],
    title: "Track 3",
    url: "assets/audio/track-3.mp3",
    type: "audio",
    mimeType: "audio/mpeg",
  },
  "track-4": {
    id: TrackId["track-4"],
    title: "Track 4",
    url: "assets/audio/track-4.mp3",
    type: "audio",
    mimeType: "audio/mpeg",
  },
  "track-5": {
    id: TrackId["track-5"],
    title: "Track 5",
    url: "assets/audio/track-5.mp3",
    type: "audio",
    mimeType: "audio/mpeg",
  },
  "track-6": {
    id: TrackId["track-6"],
    title: "Track 6",
    url: "assets/audio/track-6.mp3",
    type: "audio",
    mimeType: "audio/mpeg",
  },
  "track-7": {
    id: TrackId["track-7"],
    title: "Track 7",
    url: "assets/audio/track-7.mp3",
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
