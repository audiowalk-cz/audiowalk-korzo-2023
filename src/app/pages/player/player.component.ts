import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { AudioService } from "src/app/services/audio.service";
import { TrackList } from "src/app/tracklist";

@Component({
  selector: "app-player",
  templateUrl: "./player.component.html",
  styleUrls: ["./player.component.scss"],
})
export class PlayerComponent implements AfterViewInit {
  currentTrack = TrackList[0];

  currentUrl?: string;

  @ViewChild("audioPlayer") audioPlayer!: ElementRef<HTMLAudioElement>;

  constructor(private audioService: AudioService) {}

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
          const i = TrackList.indexOf(this.currentTrack);
          if (i > 0) {
            this.currentTrack = TrackList[i - 1];
          }
        }
      });

      navigator.mediaSession.setActionHandler("nexttrack", () => {
        const i = TrackList.indexOf(this.currentTrack);
        if (i < TrackList.length - 1) {
          this.currentTrack = TrackList[i + 1];
        }
      });
    }
  }

  async play() {
    const track = await this.audioService.getTrack(this.currentTrack.id);
    this.currentUrl = track.url;
    this.audioPlayer.nativeElement.src = track.url;
    this.audioPlayer.nativeElement.load();
    await this.audioPlayer.nativeElement.play();
  }
}
