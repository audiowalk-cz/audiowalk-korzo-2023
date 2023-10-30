import { Component, Input } from "@angular/core";
import { TrackDefinition } from "src/app/schema/track";

@Component({
  selector: "app-track-info",
  templateUrl: "./track-info.component.html",
  styleUrls: ["./track-info.component.scss"],
})
export class TrackInfoComponent {
  @Input() track?: TrackDefinition;
}
