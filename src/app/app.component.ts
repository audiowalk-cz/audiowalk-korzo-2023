import { Component, ErrorHandler } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs";
import { config } from "src/config";
import { AnalyticsService } from "./services/analytics.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  config = config;
  constructor(
    public errorHandler: ErrorHandler,
    router: Router,
    analytics: AnalyticsService
  ) {
    router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => analytics.trackPageView(event.urlAfterRedirects));
  }
}
