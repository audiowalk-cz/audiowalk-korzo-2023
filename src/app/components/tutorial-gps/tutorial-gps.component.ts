import { Component } from "@angular/core";
import { LocationService } from "src/app/services/location.service";

@Component({
  selector: "app-tutorial-gps",
  templateUrl: "./tutorial-gps.component.html",
  styleUrls: ["./tutorial-gps.component.scss"],
})
export class TutorialGpsComponent {
  public gpsStatus = this.locationService.gpsStatus;

  constructor(private locationService: LocationService) {}

  enableGps() {
    this.locationService.enableGps();
  }

  disableGps() {
    this.locationService.disableGps();
  }
}
