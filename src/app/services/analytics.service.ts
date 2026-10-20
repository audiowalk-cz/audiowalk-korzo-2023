import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AnalyticsService {
  private plausible = (window as any).plausible;
  private matomo: any[] | undefined = (window as any)._paq;

  constructor() {}

  trackPageView(url: string) {
    this.matomo?.push(["setCustomUrl", url]);
    this.matomo?.push(["setDocumentTitle", document.title]);
    this.matomo?.push(["trackPageView"]);
  }

  trackEvent(eventName: string, props?: any) {
    this.plausible?.(eventName, { props });

    const name = props && Object.keys(props).length ? JSON.stringify(props) : undefined;
    this.matomo?.push(["trackEvent", "app", eventName, name]);
  }

  trackError(message: string) {
    this.trackEvent("error", { message });
  }
}
