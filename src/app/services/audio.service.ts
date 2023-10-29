import { Injectable } from "@angular/core";
import { Track } from "../schema/track";
import { TrackList } from "../tracklist";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: "root",
})
export class AudioService {
  constructor(private storageService: StorageService) {}

  async listTracks(): Promise<Track[]> {
    const tracks: Track[] = [];

    for (let i = 0; i < TrackList.length; i++) {
      const track = await this.getTrack(i);
      if (track) tracks.push(track);
    }

    return tracks;
  }

  async clearCache() {
    await this.storageService.clear();
  }

  async getTrack(i: number): Promise<Track | null> {
    const track = TrackList[i];
    if (!track) return null;

    const storedData = await this.storageService.get<ArrayBuffer>(track.id);

    return {
      ...track,
      url: storedData ? URL.createObjectURL(new Blob([storedData])) : track.url,
      isDownloaded: !!storedData,
    };
  }

  async cacheTrack(trackId: string) {
    const track = TrackList.find((track) => track.id === trackId);
    if (!track) throw new Error("Stopa nenalezena");

    const res = await fetch(track.url);
    const data = await res.arrayBuffer();

    await this.storageService.put(trackId, data);
  }

  async deleteTrack(trackId: string) {
    this.storageService.delete(trackId);
  }
}
