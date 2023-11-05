import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Chapters } from "src/app/chapters";
import { TrackDefinition } from "src/app/schema/track";
import { AudioService } from "src/app/services/audio.service";

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

  public downloadStatus = this.audioService.downloadStatus;
  public downloadProgress = this.audioService.downloadProgress;
  public downloadSkipped = false;

  readonly testTrack: TrackDefinition = {
    id: "test",
    title: "Testovací nahrávka",
    url: "assets/audio/spejbl-1.mp3",
  };

  constructor(
    private router: Router,
    private audioService: AudioService,
  ) { }

  openNavigation() {
    const address = "Nám. Václava Havla, 110 00 Nové Město";
    const url = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(address);
    window.open(url);
  }

  async download() {
    const trackDefs = Chapters.map((chapter) => chapter.track);
    await this.audioService.downloadTracks(trackDefs);
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
