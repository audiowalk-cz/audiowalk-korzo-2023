import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Track } from "src/app/schema/track";
import { AudioService } from "src/app/services/audio.service";

@Component({
  selector: "app-walk",
  templateUrl: "./walk.component.html",
  styleUrls: ["./walk.component.scss"],
})
export class WalkComponent {
  track?: Track;

  trackNumber: number = 0;

  constructor(private router: Router, private audioService: AudioService) {
    this.loadTrack(this.trackNumber);
  }

  async nextTrack() {
    this.trackNumber++;
    return this.loadTrack(this.trackNumber);
  }

  async loadTrack(i: number) {
    const track = await this.audioService.getTrack(i);

    if (track) {
      this.track = track;
    } else {
      this.router.navigate(["/end"]);
    }
  }
}
