import { Component, OnInit } from "@angular/core";
import { TrackId } from "src/app/data/tracks";
import { Track } from "src/app/schema/track";
import { AnalyticsService } from "src/app/services/analytics.service";
import { MediaService } from "src/app/services/media.service";

@Component({
  selector: "app-share",
  templateUrl: "./share.component.html",
  styleUrls: ["./share.component.scss"],
})
export class ShareComponent implements OnInit {

  constructor(
    private analytics: AnalyticsService,
  ) { }
  ngOnInit(): void {
  }

  share() {
    this.analytics.trackEvent("share", {});
    if (navigator.share) {
      navigator.share({
        title: "Studentská revolta ‘89",
        text: "Studentská revolta ‘89 - Audioprůvodce k 17. listopadu 1989",
        url: "https://studentskarevolta89.cz",
      });
    }
  }
}
