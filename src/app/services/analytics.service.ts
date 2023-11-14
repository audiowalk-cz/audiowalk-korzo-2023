import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AnalyticsService {
  private plausible = (window as any).plausible;

  constructor() {}

  trackEvent(eventName: string, props?: any) {
    this.plausible?.(eventName, { props });
  }

  trackError(message: string) {
    this.trackEvent("error", { message });
  }
}
