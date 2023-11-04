export interface TrackDefinition {
  id: string;
  title: string;
  url: string;
  type: "audio" | "video";
  mimeType: string;
}

export interface Track extends TrackDefinition {
  isDownloaded?: boolean;
  progress?: number;
}
