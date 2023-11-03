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
import { SMAnimation } from "./helpers/SMAnimation";

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

  @Input() trackId?: number = 0;

  gpsStatus = new BehaviorSubject<GpsStatus>("off");
  gpsPosition = new Subject<[number, number]>();

  gpsWatchSubscription?: number;

  constructor(private renderer: Renderer2) {
    this.outputSvg = this.renderer.createElement("svg", "http://www.w3.org/2000/svg");
  }

  ngAfterViewInit(): void {
    this.drawMap();
    // this.main()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["trackId"]) {
      if (this.trackId !== undefined) this.flyToPath(this.trackId);
      // TODO: if trackId is undefined, fly to map overview
    }
  }

  async main() {
    const paths = this.outputSvg.querySelectorAll(".path");
    for (let path of paths) {
      const realPath = path.querySelector("path");
      if (!realPath) continue;
      realPath.style.stroke = `green`;
      await this.flyTo(
        realPath,
        {
          top: 250,
          bottom: 250,
          left: 20,
          right: 20,
        },
        2000,
        2000
      );
      realPath.style.stroke = `blue`;
    }
  }
  async flyToPath(index: number) {
    const paths = this.outputSvg.querySelectorAll(".path");
    const realPath = paths[index].querySelector("path");
    if (!realPath) return;
    realPath.style.stroke = `green`;
    await this.flyTo(
      realPath,
      {
        top: 50,
        bottom: 50,
        left: 20,
        right: 20,
      },
      2000,
      2000
    );
    realPath.style.stroke = `white`;
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
              roughness: 1,
              fill: "rgba(130,192,234,.8)",
              fillStyle: "zigzag",
              hachureAngle: 60,
              stroke: "rgba(130,192,234,0)",
              strokeWidth: 1,
              hachureGap: 4,
            }
          : isBuilding
          ? {
              roughness: 0.5,
              fill: "rgba(255,255,255,.5)",
              fillStyle: "cross-hatch",
              fillWeight: 0.5,
              hachureAngle: -60,
              hachureGap: 2,
              stroke: "rgba(255,255,255,.75)",
              strokeWidth: 1,
            }
          : {
              roughness: 0.8,
              stroke: "rgba(255,10,10,1)",
              strokeWidth: 4,
            }
      );
      svgpath.classList.add(isWater ? "water" : isBuilding ? "building" : "path");

      this.outputSvg.appendChild(svgpath);
    }
  }

  async flyTo(
    targetElement: Element,
    padding: { top: number; left: number; bottom: number; right: number },
    duration: number,
    sleep: number
  ) {
    const targetBR = targetElement.getBoundingClientRect();
    const wrapperBR = this.wrapper.nativeElement.getBoundingClientRect();

    let currentScaleTxt = this.outputSvg.style.transform;
    if (!currentScaleTxt) {
      currentScaleTxt = "scale(1)";
    }
    const currentScale = parseFloat(currentScaleTxt.slice(6).slice(0, -1));
    console.log(currentScale);

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

    await new Promise<void>((res) => {
      const an1 = new SMAnimation(
        this.wrapper.nativeElement,
        this.outputSvg,
        move.dx,
        move.dy,
        currentScale,
        finalScale,
        duration,
        sleep,
        () => {
          res();
        }
      ).run();
    });
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
