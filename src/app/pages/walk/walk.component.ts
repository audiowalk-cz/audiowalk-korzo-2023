import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { PlayerComponent } from "src/app/components/player/player.component";
import { Chapters } from "src/app/data/chapters";
import { Chapter } from "src/app/schema/chapter";
import { Track } from "src/app/schema/track";
import { AnalyticsService } from "src/app/services/analytics.service";
import { ChaptersService } from "src/app/services/chapters.service";
import { MediaService } from "src/app/services/media.service";

@UntilDestroy()
@Component({
  selector: "app-walk",
  templateUrl: "./walk.component.html",
  styleUrls: ["./walk.component.scss"],
})
export class WalkComponent implements OnInit {
  track?: Track;
  url?: string;

  chapter?: Chapter;
  chapterIndex?: number;
  chapterCount = Chapters.length;

  @ViewChild(PlayerComponent) player?: PlayerComponent;

  constructor(
    private router: Router,
    private mediaService: MediaService,
    private route: ActivatedRoute,
    private chapterService: ChaptersService,
    private analytics: AnalyticsService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.pipe(untilDestroyed(this)).subscribe((params) => {
      const chapter = parseInt(params["chapter"]);

      if (!chapter) this.openDefaultChapter();
      else if (chapter && chapter !== this.chapterIndex) this.loadChapter(chapter);
    });
  }

  exitWalk() {
    this.router.navigate(["/"]);
  }

  endWalk() {
    this.router.navigate(["/end"]);
    // this.router.navigate(["/share"]);
  }

  restartChapter() {
    this.player?.restart();
  }

  nextChapter() {
    if (this.chapterIndex! < Chapters.length) this.openChapter(this.chapterIndex! + 1);
    else this.endWalk();
  }

  saveProgress(progress: number) {
    if (this.track) this.mediaService.saveTrackProgress(this.track, progress);
  }

  private async openDefaultChapter() {
    const lastChapter = await this.chapterService.getCurrentChapter();
    this.openChapter(lastChapter ?? 1);
  }

  private openChapter(i: number) {
    this.router.navigate(["/walk"], { queryParams: { chapter: String(i) }, replaceUrl: true });
  }

  private async loadChapter(chapter: number) {
    if (chapter > Chapters.length) return this.endWalk();
    if (chapter < 1) chapter = 1;

    this.chapterIndex = chapter;
    this.chapter = Chapters[chapter - 1];

    const trackDef = Chapters[chapter - 1].track;
    this.track = trackDef ? await this.mediaService.getTrack(trackDef) : undefined;

    this.analytics.trackEvent("chapter", { chapter: chapter });

    await this.chapterService.saveCurrentChapter(chapter);
  }
}
