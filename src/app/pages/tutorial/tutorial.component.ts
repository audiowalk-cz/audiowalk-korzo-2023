import { Component } from "@angular/core";
import { AudioService } from "src/app/services/audio.service";

@Component({
  selector: "app-tutorial",
  templateUrl: "./tutorial.component.html",
  styleUrls: ["./tutorial.component.scss"],
})
export class TutorialComponent {
  public downloadStatus = this.audioService.downloadStatus;
  public downloadProgress = this.audioService.downloadProgress;

  constructor(private audioService: AudioService) {}

  openNavigation() {
    const address = "Ve struhách 62, Praha 6";
    const url = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(address);
    window.open(url);
  }

  async download() {
    await this.audioService.downloadTracks();
  }
}
