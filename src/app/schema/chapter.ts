import { TrackId } from "../data/tracks";

export interface Chapter {
  directions: string;
  durationMinutes: number;
  title: string;
  description: string;
  track?: TrackId;
  pathIndex: number;
}
