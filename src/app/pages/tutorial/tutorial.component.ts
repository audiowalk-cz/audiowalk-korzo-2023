import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { TrackDefinition } from "src/app/schema/track";
import { LocationService } from "src/app/services/location.service";
import { MediaService } from "src/app/services/media.service";

export enum Chapter {
  "navigation",
  "sound",
  "download",
  "gps",
  "attention",
}

@UntilDestroy()
@Component({
  selector: "app-tutorial",
  templateUrl: "./tutorial.component.html",
  styleUrls: ["./tutorial.component.scss"],
})
export class TutorialComponent implements OnInit {
  currentChapter?: Chapter;
  Chapter = Chapter;
  chapterOrder = [Chapter.navigation, Chapter.sound, Chapter.download, Chapter.gps, Chapter.attention];

  public downloadStatus = this.mediaService.downloadStatus;
  public downloadProgress = this.mediaService.downloadProgress;
  public downloadSkipped = false;

  public gpsStatus = this.locationService.gpsStatus;

  readonly testTrack: TrackDefinition = {
    id: "test",
    title: "Testovací nahrávka",
    url: "assets/audio/spejbl-1.mp3",
    type: "audio",
    mimeType: "audio/mpeg",
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mediaService: MediaService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.pipe(untilDestroyed(this)).subscribe((params) => {
      const chapter = parseInt(params["chapter"]);

      if (!chapter || this.chapterOrder[chapter - 1] === undefined) this.openDefaultChapter();
      this.currentChapter = this.chapterOrder[chapter - 1];
    });
  }

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

  enableGps() {
    this.locationService.enableGps();
  }

  disableGps() {
    this.locationService.disableGps();
  }

  openChapter(chapter: number) {
    this.router.navigate(["/tutorial"], { queryParams: { chapter: chapter + 1 } });
  }

  openDefaultChapter() {
    this.openChapter(0);
  }

  nextChapter() {
    if (this.currentChapter === undefined) return;
    const currentChapterIndex = this.chapterOrder.indexOf(this.currentChapter);
    this.openChapter(Math.min(currentChapterIndex + 1, this.chapterOrder.length - 1));
  }

  backChapter() {
    if (this.currentChapter === undefined) return;
    const currentChapterIndex = this.chapterOrder.indexOf(this.currentChapter);
    if (currentChapterIndex === 0) {
      this.router.navigate(["/"]);
    } else {
      this.openChapter(currentChapterIndex - 1);
    }
  }
}
