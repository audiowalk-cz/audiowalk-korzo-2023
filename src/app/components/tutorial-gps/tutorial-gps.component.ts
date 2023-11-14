import { Component } from "@angular/core";
import { AnalyticsService } from "src/app/services/analytics.service";
import { LocationService } from "src/app/services/location.service";

@Component({
  selector: "app-tutorial-gps",
  templateUrl: "./tutorial-gps.component.html",
  styleUrls: ["./tutorial-gps.component.scss"],
})
export class TutorialGpsComponent {
  public gpsStatus = this.locationService.gpsStatus;

  constructor(
    private locationService: LocationService,
    private analytics: AnalyticsService,
  ) { }

  enableGps() {
    this.analytics.trackEvent("gpsOn", {});
    this.locationService.enableGps();
  }

  disableGps() {
    this.locationService.disableGps();
  }
}
