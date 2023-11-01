export interface TrackDefinition {
  id: string;
  title: string;
  description: string;
  path: {
    directions: string;
    durationMinutes: number;
    title: string;
    description: string;
  };
  url: string;
  length: number;
  isDownloaded?: boolean;
  progress?: number;
}
