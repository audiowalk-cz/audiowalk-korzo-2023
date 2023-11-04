import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Chapters } from "src/app/chapters";
import { Chapter } from "src/app/schema/chapter";
import { Track } from "src/app/schema/track";
import { AudioService } from "src/app/services/audio.service";

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

  constructor(private router: Router, private audioService: AudioService, private route: ActivatedRoute) {}

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
  }

  nextChapter() {
    if (this.chapterIndex! < Chapters.length) this.openChapter(this.chapterIndex! + 1);
    else this.endWalk();
  }

  saveProgress(progress: number) {
    if (this.track) this.audioService.saveTrackProgress(this.track, progress);
  }

  private async openDefaultChapter() {
    const lastChapter = await this.audioService.getCurrentChapter();
    this.openChapter(lastChapter ?? 1);
  }

  private openChapter(i: number) {
    this.router.navigate(["/walk"], { queryParams: { chapter: String(i) } });
  }

  private async loadChapter(chapter: number) {
    this.chapterIndex = chapter;
    this.chapter = Chapters[chapter - 1];

    const trackDef = Chapters[chapter - 1].track;
    this.track = await this.audioService.getTrack(trackDef);
  }
}
