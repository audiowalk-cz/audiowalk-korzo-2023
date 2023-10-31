import { Injectable, EventEmitter } from '@angular/core';

export type loadTrackEvent = {
  trackId: number
}

@Injectable({
  providedIn: 'root'
})
export class SharedEventService {
  public globalLoadTrackEvent: EventEmitter<loadTrackEvent> = new EventEmitter<loadTrackEvent>();

  emitLoadTrackEvent(data: loadTrackEvent) {
    this.globalLoadTrackEvent.emit(data);
  }

  getLoadTrackEvent() {
    return this.globalLoadTrackEvent;
  }
}