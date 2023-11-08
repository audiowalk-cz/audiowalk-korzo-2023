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

// type GpsStatus = "on" | "off" | "error";
enum GpsStatus {
  "on",
  "off",
  "error"
}

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
})
export class MapComponent implements AfterViewInit, OnChanges {
  // @ViewChild("originalSvg") originalSvg!: ElementRef<SVGElement>;
  @ViewChild("wrapper") wrapper!: ElementRef<HTMLDivElement>;
  // @ViewChild('outputCanvas') outputCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('outputGps') outputGps!: ElementRef<SVGElement>;
  @ViewChild('outputSvg') outputSvg!: ElementRef<SVGSVGElement>;
  // @ViewChild('outputSvgClone') outputSvgClone!: ElementRef<SVGSVGElement>;
  @ViewChild('mapImg') mapImg!: ElementRef<HTMLImageElement>;
  mapDrawn: boolean = false;

  mapSize = {
    height: 1504.5,
    width: 1301.75,
  }

  @Input() chapter?: Chapter;

  GpsStatus = GpsStatus;
  gpsStatus = new BehaviorSubject<GpsStatus>(GpsStatus.off);
  gpsPosition = new Subject<[number, number]>();
  gpsPosNormal1 = this.transformGpsPosition({ longitude: 14.4190303, latitude: 50.0863744 });
  gpsPosNormal2 = this.transformGpsPosition({ longitude: 14.4157847, latitude: 50.0823156 });


  gpsPositionNormal?: [number, number];

  gpsWatchSubscription?: number;

  constructor(private renderer: Renderer2) {
  }

  async ngAfterViewInit(): Promise<void> {
    // this.drawMap();
    this.mapDrawn = true;

    setTimeout(() => {
      if (this.chapter) this.flyToPath(this.chapter.pathIndex);
    }, 200);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["chapter"]) {
      if (this.chapter && this.mapDrawn) this.flyToPath(this.chapter.pathIndex);
      // TODO: if trackId is undefined, fly to map overview
    }
  }

  async flyToPath(index: number) {
    const paths = this.outputSvg.nativeElement.querySelectorAll(".path");
    for (const path of paths) {
      const svgPath = path.querySelector("path");
      if (svgPath) svgPath.style.stroke = "rgba(255,255,255,.1)";
    }
    const circles = this.outputSvg.nativeElement.querySelectorAll(".circle");
    for (const circle of circles) {
      const svgPathCircle = circle.querySelector("path");
      if (svgPathCircle) svgPathCircle.style.fill = "rgba(255,255,255,0)";
    }
    const realPath = paths[index].querySelector("path");
    const realPathCircle = circles[index].querySelector("path");
    if (!realPath || !realPathCircle) return;
    await this.flyTo(
      realPath!,
      realPathCircle,
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
    const rc = rough.svg(this.outputSvg.nativeElement);
    // const rcClone = rough.svg(this.outputSvgClone.nativeElement);
    // const rcCanvas = rough.canvas(this.outputCanvas.nativeElement);

    const allPaths = this.outputSvg.nativeElement.querySelectorAll("path.cls-1");
    // const allWaters = this.outputSvg.nativeElement.querySelectorAll("path.cls-4");
    // const allBuildings = this.outputSvg.nativeElement.querySelectorAll("path.cls-2");
    const allCircles = this.outputSvg.nativeElement.querySelectorAll("circle");

    if (!allPaths) return;
    if (!allCircles) return;
    // Loop through the paths in the SVG
    // for (let [i, path] of allWaters.entries()) {
    //   const pathData = path.getAttribute("d")!;
    //   const rcConfig = {
    //     roughness: .5,
    //     fill: "rgba(130,192,234,.5)",
    //     fillStyle: "solid",
    //     hachureAngle: 60,
    //     stroke: "rgba(130,192,234,0)",
    //     strokeWidth: 0,
    //     hachureGap: 4,
    //   }
    //   rcCanvas.path(pathData, rcConfig);

    //   const svgpath = rcClone.path(pathData, rcConfig);
    //   this.outputSvgClone.nativeElement.appendChild(svgpath);
    // }

    // for (let [i, path] of allBuildings.entries()) {
    //   const pathData = path.getAttribute("d")!;
    //   const rcConfig = {
    //     roughness: .5,
    //     fill: "rgba(255,255,255,.5)",
    //     fillStyle: "cross-hatch",
    //     fillWeight: 0.5,
    //     hachureAngle: -60,
    //     hachureGap: 2,
    //     stroke: "rgba(255,255,255,.75)",
    //     strokeWidth: 1,
    //   };
    //   rcCanvas.path(pathData, rcConfig)

    //   const svgpath = rcClone.path(pathData, rcConfig);
    //   this.outputSvgClone.nativeElement.appendChild(svgpath);
    // }

    for (let [i, path] of allPaths.entries()) {
      const pathData = path.getAttribute("d")!;
      const rcConfig = {
        roughness: 0.3,
        stroke: "rgba(255,255,255,0.1)",
        strokeWidth: 4,
      };
      const svgpath = rc.path(pathData, rcConfig);
      svgpath.classList.add("path");

      this.outputSvg.nativeElement.appendChild(svgpath);

      const svgCircle = rc.circle(
        allCircles[i].cx.baseVal.value,
        allCircles[i].cy.baseVal.value,
        20, {
        roughness: 0.3,
        fill: "rgba(255,255,255,0)",
        fillStyle: "solid",
        // stroke: "rgba(255,255,255,0.1)",
        strokeWidth: 0,
      }
      );
      svgCircle.classList.add("circle");
      this.outputSvg.nativeElement.appendChild(svgCircle);
    }
  }

  async flyTo(
    targetElement: SVGPathElement,
    targetElementCircle: SVGPathElement,
    padding: { top: number; left: number; bottom: number; right: number },
    duration: number,
    sleep: number
  ) {
    targetElement.style.stroke = "rgba(255,255,255,1)";
    targetElementCircle.style.fill = "rgba(255,255,255,1)";

    const targetBR = targetElement.getBoundingClientRect();
    const wrapperBR = this.wrapper.nativeElement.getBoundingClientRect();

    let currentScaleTxt = this.outputSvg.nativeElement.style.transform;
    if (!currentScaleTxt) {
      currentScaleTxt = "scale(1)";
    }
    const currentScale = parseFloat(currentScaleTxt.slice(6).slice(0, -1));

    const view = {
      w: wrapperBR.width,
      h: wrapperBR.height,
      cx: wrapperBR.x + wrapperBR.width / 2,
      cy: wrapperBR.y + (padding.top + (wrapperBR.height - padding.top - padding.bottom) / 2),
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

    const fromX = this.outputSvg.nativeElement.style.left ? parseFloat(this.outputSvg.nativeElement.style.left.slice(0, -2)) : 0;
    const fromY = this.outputSvg.nativeElement.style.top ? parseFloat(this.outputSvg.nativeElement.style.top.slice(0, -2)) : 0;
    const toX = Math.round(fromX + move.dx);
    const toY = Math.round(fromY + move.dy);

    const style = {
      left: toX + "px",
      top: toY + "px",
      transtionDuration: duration + "ms",
      transformOrigin: `${view.cx - toX}px ${view.cy - toY}px`,
      transform: `scale(${finalScale})`,
    }

    this.outputSvg.nativeElement.style.left = style.left;
    this.outputSvg.nativeElement.style.top = style.top;
    this.outputSvg.nativeElement.style.transitionDuration = style.transtionDuration;
    this.outputSvg.nativeElement.style.transformOrigin = style.transformOrigin;
    this.outputSvg.nativeElement.style.transform = style.transform;

    // this.outputCanvas.nativeElement.style.left = style.left;
    // this.outputCanvas.nativeElement.style.top = style.top;
    // this.outputCanvas.nativeElement.style.transitionDuration = style.transtionDuration;
    // this.outputCanvas.nativeElement.style.transformOrigin = style.transformOrigin;
    // this.outputCanvas.nativeElement.style.transform = style.transform;

    this.outputGps.nativeElement.style.left = style.left;
    this.outputGps.nativeElement.style.top = style.top;
    this.outputGps.nativeElement.style.transitionDuration = style.transtionDuration;
    this.outputGps.nativeElement.style.transformOrigin = style.transformOrigin;
    this.outputGps.nativeElement.style.transform = style.transform;

    this.mapImg.nativeElement.style.left = style.left;
    this.mapImg.nativeElement.style.top = style.top;
    this.mapImg.nativeElement.style.transitionDuration = style.transtionDuration;
    this.mapImg.nativeElement.style.transformOrigin = style.transformOrigin;
    this.mapImg.nativeElement.style.transform = style.transform;

  }

  enableGps() {
    this.gpsStatus.next(GpsStatus.on);
    if (this.gpsWatchSubscription) navigator.geolocation!.clearWatch(this.gpsWatchSubscription);

    navigator.geolocation!.watchPosition(
      (position) => {
        this.gpsPositionNormal = this.transformGpsPosition(position.coords)
        this.gpsPosition.next(this.transformGpsPosition(position.coords));
      },
      () => {
        this.gpsStatus.next(GpsStatus.error);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }

  disableGps() {
    this.gpsStatus.next(GpsStatus.off);
    if (this.gpsWatchSubscription) navigator.geolocation!.clearWatch(this.gpsWatchSubscription);
  }

  private transformGpsPosition(
    coordinates: { latitude: number; longitude: number }
  ): [number, number] {
    const bounds = {
      left: 14.3976,
      right: 14.4386,
      top: 50.0997,
      bottom: 50.0677,
    };
    return [
      Math.round(this.mapSize.width * (coordinates.longitude - bounds.left) / (bounds.right - bounds.left)),
      Math.round(this.mapSize.height - this.mapSize.height * (coordinates.latitude - bounds.bottom) / (bounds.top - bounds.bottom)),
    ];
  }
}
