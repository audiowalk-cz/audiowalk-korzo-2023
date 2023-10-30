import { Component } from "@angular/core";

@Component({
  selector: "app-end",
  templateUrl: "./end.component.html",
  styleUrls: ["./end.component.scss"],
})
export class EndComponent {
  share() {
    if (navigator.share) {
      navigator.share({
        title: "Studentská revolta ‘89",
        url: "https://studentskarevolta89.cz",
      });
    }
  }
}
