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
    {
      audio: "spejbl02.mp3",
      album: "Studentská revolta",
      artist: "Díky že můžem",
      title: "Druhý track",
    },
  ];

  currentTrack = this.tracklist[parseInt(
    localStorage.getItem('track') || "0"
  )];
  currentTime = parseInt(
    localStorage.getItem('time') || "0"
  );
  duration = 0;

  @ViewChild("audioPlayer") audioPlayer!: ElementRef<HTMLAudioElement>;
  // @ViewChild("pauseButton") pauseButton!: ElementRef<HTMLButtonElement>;
  // pauseButton.
  pauseAudio(event: any) {
    this.audioPlayer.nativeElement.pause();
  }
  playAudio(event: any) {
    this.audioPlayer.nativeElement.play();
  }
  rewind10s(event: any) {
    this.audioPlayer.nativeElement.currentTime = Math.max(
      0,
      this.audioPlayer.nativeElement.currentTime - 10
    )
  }
  nextAudio() {
    const i = this.tracklist.indexOf(this.currentTrack);
    if (i < this.tracklist.length - 1) {
      this.selectAudio(i + 1);
    }
  }
  selectAudio(i: number) {
    this.currentTrack = this.tracklist[i];
    const paused = this.audioPlayer.nativeElement.paused;
    this.audioPlayer.nativeElement.load();
    this.currentTime = 0;
    if (!paused) {
      this.audioPlayer.nativeElement.play();
    }

    //
    navigator.mediaSession.metadata = this.getCurrentMediaSessionMetadata()
  }
  getCurrentMediaSessionMetadata() {
    return new MediaMetadata(this.currentTrack)
  }

  ngAfterViewInit(): void {
    this.audioPlayer.nativeElement.ontimeupdate = () => {
      this.currentTime = Math.floor(this.audioPlayer.nativeElement.currentTime)

      localStorage.setItem('time', this.currentTime.toString());
    }
    this.audioPlayer.nativeElement.ondurationchange = () => {
      this.duration = Math.floor(this.audioPlayer.nativeElement.duration)
    }
    this.audioPlayer.nativeElement.onpause = () => {
      // localStorage.setItem('paused', (true).toString());
    }
    this.audioPlayer.nativeElement.onplay = () => {
      localStorage.setItem('track', this.tracklist.indexOf(this.currentTrack).toString());
    }
    this.audioPlayer.nativeElement.currentTime = this.currentTime

    if (navigator.mediaSession) {
      navigator.mediaSession.metadata = this.getCurrentMediaSessionMetadata();

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
        this.nextAudio()
      });
    }
  }
}
