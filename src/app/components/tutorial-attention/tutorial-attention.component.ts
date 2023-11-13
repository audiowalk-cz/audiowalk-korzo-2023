import { Component } from "@angular/core";
import { ChaptersService } from "src/app/services/chapters.service";
import { MediaService } from "src/app/services/media.service";

@Component({
  selector: "app-tutorial-attention",
  templateUrl: "./tutorial-attention.component.html",
  styleUrls: ["./tutorial-attention.component.scss"],
})
export class TutorialAttentionComponent {
  public currentChapter = this.chaptersService.currentChapter;

  public downloadStatus = this.mediaService.downloadStatus;
  public downloadProgress = this.mediaService.downloadProgress;

  constructor(private chaptersService: ChaptersService, private mediaService: MediaService) {}
}
