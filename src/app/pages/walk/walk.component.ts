import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { combineLatest } from "rxjs";
import { TrackDefinition } from "src/app/schema/track";
import { AudioService } from "src/app/services/audio.service";

@UntilDestroy()
@Component({
  selector: "app-walk",
  templateUrl: "./walk.component.html",
  styleUrls: ["./walk.component.scss"],
})
export class WalkComponent implements OnInit {
  tracks = this.audioService.tracks;
  track?: TrackDefinition;
  url?: string;

  constructor(private router: Router, private audioService: AudioService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    combineLatest([this.audioService.tracks, this.route.params])
      .pipe(untilDestroyed(this))
      .subscribe(([tracks, params]) => {
        const i = parseInt(params["track"]) - 1;
        const track = tracks[i];
        if (track?.id !== this.track?.id) {
          this.loadTrack(track);
        }
      });
  }

  nextTrack() {
    this.router.navigate(["/tracklist"]);
  }

  saveProgress(progress: number) {
    if (this.track) this.audioService.saveTrackProgress(this.track, progress);
  }

  private async loadTrack(track: TrackDefinition) {
    this.track = track;
    this.url = await this.audioService.getTrackUrl(track);
  }
}