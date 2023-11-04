import { Component } from "@angular/core";
import { Chapters } from "src/app/chapters";
import { TrackDefinition } from "src/app/schema/track";
import { AudioService } from "src/app/services/audio.service";

@Component({
  selector: "app-tutorial",
  templateUrl: "./tutorial.component.html",
  styleUrls: ["./tutorial.component.scss"],
})
export class TutorialComponent {
  public downloadStatus = this.audioService.downloadStatus;
  public downloadProgress = this.audioService.downloadProgress;
  public downloadSkipped = false;

  readonly testTrack: TrackDefinition = {
    id: "test",
    title: "Testovací nahrávka",
    url: "assets/audio/spejbl-1.mp3",
  };

  constructor(private audioService: AudioService) {}

  openNavigation() {
    const address = "Ve struhách 62, Praha 6";
    const url = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(address);
    window.open(url);
  }

  async download() {
    const trackDefs = Chapters.map((chapter) => chapter.track);
    await this.audioService.downloadTracks(trackDefs);
  }

  skipDownload(e: Event) {
    const inputEl = <HTMLInputElement>e.target!;
    this.downloadSkipped = inputEl.checked;
  }
}
