import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { Track } from "src/app/schema/track";
import { PlayerMenuComponent } from "../player-menu/player-menu.component";

@Component({
  selector: "app-player",
  templateUrl: "./player.component.html",
  styleUrls: ["./player.component.scss"],
})
export class PlayerComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() track!: Track;
  @Input() startProgress?: number;
  @Input() autoPlay: boolean = false;
  @Input() mode: "light" | "dark" = "dark";

  @Output("progress") onProgress = new EventEmitter<number>();
  @Output("nextChapter") nextChapter = new EventEmitter<void>();

  progress: number = 0;
  status: "playing" | "paused" | "ended" = "paused";
  error?: string;
  offline: boolean = !navigator.onLine;

  showMenu = false;

  totalTime?: number;
  currentTime?: number;

  @ViewChild("audioPlayer") audioPlayer!: ElementRef<HTMLAudioElement>;
  @ViewChild("playPauseButton") playPauseButton!: ElementRef<HTMLButtonElement>;

  @ContentChild(PlayerMenuComponent) menu?: PlayerMenuComponent;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["track"]) {
      if (this.track && this.audioPlayer) this.loadTrack(this.track);
    }
  }

  ngAfterViewInit(): void {
    if (this.track) this.loadTrack(this.track);

    if (navigator.mediaSession) {
      navigator.mediaSession.setActionHandler("play", () => {
        navigator.mediaSession.playbackState = "playing";
        this.audioPlayer.nativeElement.play();
      });

      navigator.mediaSession.setActionHandler("pause", () => {
        navigator.mediaSession.playbackState = "paused";
        this.audioPlayer.nativeElement.pause();
      });

      navigator.mediaSession.setActionHandler("previoustrack", () => {
        this.rewind();
      });

      // navigator.mediaSession.setActionHandler("nexttrack", () => {
      //   this.onNext.emit();
      // });

      this.audioPlayer.nativeElement.addEventListener("play", (event) => {
        this.status = "playing";
      });

      this.audioPlayer.nativeElement.addEventListener("pause", (event) => {
        this.status = "paused";
      });

      this.audioPlayer.nativeElement.addEventListener("ended", (event) => {
        this.status = this.mode === "light" ? "paused" : "ended";
      });

      this.audioPlayer.nativeElement.addEventListener("error", (event) => {
        this.error = "Nastala chyba při přehrávání";
      });

      window.addEventListener("offline", (e) => {
        this.offline = true;
      });

      window.addEventListener("online", (e) => {
        this.offline = false;
      });

      this.audioPlayer.nativeElement.addEventListener("loadedmetadata", (event) => {
        if (this.audioPlayer.nativeElement.duration) {
          this.totalTime = this.audioPlayer.nativeElement.duration;
        }
      });

      this.audioPlayer.nativeElement.addEventListener("timeupdate", (event) => {
        this.currentTime = this.audioPlayer.nativeElement.currentTime;
        this.onProgress.emit(this.currentTime);
        if (this.audioPlayer.nativeElement.duration) {
          this.totalTime = this.audioPlayer.nativeElement.duration;
          this.progress = this.audioPlayer.nativeElement.currentTime / this.audioPlayer.nativeElement.duration;
        }
        this.cdRef.detectChanges();
      });
    }
  }

  ngOnDestroy(): void {
    this.audioPlayer.nativeElement.removeEventListener("play", () => {});
    this.audioPlayer.nativeElement.removeEventListener("pause", () => {});
    this.audioPlayer.nativeElement.removeEventListener("ended", () => {});
    this.audioPlayer.nativeElement.removeEventListener("timeupdate", () => {});

    if (navigator.mediaSession) {
      navigator.mediaSession.setActionHandler("play", null);
      navigator.mediaSession.setActionHandler("pause", null);
      navigator.mediaSession.setActionHandler("previoustrack", null);
      navigator.mediaSession.setActionHandler("nexttrack", null);
      navigator.mediaSession.playbackState = "none";
      navigator.mediaSession.metadata = null;
    }

    this.audioPlayer.nativeElement.pause();
    this.audioPlayer.nativeElement.currentTime = 0;
    this.audioPlayer.nativeElement.src = "";
  }

  async loadTrack(track: Track) {
    if (track.url === this.audioPlayer.nativeElement.src) return;

    this.audioPlayer.nativeElement.src = track.url;
    this.audioPlayer.nativeElement.load();
    this.progress = 0;
    this.currentTime = 0;
    this.status = "paused";

    if (navigator.mediaSession && MediaMetadata) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: track.title ?? "Track",
        album: "Studentská revolta '89",
        artwork: [
          {
            src: "https://studentskarevolta89.cz/assets/img/media-bg.jpg",
            sizes: "512x512",
            type: "image/jpeg",
          },
        ],
      });
    }

    this.cdRef.detectChanges();

    if (track.progress) {
      const setProgress = () => {
        this.audioPlayer.nativeElement.removeEventListener("loadedmetadata", setProgress);
        if (track.progress && track.progress !== this.audioPlayer.nativeElement.duration) {
          this.audioPlayer.nativeElement.currentTime = track.progress;
        }
      };

      this.audioPlayer.nativeElement.addEventListener("loadedmetadata", setProgress);
    }

    if (this.autoPlay) await this.play().catch();
  }

  async playPause() {
    if (this.status === "paused") {
      this.play();
    } else if (this.status === "ended") {
      this.nextChapter.emit();
    } else {
      this.pause();
    }
  }

  async play() {
    await this.audioPlayer.nativeElement.play();
    if (navigator.mediaSession) navigator.mediaSession.playbackState = "playing";
  }

  pause() {
    this.audioPlayer.nativeElement.pause();
    if (navigator.mediaSession) navigator.mediaSession.playbackState = "paused";
  }

  restart() {
    this.audioPlayer.nativeElement.currentTime = 0;
  }

  rewind() {
    this.audioPlayer.nativeElement.currentTime = Math.max(0, this.audioPlayer.nativeElement.currentTime - 10);
  }

  touchStart() {
    console.log("touch");
    this.playPauseButton.nativeElement.classList.add("hover");
  }
  touchEnd() {
    console.log("touchend");
    this.playPauseButton.nativeElement.classList.remove("hover");
  }
}
