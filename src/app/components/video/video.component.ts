import { Component, Input } from "@angular/core";
import { Track } from "src/app/schema/track";

@Component({
  selector: "app-video",
  templateUrl: "./video.component.html",
  styleUrls: ["./video.component.scss"],
})
export class VideoComponent {
  @Input() track!: Track;

  offline = !navigator.onLine;
}
