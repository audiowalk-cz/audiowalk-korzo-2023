enum easingFnType {
  linear,
  easeInOutQuad,
  easeOut,
  sinHalf,
};

export class SMAnimation {
  sleep: number;
  currentScale: number;
  finalScale: number;
  target: SVGSVGElement;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  duration: number;
  onend: any;
  wrapperCenter: any;
  start = 0;
  last = 0;
  minDiff = 2;
  running = false;
  easingFn = easingFnType.easeInOutQuad;
  easingFnLibrary: Record<easingFnType, any> = {
    [easingFnType.linear]: (x: number) => x,
    [easingFnType.easeOut]: (x: number) => 1 - Math.pow(1 - x, 3),
    [easingFnType.easeInOutQuad]: (x: number) => x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2,
    [easingFnType.sinHalf]: (x: number) => Math.sin(x * Math.PI),
  };
  constructor(
    wrapper: HTMLElement,
    target: SVGSVGElement,
    dX: number,
    dY: number, currentScale: number, finalScale: number, duration: number, sleep: number,
    onend: any) {
    this.sleep = sleep;
    this.currentScale = currentScale;
    this.finalScale = finalScale;
    this.target = target;
    this.fromX = target.style.left ? parseFloat(target.style.left.slice(0, -2)) : 0;
    this.fromY = target.style.top ? parseFloat(target.style.top.slice(0, -2)) : 0;
    this.toX = this.fromX + dX;
    this.toY = this.fromY + dY;
    this.duration = duration;
    this.onend = onend;
    this.wrapperCenter = {
      x: wrapper.getBoundingClientRect().width / 2,
      y: wrapper.getBoundingClientRect().height / 2,
    }
  }
  now() {
    return new Date().valueOf();
  }
  run() {
    this.start = this.now();
    this.running = true;
    this.tick();
    return this;
  }
  tick() {
    if (!this.running) return
    const now = this.now();
    const diff = now - this.start;
    if (diff > this.duration) {
      this.running = false;

      setTimeout(() => {
        this.onend()
      }, this.sleep)
    }

    if (this.running) {
      const diffFromLast = now - this.last;
      if (diffFromLast < this.minDiff) {
        setTimeout(() => {
          window.requestAnimationFrame(() => this.tick());
        }, this.minDiff)
      } else {
        this.last = now;
        const progress = diff / this.duration;
        const easedProgress = this.easingFnLibrary[this.easingFn](progress)
        const currX = (this.toX - this.fromX) * easedProgress + this.fromX;
        const currY = (this.toY - this.fromY) * easedProgress + this.fromY;
        this.target.style.left = `${currX}px`;
        this.target.style.top = `${currY}px`;
        this.target.style.transformOrigin = `${this.wrapperCenter.x - currX}px ${this.wrapperCenter.y - currY}px`;
        const scaleFactor = this.currentScale + (this.finalScale - this.currentScale) * easedProgress;
        this.target.style.transform = `scale(${scaleFactor})`;
        window.requestAnimationFrame(() => this.tick());
      }
    }
  }
}
