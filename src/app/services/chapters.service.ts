import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Chapters } from "../data/chapters";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
  providedIn: "root",
})
export class ChaptersService {
  currentChapter = new BehaviorSubject<number | null>(null);

  constructor(private localStorage: LocalStorageService) {
    this.getCurrentChapter().then((chapter) => this.currentChapter.next(chapter));
  }

  getChapters() {
    return Chapters;
  }

  async getCurrentChapter(): Promise<number | null> {
    const chapter = await this.localStorage.get("chapter");
    return chapter ? parseInt(chapter) : null;
  }

  async saveCurrentChapter(chapter: number) {
    this.currentChapter.next(chapter);
    await this.localStorage.set("chapter", chapter);
  }
}
