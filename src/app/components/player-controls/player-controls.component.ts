import { Component, EventEmitter, Input, Output } from "@angular/core";
import { PlayerStatus } from "../player/player.component";

@Component({
  selector: "app-player-controls",
  templateUrl: "./player-controls.component.html",
  styleUrls: ["./player-controls.component.scss"],
})
export class PlayerControlsComponent {
  @Input() showMenu?: boolean = false;
  @Input() status: PlayerStatus = PlayerStatus.paused;

  @Output() playpause = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  @Output() rewind = new EventEmitter<void>();
  @Output() menu = new EventEmitter<void>();
}
