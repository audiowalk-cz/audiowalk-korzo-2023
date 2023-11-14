import { Component, Input } from "@angular/core";
import { Chapter } from "src/app/schema/chapter";

@Component({
  selector: "app-chapter-info",
  templateUrl: "./chapter-info.component.html",
  styleUrls: ["./chapter-info.component.scss"],
})
export class ChapterInfoComponent {
  @Input() chapter!: Chapter;
  @Input() chapterIndex!: number;
  @Input() chapterCount!: number;
  showPhoto = false;
}
