import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class FileStorageService {
  private _db?: IDBDatabase;
  private _version: number = 3;
  private _storeName: string = "storage";

  constructor() {}

  private async getDatabase(): Promise<IDBDatabase> {
    if (!this._db) {
      this._db = await this.createDB();
    }
    return this._db;
  }

  private async createDB(): Promise<IDBDatabase> {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const result = indexedDB.open("audio", this._version);
      result.onsuccess = (event) => {
        resolve((event.target as IDBOpenDBRequest).result);
      };

      result.onerror = (event) => reject((event.target as IDBOpenDBRequest).error);

      result.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        db.createObjectStore(this._storeName);
      };
    });
  }

  async has(key: string): Promise<boolean> {
    return this.get(key).then((value) => value !== null);
  }

  async get<T>(key: string): Promise<T | null> {
    const db = await this.getDatabase();
    return new Promise<T | null>((resolve, reject) => {
      const request = db.transaction(this._storeName).objectStore(this._storeName).get(key);
      request.onsuccess = () => resolve((request.result as T) || null);
      request.onerror = () => reject();
    });
  }

  async put(key: string, value: any) {
    const db = await this.getDatabase();
    return new Promise<void>((resolve, reject) => {
      const request = db.transaction(this._storeName, "readwrite").objectStore(this._storeName).put(value, key);
      request.onsuccess = () => resolve();
      request.onerror = () => reject();
    });
  }

  async delete(key: string) {
    const db = await this.getDatabase();
    return new Promise<void>((resolve, reject) => {
      const request = db.transaction(this._storeName, "readwrite").objectStore(this._storeName).delete(key);
      request.onsuccess = () => resolve();
      request.onerror = () => reject();
    });
  }

  async clear() {
    const db = await this.getDatabase();
    return new Promise<void>((resolve, reject) => {
      const request = db.transaction(this._storeName, "readwrite").objectStore(this._storeName).clear();
      request.onsuccess = () => resolve();
      request.onerror = () => reject();
    });
  }
}
