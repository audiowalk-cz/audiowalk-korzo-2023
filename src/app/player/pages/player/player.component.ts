import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-player",
  templateUrl: "./player.component.html",
  styleUrls: ["./player.component.scss"],
})
export class PlayerComponent implements OnInit {
  ngOnInit(): void {
    console.log(navigator.mediaSession);
    if (navigator.mediaSession) {
      navigator.mediaSession.playbackState = "playing";
      navigator.mediaSession.metadata = new MediaMetadata({
        album: "Studentská revolta",
        artist: "Díky že můžem",
        title: "První track",
      });
    }
  }
}
