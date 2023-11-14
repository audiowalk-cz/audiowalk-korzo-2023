import { Injectable } from "@angular/core";
import axios from "axios";
import { BehaviorSubject, Subject } from "rxjs";
import { TrackId, Tracks } from "../data/tracks";
import { Track, TrackDefinition } from "../schema/track";
import { FileStorageService } from "./file-storage.service";
import { LocalStorageService } from "./local-storage.service";

export type DownloadStatus = "checking" | "not-downloaded" | "downloading" | "downloaded" | "error";

@Injectable({
  providedIn: "root",
})
export class MediaService {
  downloadStatus = new BehaviorSubject<DownloadStatus>("not-downloaded");
  downloadProgress = new BehaviorSubject<number>(0);

  constructor(private fileStorageService: FileStorageService, private localStorageService: LocalStorageService) {
    this.updateDownloadStatus();
  }

  async getTracks(): Promise<Track[]> {
    return Promise.all(Object.values(Tracks).map((trackDef) => this.getTrack(trackDef.id)));
  }

  async getTrack(trackId: TrackId): Promise<Track> {
    const trackDef = Tracks[trackId];
    if (!trackDef) throw new Error(`Track ${trackId} not found`);

    const storedData = await this.fileStorageService.get<ArrayBuffer>(trackDef.id).catch(() => null);
    const url = storedData ? URL.createObjectURL(new Blob([storedData], { type: trackDef.mimeType })) : trackDef.url;
    const isDownloaded = !!storedData;

    const progress = await this.localStorageService
      .get(`progress-${trackDef.id}`)
      .catch(() => null)
      .then((value) => (value ? parseFloat(value) ?? 0 : undefined));

    return { ...trackDef, url, progress, isDownloaded };
  }

  async updateDownloadStatus(): Promise<void> {
    this.downloadStatus.next("checking");

    const downloadStatus = await this.getTracks()
      .catch(() => [])
      .then((tracks) => tracks.every((track) => track.isDownloaded));

    this.downloadStatus.next(downloadStatus ? "downloaded" : "not-downloaded");
  }

  async downloadTracks() {
    const trackDefs = Object.values(Tracks);

    this.downloadStatus.next("downloading");
    this.downloadProgress.next(0);

    try {
      for (let [i, track] of trackDefs.entries()) {
        const trackProgress = new Subject<number>();
        trackProgress.subscribe((progress) =>
          this.downloadProgress.next((i * 1) / trackDefs.length + progress / trackDefs.length)
        );

        await this.downloadTrack(track, trackProgress);
      }
      this.downloadStatus.next("downloaded");
    } catch (e) {
      this.downloadStatus.next("error");
    }
  }

  async deleteTracks() {
    const trackDefs = Object.values(Tracks);

    for (let [i, track] of trackDefs.entries()) {
      await this.fileStorageService.delete(track.id).catch();
    }

    await this.updateDownloadStatus();
  }

  async saveTrackProgress(track: TrackDefinition, progress: number) {
    await this.localStorageService.set(`progress-${track.id}`, progress).catch();
  }

  private async downloadTrack(trackDef: TrackDefinition, progress: Subject<number>) {
    const res = await axios.get<ArrayBuffer>(trackDef.url, {
      responseType: "arraybuffer",
      onDownloadProgress: (e: any) => {
        if (e.total) progress.next(e.loaded / e.total);
      },
    });

    await this.fileStorageService.put(trackDef.id, res.data);
  }
}
