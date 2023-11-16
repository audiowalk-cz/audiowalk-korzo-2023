import { Component, Input } from "@angular/core";

@Component({
  selector: "app-player-progress",
  templateUrl: "./player-progress.component.html",
  styleUrls: ["./player-progress.component.scss"],
})
export class PlayerProgressComponent {
  @Input() progress: number = 0;
  @Input() totalTime?: number;
  @Input() currentTime?: number;
}
