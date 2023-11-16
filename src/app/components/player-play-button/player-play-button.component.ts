import { Component, EventEmitter, Input, Output } from "@angular/core";
import { PlayerStatus } from "../player/player.component";

@Component({
  selector: "app-player-play-button",
  templateUrl: "./player-play-button.component.html",
  styleUrls: ["./player-play-button.component.scss"],
})
export class PlayerPlayButtonComponent {
  @Input() status: PlayerStatus = PlayerStatus.paused;
  @Output() playpause = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();

  buttonTouching: boolean = false;

  onTouchStart() {
    this.buttonTouching = true;
  }

  onTouchEnd() {
    this.buttonTouching = false;
  }
}
