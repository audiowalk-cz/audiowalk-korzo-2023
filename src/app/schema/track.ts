export interface TrackDefinition {
  id: string;
  title: string;
  url: string;
}

export interface Track extends TrackDefinition {
  isDownloaded?: boolean;
  progress?: number;
}
