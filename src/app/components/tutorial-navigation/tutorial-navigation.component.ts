import { Component } from "@angular/core";

@Component({
  selector: "app-tutorial-navigation",
  templateUrl: "./tutorial-navigation.component.html",
  styleUrls: ["./tutorial-navigation.component.scss"],
})
export class TutorialNavigationComponent {
  openNavigation() {
    const address = "Nám. Václava Havla, 110 00 Nové Město";
    const url = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(address);
    window.open(url);
  }
}
