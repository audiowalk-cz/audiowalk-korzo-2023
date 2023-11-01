import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { combineLatest } from "rxjs";
import { TrackDefinition } from "src/app/schema/track";
import { AudioService } from "src/app/services/audio.service";
import { SharedEventService } from "src/app/services/event-handler.service";

@UntilDestroy()
@Component({
  selector: "app-walk",
  templateUrl: "./walk.component.html",
  styleUrls: ["./walk.component.scss"],
})
export class WalkComponent implements OnInit {
  tracks = this.audioService.tracks;
  chapterIndex?: number;
  chapterCount?: number;
  track?: TrackDefinition;
  url?: string;

  constructor(
    private router: Router,
    private audioService: AudioService,
    private route: ActivatedRoute,
    private eventService: SharedEventService
  ) { }

  ngOnInit(): void {
    combineLatest([this.audioService.tracks, this.route.params])
      .pipe(untilDestroyed(this))
      .subscribe(([tracks, params]) => {
        const i = parseInt(params["track"]) - 1;
        this.chapterCount = tracks.length;
        this.chapterIndex = i + 1;
        const track = tracks[i];
        if (track?.id !== this.track?.id) {
          this.loadTrack(track, i);
        }
      });
  }

  nextTrack() {
    this.router.navigate(["/tracklist"]);
  }

  saveProgress(progress: number) {
    if (this.track) this.audioService.saveTrackProgress(this.track, progress);
  }

  private async loadTrack(track: TrackDefinition, index: number) {
    this.track = track;
    this.url = await this.audioService.getTrackUrl(track);

    this.triggerLoadTrackEvent(index)
  }

  triggerLoadTrackEvent(index: number) {
    this.eventService.emitLoadTrackEvent({ trackId: index });
  }
}
