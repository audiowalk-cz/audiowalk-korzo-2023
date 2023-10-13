import { AfterViewInit, Component, ElementRef, Input, ViewChild } from "@angular/core";

@Component({
  selector: "app-player",
  templateUrl: "./player.component.html",
  styleUrls: ["./player.component.scss"],
})
export class PlayerComponent implements AfterViewInit {
  @Input() tracklist = [
    {
      audio: "spejbl.mp3",
      album: "Studentská revolta",
      artist: "Díky že můžem",
      title: "První track",
    },
  ];

  currentTrack = this.tracklist[0];

  @ViewChild("audioPlayer") audioPlayer!: ElementRef<HTMLAudioElement>;

  ngAfterViewInit(): void {
    if (navigator.mediaSession) {
      navigator.mediaSession.metadata = new MediaMetadata({
        album: "Studentská revolta",
        artist: "Díky že můžem",
        title: "První track",
      });

      navigator.mediaSession.setActionHandler("play", async () => {
        navigator.mediaSession.playbackState = "playing";
        await this.audioPlayer.nativeElement.play();
      });

      navigator.mediaSession.setActionHandler("pause", async () => {
        navigator.mediaSession.playbackState = "paused";
        await this.audioPlayer.nativeElement.pause();
      });

      navigator.mediaSession.setActionHandler("previoustrack", () => {
        if (this.audioPlayer.nativeElement.currentTime > 5) {
          this.audioPlayer.nativeElement.currentTime = 0;
        } else {
          const i = this.tracklist.indexOf(this.currentTrack);
          if (i > 0) {
            this.currentTrack = this.tracklist[i - 1];
          }
        }
      });

      navigator.mediaSession.setActionHandler("nexttrack", () => {
        const i = this.tracklist.indexOf(this.currentTrack);
        if (i < this.tracklist.length - 1) {
          this.currentTrack = this.tracklist[i + 1];
        }
      });
    }
  }
}
