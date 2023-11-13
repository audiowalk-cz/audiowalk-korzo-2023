import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { TrackDefinition } from "src/app/schema/track";
import { ChaptersService } from "src/app/services/chapters.service";
import { LocationService } from "src/app/services/location.service";
import { MediaService } from "src/app/services/media.service";

export enum TutorialSteps {
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
  tutorialStep?: TutorialSteps;
  TutorialSteps = TutorialSteps;
  tutorialStepsOrder = [
    TutorialSteps.navigation,
    TutorialSteps.sound,
    TutorialSteps.download,
    TutorialSteps.gps,
    TutorialSteps.attention,
  ];

  public downloadStatus = this.mediaService.downloadStatus;
  public downloadProgress = this.mediaService.downloadProgress;
  public downloadSkipped = false;

  public gpsStatus = this.locationService.gpsStatus;

  public currentChapter = this.chaptersService.currentChapter;

  readonly testTrack: TrackDefinition = {
    id: "test",
    title: "Testovací nahrávka",
    url: "assets/audio/track-0.mp3",
    type: "audio",
    mimeType: "audio/mpeg",
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mediaService: MediaService,
    private locationService: LocationService,
    private chaptersService: ChaptersService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.pipe(untilDestroyed(this)).subscribe((params) => {
      const step = parseInt(params["step"]);

      if (!step || this.tutorialStepsOrder[step - 1] === undefined) this.openDefaultStep();
      this.tutorialStep = this.tutorialStepsOrder[step - 1];
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

  openStep(step: number, replaceUrl = false) {
    this.router.navigate(["/tutorial"], { queryParams: { step: step + 1 }, replaceUrl });
  }

  openDefaultStep() {
    this.openStep(0, true);
  }

  nextStep() {
    if (this.tutorialStep === undefined) return;
    const currentChapterIndex = this.tutorialStepsOrder.indexOf(this.tutorialStep);
    this.openStep(Math.min(currentChapterIndex + 1, this.tutorialStepsOrder.length - 1));
  }

  previousStep() {
    if (this.tutorialStep === undefined) return;
    const currentChapterIndex = this.tutorialStepsOrder.indexOf(this.tutorialStep);
    if (currentChapterIndex === 0) {
      this.router.navigate(["/"]);
    } else {
      this.openStep(currentChapterIndex - 1);
    }
  }
}
