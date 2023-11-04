import { Injectable } from "@angular/core";
import axios from "axios";
import { BehaviorSubject, Subject } from "rxjs";
import { Chapters } from "../chapters";
import { Track, TrackDefinition } from "../schema/track";
import { FileStorageService } from "./file-storage.service";
import { LocalStorageService } from "./local-storage.service";
export type DownloadStatus = "idle" | "downloading" | "downloaded" | "error";

@Injectable({
  providedIn: "root",
})
export class AudioService {
  downloadStatus = new BehaviorSubject<DownloadStatus>("idle");
  downloadProgress = new BehaviorSubject<number>(0);

  constructor(private fileStorageService: FileStorageService, private localStorageService: LocalStorageService) {}

  async getTrack(trackDef: TrackDefinition): Promise<Track> {
    const storedData = await this.fileStorageService.get<ArrayBuffer>(trackDef.id);
    const url = storedData ? URL.createObjectURL(new Blob([storedData], { type: "audio/mpeg" })) : trackDef.url;
    const isDownloaded = !!storedData;

    const progress = await this.localStorageService
      .get(`progress-${trackDef.id}`)
      .then((value) => (value ? parseFloat(value) ?? 0 : undefined));

    return { ...trackDef, url, progress, isDownloaded };
  }

  async downloadTracks(trackDefs: TrackDefinition[]) {
    this.downloadStatus.next("downloading");
    this.downloadProgress.next(0);
    try {
      for (let [i, track] of trackDefs.entries()) {
        const trackProgress = new Subject<number>();
        trackProgress.subscribe((progress) =>
          this.downloadProgress.next((i * 1) / Chapters.length + progress / Chapters.length)
        );

        await this.downloadTrack(track, trackProgress);
      }
      this.downloadStatus.next("downloaded");
    } catch (e) {
      this.downloadStatus.next("error");
    }
  }

  async getCurrentChapter(): Promise<number | null> {
    const chapter = await this.localStorageService.get("current-track");
    return chapter ? parseInt(chapter) : null;
  }

  async saveCurrentTrack(trackId: string) {
    await this.localStorageService.set("current-track", trackId);
  }

  async saveTrackProgress(track: TrackDefinition, progress: number) {
    await this.localStorageService.set(`progress-${track.id}`, progress);
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
function lasfirstValueFrom(
  tracks: BehaviorSubject<TrackDefinition[] | null>
): TrackDefinition[] | PromiseLike<TrackDefinition[]> {
  throw new Error("Function not implemented.");
}
