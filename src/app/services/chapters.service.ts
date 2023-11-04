import { Injectable } from "@angular/core";
import { Chapters } from "../data/chapters";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
  providedIn: "root",
})
export class ChaptersService {
  constructor(private localStorage: LocalStorageService) {}

  getChapters() {
    return Chapters;
  }

  async getCurrentChapter(): Promise<number | null> {
    const chapter = await this.localStorage.get("chapter");
    return chapter ? parseInt(chapter) : null;
  }

  async saveCurrentChapter(chapter: number) {
    await this.localStorage.set("chapter", chapter);
  }
}
