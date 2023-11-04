import { TrackDefinition } from "./track";

export interface Chapter {
  directions: string;
  durationMinutes: number;
  title: string;
  description: string;
  track?: TrackDefinition;
  pathIndex: number;
}
