import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import rough from "roughjs";
import { BehaviorSubject, Subject } from "rxjs";
import { Chapter } from "src/app/schema/chapter";

type GpsStatus = "on" | "off" | "error";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
})
export class MapComponent implements AfterViewInit, OnChanges {
  @ViewChild("originalSvg") originalSvg!: ElementRef<SVGElement>;
  @ViewChild("wrapper") wrapper!: ElementRef<HTMLDivElement>;
  outputSvg: SVGSVGElement;
  mapDrawn: boolean = false;

  @Input() chapter?: Chapter;

  gpsStatus = new BehaviorSubject<GpsStatus>("off");
  gpsPosition = new Subject<[number, number]>();

  gpsWatchSubscription?: number;

  constructor(private renderer: Renderer2) {
    this.outputSvg = this.renderer.createElement("svg", "http://www.w3.org/2000/svg");
  }

  async ngAfterViewInit(): Promise<void> {
    this.drawMap();
    this.mapDrawn = true;
    // if (this.trackId) this.flyToPath(this.trackId)
    // this.main()

    setTimeout(() => {
      if (this.chapter) this.flyToPath(this.chapter.pathIndex);
    }, 200);

    // setTimeout(() => {
    //   this.flyToPath(0)
    // }, 5000)
    // setTimeout(() => {
    //   this.flyToPath(3)
    // }, 10000)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["chapter"]) {
      if (this.chapter && this.mapDrawn) this.flyToPath(this.chapter.pathIndex);
      // TODO: if trackId is undefined, fly to map overview
    }
  }

  async flyToPath(index: number) {
    const paths = this.outputSvg.querySelectorAll(".path");
    for (const path of paths) {
      const svgPath = path.querySelector("path");
      if (svgPath) svgPath.style.stroke = "rgba(255,255,255,.1)";
    }
    const realPath = paths[index].querySelector("path");
    if (!realPath) return;
    await this.flyTo(
      realPath,
      {
        top: 200,
        bottom: 150,
        left: 20,
        right: 20,
      },
      2000,
      2000
    );
  }

  drawMap() {
    this.wrapper.nativeElement.appendChild(this.outputSvg);
    const rc = rough.svg(this.outputSvg);

    const allPaths = this.originalSvg.nativeElement.querySelectorAll("path");
    if (!allPaths) return;
    // Loop through the paths in the SVG
    for (let path of allPaths) {
      // Get the d attribute which contains path data
      const pathData = path.getAttribute("d")!;
      const isPath = Array.from(path.classList).includes("cls-1");
      const isWater = Array.from(path.classList).includes("cls-4");
      const isBuilding = Array.from(path.classList).includes("cls-2");

      // if (isWater || isBuilding) continue;
      // Use rough.js to draw a path based on the SVG path data
      const svgpath = rc.path(
        pathData,
        isWater
          ? {
            roughness: 0,
            fill: "rgba(130,192,234,.8)",
            fillStyle: "solid",
            // hachureAngle: 60,
            // stroke: "rgba(130,192,234,0)",
            strokeWidth: 0,
            // hachureGap: 4,
          }
          : isBuilding
            ? {
              roughness: 0.1,
              fill: "rgba(255,255,255,.5)",
              fillStyle: "solid",
              // fillWeight: 0.5,
              // hachureAngle: -60,
              // hachureGap: 2,
              // stroke: "rgba(255,255,255,.75)",
              // strokeWidth: 1,
            }
            : {
              roughness: 0.5,
              stroke: "rgba(255,255,255,0.1)",
              strokeWidth: 4,
            }
      );
      svgpath.classList.add(isWater ? "water" : isBuilding ? "building" : "path");

      this.outputSvg.appendChild(svgpath);
    }
    // const originalSvgBR = this.originalSvg.nativeElement.getBoundingClientRect();
    // this.outputSvg.style.width = originalSvgBR.width + "px";
    // this.outputSvg.style.height = originalSvgBR.height + "px";
  }

  async flyTo(
    targetElement: SVGPathElement,
    padding: { top: number; left: number; bottom: number; right: number },
    duration: number,
    sleep: number
  ) {
    targetElement.style.stroke = "rgba(255,255,255,1)";
    const targetBR = targetElement.getBoundingClientRect();
    const wrapperBR = this.wrapper.nativeElement.getBoundingClientRect();

    let currentScaleTxt = this.outputSvg.style.transform;
    if (!currentScaleTxt) {
      currentScaleTxt = "scale(1)";
    }
    const currentScale = parseFloat(currentScaleTxt.slice(6).slice(0, -1));

    const view = {
      w: wrapperBR.width,
      h: wrapperBR.height,
      cx: wrapperBR.x + wrapperBR.width / 2,
      cy: wrapperBR.y + wrapperBR.height / 2,
    };
    const target = {
      x: targetBR.x,
      y: targetBR.y,
      h: targetBR.height,
      w: targetBR.width,
      cx: targetBR.x + targetBR.width / 2,
      cy: targetBR.y + targetBR.height / 2,
    };

    const scaleX = view.w / (target.w / currentScale + padding.left + padding.right);
    const scaleY = view.h / (target.h / currentScale + padding.top + padding.bottom);
    const finalScale = Math.min(scaleX, scaleY);

    const move = {
      dx: -(target.cx - view.cx) / currentScale,
      dy: -(target.cy - view.cy) / currentScale,
    };

    const fromX = this.outputSvg.style.left ? parseFloat(this.outputSvg.style.left.slice(0, -2)) : 0;
    const fromY = this.outputSvg.style.top ? parseFloat(this.outputSvg.style.top.slice(0, -2)) : 0;
    const toX = Math.round(fromX + move.dx);
    const toY = Math.round(fromY + move.dy);
    this.outputSvg.style.left = toX + "px";
    this.outputSvg.style.top = toY + "px";

    this.outputSvg.style.transitionDuration = duration + "ms";
    this.outputSvg.style.transformOrigin = `${view.cx - toX}px ${view.cy - toY}px`;
    this.outputSvg.style.transform = `scale(${finalScale})`;
  }

  enableGps() {
    this.gpsStatus.next("on");
    if (this.gpsWatchSubscription) navigator.geolocation!.clearWatch(this.gpsWatchSubscription);

    navigator.geolocation!.watchPosition(
      (position) => {
        this.gpsPosition.next(this.transformGpsPosition(position.coords));
      },
      () => {
        this.gpsStatus.next("error");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }

  disableGps() {
    this.gpsStatus.next("off");
    if (this.gpsWatchSubscription) navigator.geolocation!.clearWatch(this.gpsWatchSubscription);
  }

  private transformGpsPosition(coordinates: { latitude: number; longitude: number }) {
    // TODO: transform lat long to x y
    return [0, 0] as [number, number];
  }
}
