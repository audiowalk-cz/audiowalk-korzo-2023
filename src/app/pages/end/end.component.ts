import { Component, OnInit } from "@angular/core";
import { TrackId } from "src/app/data/tracks";
import { Track, TrackDefinition } from "src/app/schema/track";
import { MediaService } from "src/app/services/media.service";

@Component({
  selector: "app-end",
  templateUrl: "./end.component.html",
  styleUrls: ["./end.component.scss"],
})
export class EndComponent implements OnInit {

  readonly thanksTrack: TrackDefinition = {
    id: "podekovani",
    title: "Děkujeme za poslech!",
    url: "assets/audio/track-8.mp3",
    type: "audio",
    mimeType: "audio/mpeg",
  };

  constructor(private mediaService: MediaService) { }
  ngOnInit(): void {
    // this.mediaService.getTrack(TrackId.havel).then((track) => (this.thanksTrack = track));
  }
}
