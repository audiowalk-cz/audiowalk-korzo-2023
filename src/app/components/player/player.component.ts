import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { Track } from "src/app/schema/track";
import { AudioService } from "src/app/services/audio.service";

@Component({
  selector: "app-player",
  templateUrl: "./player.component.html",
  styleUrls: ["./player.component.scss"],
})
export class PlayerComponent implements AfterViewInit, OnChanges {
  @Input() track?: Track;

  @Output() next = new EventEmitter<void>();

  progress: number = 0;
  status: "playing" | "paused" = "paused";

  totalTime?: number;
  currentTime?: number;

  @ViewChild("audioPlayer") audioPlayer!: ElementRef<HTMLAudioElement>;

  constructor(private audioService: AudioService, private cdRef: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["track"]) {
      if (this.audioPlayer) this.updateTrack(this.track);
    }
  }

  ngAfterViewInit(): void {
    this.updateTrack(this.track);

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
        this.next.emit();
      });

      this.audioPlayer.nativeElement.addEventListener("timeupdate", (event) => {
        if (this.audioPlayer.nativeElement.duration) {
          this.currentTime = this.audioPlayer.nativeElement.currentTime;
          this.totalTime = this.audioPlayer.nativeElement.duration;
          this.progress = this.audioPlayer.nativeElement.currentTime / this.audioPlayer.nativeElement.duration;
          this.cdRef.markForCheck();
        }
      });
    }
  }

  async updateTrack(track?: Track) {
    if (track) {
      this.audioPlayer.nativeElement.src = track.url;
      this.audioPlayer.nativeElement.load();

      navigator.mediaSession.metadata = new MediaMetadata({
        title: track.title,
        album: "Studentská revolta '89",
      });
    } else {
      this.audioPlayer.nativeElement.pause();
      this.audioPlayer.nativeElement.src = "";
      navigator.mediaSession.playbackState = "paused";
      this.status = "paused";
    }
  }

  async play() {
    await this.audioPlayer.nativeElement.play();
    navigator.mediaSession.playbackState = "playing";
    this.status = "playing";
  }

  pause() {
    this.audioPlayer.nativeElement.pause();
    navigator.mediaSession.playbackState = "paused";
    this.status = "paused";
  }

  rewind() {
    this.audioPlayer.nativeElement.currentTime = Math.max(0, this.audioPlayer.nativeElement.currentTime - 10);
  }
}
