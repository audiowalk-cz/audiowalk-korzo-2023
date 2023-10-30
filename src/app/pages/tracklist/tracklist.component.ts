import { Component } from "@angular/core";
import { TrackDefinition } from "src/app/schema/track";
import { AudioService } from "src/app/services/audio.service";

@Component({
  selector: "app-tracklist",
  templateUrl: "./tracklist.component.html",
  styleUrls: ["./tracklist.component.scss"],
})
export class TracklistComponent {
  tracks = this.audioService.tracks;

  constructor(private audioService: AudioService) {}

  play(track: TrackDefinition) {}
}
