import { Component, OnInit } from "@angular/core";
import { Tracks } from "src/app/data/tracks";
import { Track } from "src/app/schema/track";
import { MediaService } from "src/app/services/media.service";

@Component({
  selector: "app-end",
  templateUrl: "./end.component.html",
  styleUrls: ["./end.component.scss"],
})
export class EndComponent implements OnInit {
  endTrack?: Track;

  constructor(private mediaService: MediaService) {}
  ngOnInit(): void {
    this.mediaService.getTrack(Tracks.havel).then((track) => (this.endTrack = track));
  }

  share() {
    if (navigator.share) {
      navigator.share({
        title: "Studentská revolta ‘89",
        url: "https://studentskarevolta89.cz",
      });
    }
  }
}
