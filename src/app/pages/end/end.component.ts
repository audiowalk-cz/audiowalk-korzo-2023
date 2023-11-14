import { Component, OnInit } from "@angular/core";
import { Tracks } from "src/app/data/tracks";
import { TrackDefinition } from "src/app/schema/track";
import { MediaService } from "src/app/services/media.service";

@Component({
  selector: "app-end",
  templateUrl: "./end.component.html",
  styleUrls: ["./end.component.scss"],
})
export class EndComponent implements OnInit {
  readonly videoTrack: TrackDefinition = Tracks.vaclavak;

  readonly thanksTrack: TrackDefinition = Tracks.thanksTrack;

  constructor(private mediaService: MediaService) {}
  ngOnInit(): void {
    // this.mediaService.getTrack(TrackId.havel).then((track) => (this.thanksTrack = track));
  }
}
