import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
} from "@angular/core";

@Component({
  selector: "app-player",
  templateUrl: "./player.component.html",
  styleUrls: ["./player.component.scss"],
})
export class PlayerComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() title?: string;
  @Input() url?: string;
  @Input() startProgress?: number;
  @Input() autoPlay: boolean = false;

  @Output("next") onNext = new EventEmitter<void>();
  @Output("progress") onProgress = new EventEmitter<number>();

  progress: number = 0;
  status: "playing" | "paused" = "paused";

  totalTime?: number;
  currentTime?: number;

  @ViewChild("audioPlayer") audioPlayer!: ElementRef<HTMLAudioElement>;

  constructor(
    private cdRef: ChangeDetectorRef,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["url"] && changes["url"].currentValue !== changes["url"].previousValue) {
      if (this.audioPlayer) this.loadTrack();
    }
  }

  ngAfterViewInit(): void {
    this.loadTrack();

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

      navigator.mediaSession.setActionHandler("nexttrack", () => {
        this.onNext.emit();
      });

      this.audioPlayer.nativeElement.addEventListener("play", (event) => {
        this.status = "playing";
      });

      this.audioPlayer.nativeElement.addEventListener("pause", (event) => {
        this.status = "paused";
      });

      this.audioPlayer.nativeElement.addEventListener("ended", (event) => {
        this.status = "paused";
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
    this.audioPlayer.nativeElement.removeEventListener("play", () => { });
    this.audioPlayer.nativeElement.removeEventListener("pause", () => { });
    this.audioPlayer.nativeElement.removeEventListener("ended", () => { });
    this.audioPlayer.nativeElement.removeEventListener("timeupdate", () => { });
  }

  async loadTrack() {
    console.log("loadTrack")
    console.log(this.url)
    if (this.url) {
      this.audioPlayer.nativeElement.src = this.url;
      this.audioPlayer.nativeElement.load();
      this.progress = 0;
      this.currentTime = 0;
      this.status = "paused";

      navigator.mediaSession.metadata = new MediaMetadata({
        title: this.title ?? "Track",
        album: "Studentská revolta '89",
      });

      this.cdRef.detectChanges();

      if (this.startProgress) this.audioPlayer.nativeElement.currentTime = this.startProgress;
      if (this.autoPlay) await this.play();
    } else {
      this.pause();

      this.audioPlayer.nativeElement.src = "";
      navigator.mediaSession.playbackState = "paused";
      navigator.mediaSession.metadata = null;
    }
  }

  async playPause() {
    if (this.status === "paused") {
      this.play();
    } else {
      this.pause();
    }
  }

  async play() {
    console.log("log 1")
    try {
      await this.audioPlayer.nativeElement.play();
    } catch (err) {
      console.log(err)
    }
    console.log("log 2")
    navigator.mediaSession.playbackState = "playing";
  }

  pause() {
    this.audioPlayer.nativeElement.pause();
    navigator.mediaSession.playbackState = "paused";
  }

  rewind() {
    this.audioPlayer.nativeElement.currentTime = Math.max(0, this.audioPlayer.nativeElement.currentTime - 10);
  }
}
