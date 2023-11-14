import { Component, ErrorHandler } from "@angular/core";
import { config } from "src/config";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  config = config;
  constructor(public errorHandler: ErrorHandler) {}
}
