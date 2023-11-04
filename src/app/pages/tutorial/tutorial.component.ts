import { Component } from "@angular/core";
import { TrackDefinition } from "src/app/schema/track";
import { MediaService } from "src/app/services/media.service";

@Component({
  selector: "app-tutorial",
  templateUrl: "./tutorial.component.html",
  styleUrls: ["./tutorial.component.scss"],
})
export class TutorialComponent {
  public downloadStatus = this.mediaService.downloadStatus;
  public downloadProgress = this.mediaService.downloadProgress;
  public downloadSkipped = false;

  readonly testTrack: TrackDefinition = {
    id: "test",
    title: "Testovací nahrávka",
    url: "assets/audio/spejbl-1.mp3",
    type: "audio",
    mimeType: "audio/mpeg",
  };

  constructor(private mediaService: MediaService) {}

  openNavigation() {
    const address = "Ve struhách 62, Praha 6";
    const url = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(address);
    window.open(url);
  }

  async download() {
    await this.mediaService.downloadTracks();
  }

  skipDownload(e: Event) {
    const inputEl = <HTMLInputElement>e.target!;
    this.downloadSkipped = inputEl.checked;
  }
}
