import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { TrackDefinition } from "../schema/track";
import { TrackList } from "../tracklist";
import { FileStorageService } from "./file-storage.service";
import { LocalStorageService } from "./local-storage.service";

export type DownloadStatus = "idle" | "downloading" | "downloaded" | "error";

@Injectable({
  providedIn: "root",
})
export class AudioService {
  tracks = new BehaviorSubject<TrackDefinition[]>([]);

  downloadStatus = new BehaviorSubject<DownloadStatus>("idle");

  constructor(private fileStorageService: FileStorageService, private localStorageService: LocalStorageService) {
    this.updateTracks();
  }

  async updateTracks() {
    const tracks = await Promise.all(TrackList.map((t) => this.updateTrack(t)));

    this.tracks.next(tracks);

    if (tracks.every((t) => t.isDownloaded)) this.downloadStatus.next("downloaded");
  }

  async getTrackUrl(trackDef: TrackDefinition): Promise<string> {
    const storedData = await this.fileStorageService.get<ArrayBuffer>(trackDef.id);
    return storedData ? URL.createObjectURL(new Blob([storedData], { type: "audio/mpeg" })) : trackDef.url;
  }

  async downloadTracks() {
    this.downloadStatus.next("downloading");

    for (let track of TrackList) {
      await this.downloadTrack(track);
      this.updateTracks();
    }

    this.downloadStatus.next("downloaded");
  }

  async saveTrackProgress(track: TrackDefinition, progress: number) {
    await this.localStorageService.set(`progress-${track.id}`, progress);
    this.updateTracks();
  }

  private async updateTrack(trackInfo: TrackDefinition): Promise<TrackDefinition> {
    const [isDownloaded, progress] = await Promise.all([
      await this.fileStorageService.has(trackInfo.id),

      await this.localStorageService
        .get(`progress-${trackInfo.id}`)
        .then((value) => (value ? parseFloat(value) ?? 0 : undefined)),
    ]);

    return { ...trackInfo, isDownloaded, progress };
  }

  private async downloadTrack(trackDef: TrackDefinition) {
    const res = await fetch(trackDef.url);
    const data = await res.arrayBuffer();

    await this.fileStorageService.put(trackDef.id, data);
  }
}
