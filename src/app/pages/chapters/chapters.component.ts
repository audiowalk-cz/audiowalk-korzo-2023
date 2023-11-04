import { Component } from "@angular/core";
import { Chapters } from "src/app/chapters";
import { AudioService } from "src/app/services/audio.service";

@Component({
  selector: "app-chapters",
  templateUrl: "./chapters.component.html",
  styleUrls: ["./chapters.component.scss"],
})
export class ChaptersComponent {
  chapters = Chapters;

  constructor(private audioService: AudioService) {}
}
