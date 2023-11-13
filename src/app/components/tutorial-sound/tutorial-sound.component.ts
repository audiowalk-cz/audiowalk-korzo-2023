import { Component } from "@angular/core";
import { TrackDefinition } from "src/app/schema/track";

@Component({
  selector: "app-tutorial-sound",
  templateUrl: "./tutorial-sound.component.html",
  styleUrls: ["./tutorial-sound.component.scss"],
})
export class TutorialSoundComponent {
  readonly testTrack: TrackDefinition = {
    id: "test",
    title: "Testovací nahrávka",
    url: "assets/audio/track-0.mp3",
    type: "audio",
    mimeType: "audio/mpeg",
  };
}
