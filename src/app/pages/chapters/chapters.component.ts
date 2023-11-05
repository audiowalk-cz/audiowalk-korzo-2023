import { Component } from "@angular/core";
import { Chapters } from "src/app/data/chapters";
import { MediaService } from "src/app/services/media.service";

@Component({
  selector: "app-chapters",
  templateUrl: "./chapters.component.html",
  styleUrls: ["./chapters.component.scss"],
})
export class ChaptersComponent {
  chapters = Chapters;

  constructor(private audioService: MediaService) {}
}
