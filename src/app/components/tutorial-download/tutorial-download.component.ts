import { Component } from "@angular/core";
import { MediaService } from "src/app/services/media.service";

@Component({
  selector: "app-tutorial-download",
  templateUrl: "./tutorial-download.component.html",
  styleUrls: ["./tutorial-download.component.scss"],
})
export class TutorialDownloadComponent {
  public downloadStatus = this.mediaService.downloadStatus;
  public downloadProgress = this.mediaService.downloadProgress;

  constructor(private mediaService: MediaService) {}

  async download() {
    await this.mediaService.downloadTracks();
  }

  async delete() {
    await this.mediaService.deleteTracks();
  }
}
