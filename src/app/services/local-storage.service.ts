import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  constructor() {}

  async get(key: string) {
    return window.localStorage.getItem(key);
  }

  async set(key: string, value: any) {
    return window.localStorage.setItem(key, value);
  }
}
