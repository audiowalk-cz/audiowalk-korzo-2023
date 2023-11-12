import { Component } from "@angular/core";

@Component({
  selector: "app-pinchable",
  templateUrl: "./pinchable.component.html",
  styleUrls: ["./pinchable.component.scss"],
})
export class PinchableComponent {
  transform: string = "translate(0, 0, 0) scale(1)";

  private initialDistance: number = 0;
  private currentScale: number = 1;

  onTouchStart(e: TouchEvent) {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];

      this.initialDistance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
    }
  }

  onTouchMove(e: TouchEvent) {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];

      const currentDistance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);

      const scaleDelta = currentDistance / this.initialDistance;

      this.transform = `scale(${this.currentScale * scaleDelta})`;
    }
  }

  onTouchEnd() {
    this.initialDistance = 0;
  }
}
