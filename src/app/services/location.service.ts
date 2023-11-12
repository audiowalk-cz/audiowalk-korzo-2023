import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { LocalStorageService } from "./local-storage.service";

// type GpsStatus = "on" | "off" | "error";
enum GpsStatus {
  "searching" = "searching",
  "on" = "on",
  "off" = "off",
  "error" = "error",
}

@Injectable({
  providedIn: "root",
})
export class LocationService {
  GpsStatus = GpsStatus;
  gpsStatus = new BehaviorSubject<GpsStatus>(GpsStatus.off);
  gpsPosition = new BehaviorSubject<GeolocationPosition | null>(null);

  gpsWatchSubscription?: number;

  constructor(private localStorage: LocalStorageService) {
    this.localStorage.get("gpsStatus").then((status) => {
      if (status === GpsStatus.on) this.enableGps();
    });
  }

  enableGps() {
    if (this.gpsWatchSubscription) navigator.geolocation!.clearWatch(this.gpsWatchSubscription);

    navigator.geolocation!.watchPosition(
      (position) => {
        this.gpsPosition.next(position);
        if (this.gpsStatus.value !== GpsStatus.on) this.gpsStatus.next(GpsStatus.on);
      },
      (err) => {
        this.gpsStatus.next(GpsStatus.error);
        console.error(err);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );

    if (this.gpsPosition.value) this.gpsStatus.next(GpsStatus.on);
    else this.gpsStatus.next(GpsStatus.searching);

    this.localStorage.set("gpsStatus", GpsStatus.on);
  }

  disableGps() {
    if (this.gpsWatchSubscription) navigator.geolocation!.clearWatch(this.gpsWatchSubscription);

    this.gpsStatus.next(GpsStatus.off);
    this.localStorage.set("gpsStatus", GpsStatus.off);
  }
}
