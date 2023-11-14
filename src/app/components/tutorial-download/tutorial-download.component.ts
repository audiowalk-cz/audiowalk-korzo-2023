import { Component } from "@angular/core";
import { AnalyticsService } from "src/app/services/analytics.service";
import { MediaService } from "src/app/services/media.service";

@Component({
  selector: "app-tutorial-download",
  templateUrl: "./tutorial-download.component.html",
  styleUrls: ["./tutorial-download.component.scss"],
})
export class TutorialDownloadComponent {
  public downloadStatus = this.mediaService.downloadStatus;
  public downloadProgress = this.mediaService.downloadProgress;

  constructor(
    private mediaService: MediaService,
    private analytics: AnalyticsService
  ) { }

  async download() {
    this.analytics.trackEvent("downloadTracks", {});
    await this.mediaService.downloadTracks();
  }

  async delete() {
    this.analytics.trackEvent("deleteTracks", {});
    await this.mediaService.deleteTracks();
  }
}
