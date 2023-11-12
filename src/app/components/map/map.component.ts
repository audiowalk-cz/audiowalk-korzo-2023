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
import { UntilDestroy } from "@ngneat/until-destroy";
import rough from "roughjs";
import { map } from "rxjs";
import { Chapter } from "src/app/schema/chapter";
import { LocationService } from "src/app/services/location.service";

@UntilDestroy()
@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
})
export class MapComponent implements AfterViewInit, OnChanges {
  // @ViewChild("originalSvg") originalSvg!: ElementRef<SVGElement>;
  @ViewChild("wrapper") wrapper!: ElementRef<HTMLDivElement>;
  // @ViewChild('outputCanvas') outputCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild("outputGps") outputGps!: ElementRef<SVGElement>;
  @ViewChild("outputSvg") outputSvg!: ElementRef<SVGSVGElement>;
  // @ViewChild('outputSvgClone') outputSvgClone!: ElementRef<SVGSVGElement>;
  @ViewChild("mapImg") mapImg!: ElementRef<HTMLImageElement>;
  ngViewInited: boolean = false;
  lastFlyToIndex: number | null = null;

  mapSize = {
    height: 1504.5,
    width: 1301.75,
  };

  currentView = {
    scale: 1,
    tX: 0,
    tY: 0,
  };

  @Input() chapter?: Chapter;

  gpsPosition = this.locationService.gpsPosition.pipe(
    map((pos) => (pos ? this.transformGpsPosition(pos.coords) : null))
  );

  gpsPosNormal1 = this.transformGpsPosition({ longitude: 14.4190303, latitude: 50.0863744, heading: null });
  gpsPosNormal2 = this.transformGpsPosition({ longitude: 14.4157847, latitude: 50.0823156, heading: null });

  constructor(private renderer: Renderer2, private locationService: LocationService) {}

  async ngAfterViewInit(): Promise<void> {
    // this.wrapper.nativeElement.style.transition = "opacity 1s ease-in-out";
    setTimeout(() => {
      this.wrapper.nativeElement.classList.add("active");
      this.ngViewInited = true;
      this.flyToPathIfNeccesary();
    }, 500);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["chapter"]) {
      this.flyToPathIfNeccesary();
    }
  }

  async flyToPathIfNeccesary() {
    if (!this.chapter || this.lastFlyToIndex === this.chapter?.pathIndex || !this.ngViewInited) return;
    this.lastFlyToIndex = this.chapter.pathIndex;
    this.flyToPath(this.chapter.pathIndex);
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
      2500,
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

      const svgCircle = rc.circle(allCircles[i].cx.baseVal.value, allCircles[i].cy.baseVal.value, 20, {
        roughness: 0.3,
        fill: "rgba(255,255,255,0)",
        fillStyle: "solid",
        // stroke: "rgba(255,255,255,0.1)",
        strokeWidth: 0,
      });
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

    // let currentScaleTxt = this.outputSvg.nativeElement.style.transform;
    // if (!currentScaleTxt) {
    //   currentScaleTxt = "scale(1)";
    // }
    const currentScale = this.currentView.scale;

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
    this.currentView.scale = finalScale;

    const move = {
      dx: -(target.cx - view.cx) / currentScale,
      dy: -(target.cy - view.cy) / currentScale,
    };

    const fromX = this.currentView.tX;
    const fromY = this.currentView.tY;
    const toX = Math.round(fromX + move.dx);
    const toY = Math.round(fromY + move.dy);

    const style = {
      transtionDuration: duration + "ms",
      transformOrigin: `${view.cx - toX}px ${view.cy - toY}px`,
      // transformOrigin: `${view.cx - toX}px ${view.cy - toY}px`,
      // transform: `scale(${finalScale})`,
      transform: `matrix(${finalScale}, 0, 0, ${finalScale}, ${toX}, ${toY})`,
    };

    this.currentView.tX = toX;
    this.currentView.tY = toY;

    console.log(style.transform);

    // this.outputSvg.nativeElement.style.left = style.left;
    // this.outputSvg.nativeElement.style.top = style.top;
    this.outputSvg.nativeElement.style.transitionDuration = style.transtionDuration;
    this.outputSvg.nativeElement.style.transformOrigin = style.transformOrigin;
    this.outputSvg.nativeElement.style.transform = style.transform;

    // this.outputCanvas.nativeElement.style.left = style.left;
    // this.outputCanvas.nativeElement.style.top = style.top;
    // this.outputCanvas.nativeElement.style.transitionDuration = style.transtionDuration;
    // this.outputCanvas.nativeElement.style.transformOrigin = style.transformOrigin;
    // this.outputCanvas.nativeElement.style.transform = style.transform;

    // this.outputGps.nativeElement.style.left = style.left;
    // this.outputGps.nativeElement.style.top = style.top;
    this.outputGps.nativeElement.style.transitionDuration = style.transtionDuration;
    this.outputGps.nativeElement.style.transformOrigin = style.transformOrigin;
    this.outputGps.nativeElement.style.transform = style.transform;

    // this.mapImg.nativeElement.style.left = style.left;
    // this.mapImg.nativeElement.style.top = style.top;
    this.mapImg.nativeElement.style.transitionDuration = style.transtionDuration;
    this.mapImg.nativeElement.style.transformOrigin = style.transformOrigin;
    this.mapImg.nativeElement.style.transform = style.transform;
  }

  private transformGpsPosition(
    coords: Pick<GeolocationCoordinates, "latitude" | "longitude" | "heading">
  ): [number, number, number | null] {
    const bounds = {
      left: 14.3976,
      right: 14.4386,
      top: 50.0997,
      bottom: 50.0677,
    };

    const x = Math.round((this.mapSize.width * (coords.longitude - bounds.left)) / (bounds.right - bounds.left));
    const y = Math.round(
      this.mapSize.height - (this.mapSize.height * (coords.latitude - bounds.bottom)) / (bounds.top - bounds.bottom)
    );
    const heading = coords.heading || null;

    return [x, y, heading];
  }
}
