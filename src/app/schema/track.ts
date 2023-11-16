export interface BaseTrackDefinition {
  id: string;
  title: string;
  url: string;
  type: string;
  mimeType: string;
  placeholderImage?: string;
}

export interface AudioTrackDefinition extends BaseTrackDefinition {
  id: string;
  title: string;
  url: string;
  type: "audio";
  mimeType: string;
  placeholderImage?: string;
}

export interface VideoTrackDefinition extends BaseTrackDefinition {
  id: string;
  title: string;
  url: string;
  type: "video";
  mimeType: string;
  placeholderImage: string;
}

export type TrackDefinition = AudioTrackDefinition | VideoTrackDefinition;

export interface TrackMeta {
  isDownloaded?: boolean;
  progress?: number;
}

export type Track = TrackDefinition & TrackMeta;
