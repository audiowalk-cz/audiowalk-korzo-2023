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
    const tracks = await Promise.all(TrackList.map((track) => this.getTrack(track.id).catch(() => null)));
    return tracks.filter((track): track is Exclude<typeof track, null> => track !== null);
  }

  async clearCache() {
    await this.storageService.clear();
  }

  async getTrack(trackId: string): Promise<Track> {
    const track = TrackList.find((track) => track.id === trackId);
    if (!track) throw new Error("Stopa nenalezena");

    const storedData = await this.storageService.get<ArrayBuffer>(trackId);

    if (storedData) {
      track.url = URL.createObjectURL(new Blob([storedData]));
      track.isDownloaded = true;
    }

    return track;
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
