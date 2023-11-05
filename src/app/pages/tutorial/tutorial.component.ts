import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { TrackDefinition } from "src/app/schema/track";
import { MediaService } from "src/app/services/media.service";

export enum Chapter {
  "navigation",
  "sound",
  "download",
  "attention",
};
@Component({
  selector: "app-tutorial",
  templateUrl: "./tutorial.component.html",
  styleUrls: ["./tutorial.component.scss"],
})
export class TutorialComponent {
  currentChapter: Chapter = Chapter.navigation;
  Chapter = Chapter;
  chapterOrder = [
    Chapter.navigation,
    Chapter.sound,
    Chapter.download,
    Chapter.attention,
  ];

  public downloadStatus = this.mediaService.downloadStatus;
  public downloadProgress = this.mediaService.downloadProgress;
  public downloadSkipped = false;

  readonly testTrack: TrackDefinition = {
    id: "test",
    title: "Testovací nahrávka",
    url: "assets/audio/spejbl-1.mp3",
    type: "audio",
    mimeType: "audio/mpeg",
  };

  constructor(
    private router: Router,
    private mediaService: MediaService
  ) { }

  openNavigation() {
    const address = "Nám. Václava Havla, 110 00 Nové Město";
    const url = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(address);
    window.open(url);
  }

  async download() {
    await this.mediaService.downloadTracks();
  }

  skipDownload(e: Event) {
    const inputEl = <HTMLInputElement>e.target!;
    this.downloadSkipped = inputEl.checked;
  }

  nextChapter() {
    const currentChapterIndex = this.chapterOrder.indexOf(this.currentChapter);
    this.currentChapter = this.chapterOrder[
      Math.min(
        currentChapterIndex + 1,
        this.chapterOrder.length - 1
      )
    ]
  }

  backChapter() {
    const currentChapterIndex = this.chapterOrder.indexOf(this.currentChapter);
    if (currentChapterIndex === 0) {
      this.router.navigate(["/"]);
    } else {
      this.currentChapter = this.chapterOrder[currentChapterIndex - 1]
    }
  }
}
