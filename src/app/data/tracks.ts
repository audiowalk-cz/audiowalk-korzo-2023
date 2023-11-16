import { TrackDefinition } from "../schema/track";

export enum TrackId {
  "track-1" = "track-1",
  "track-2" = "track-2",
  "track-3" = "track-3",
  "track-4" = "track-4",
  "track-5" = "track-5",
  "track-6" = "track-6",
  "track-7" = "track-7",
  "vaclavak" = "vaclavak",
  "thanksTrack" = "thanksTrack",
}

export const Tracks: { [key in TrackId]: { id: key } & TrackDefinition } = {
  "track-1": {
    id: TrackId["track-1"],
    title: "Co se stalo?",
    url: "assets/audio/track-1.mp3",
    type: "audio",
    mimeType: "audio/mpeg",
  },
  "track-2": {
    id: TrackId["track-2"],
    title: "Střetnutí s letáky a prádlem",
    url: "assets/audio/track-2.mp3",
    type: "audio",
    mimeType: "audio/mpeg",
  },
  "track-3": {
    id: TrackId["track-3"],
    title: "Ty jsi tam byl taky?",
    url: "assets/audio/track-3.mp3",
    type: "audio",
    mimeType: "audio/mpeg",
  },
  "track-4": {
    id: TrackId["track-4"],
    title: "Citlivé materiály",
    url: "assets/audio/track-4.mp3",
    type: "audio",
    mimeType: "audio/mpeg",
  },
  "track-5": {
    id: TrackId["track-5"],
    title: "Ve škole života není prázdnin",
    url: "assets/audio/track-5.mp3",
    type: "audio",
    mimeType: "audio/mpeg",
  },
  "track-6": {
    id: TrackId["track-6"],
    title: "Divadelní stávka",
    url: "assets/audio/track-6.mp3",
    type: "audio",
    mimeType: "audio/mpeg",
  },
  "track-7": {
    id: TrackId["track-7"],
    title: "Co bude pak?",
    url: "assets/audio/track-7.mp3",
    type: "audio",
    mimeType: "audio/mpeg",
  },
  vaclavak: {
    id: TrackId["vaclavak"],
    title: "Reportáž z Václavského náměstí",
    url: "assets/video/vaclavak_v3.mp4",
    type: "video",
    mimeType: "video/mp4",
    placeholderImage: "assets/img/photos/end-video.png",
  },
  thanksTrack: {
    id: TrackId["thanksTrack"],
    title: "Děkujeme za poslech!",
    url: "assets/audio/track-8.mp3",
    type: "audio",
    mimeType: "audio/mpeg",
  },
};
