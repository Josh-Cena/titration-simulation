import { range } from "./math";

type Limits = { xmin: number; xmax: number; ymin: number; ymax: number };
type Dimensions = { width: number; height: number };
type Point = [x: number, y: number];

export class Canvas {
  public ctx;
  public xmin!: number;
  public xmax!: number;
  public ymin!: number;
  public ymax!: number;
  public width!: number;
  public height!: number;
  public xticks: number[];
  public yticks: number[];
  constructor(ctx: CanvasRenderingContext2D, limits: Limits, dim: Dimensions) {
    this.ctx = ctx;
    Object.assign(this, limits);
    Object.assign(this, dim);
    this.xticks = range(this.xmin, this.xmax, 5);
    this.yticks = range(this.ymin, this.ymax, 5);
  }

  private scalePoint([x, y]: Point) {
    return [
      ((x - this.xmin) / (this.xmax - this.xmin)) * this.width,
      ((this.ymax - y) / (this.ymax - this.ymin)) * this.height,
    ] as const;
  }

  private moveTo(point: Point) {
    this.ctx.moveTo(...this.scalePoint(point));
  }

  private lineTo(point: Point) {
    this.ctx.lineTo(...this.scalePoint(point));
  }

  public drawCurve(x: number[], y: number[]): void {
    const [x0, ...xr] = x;
    const [y0, ...yr] = y;
    this.moveTo([x0, y0]);
    xr.forEach((v, i) => {
      this.lineTo([v, yr[i]]);
    });
    this.ctx.stroke();
  }

  public clear(): void {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  public drawBox(): void {
    const {xmin, xmax, ymin, ymax} = this;
    this.drawCurve([xmin, xmax, xmax, xmin, xmin], [ymin, ymin, ymax, ymax, ymin]);
  }

  public drawTicks(): void {
    this.xticks.forEach((x) => {
      this.ctx.moveTo(((x - this.xmin) / (this.xmax - this.xmin)) * this.width, this.height);
      this.ctx.lineTo(((x - this.xmin) / (this.xmax - this.xmin)) * this.width, this.height - 5);
      this.ctx.stroke();
    });

    this.yticks.forEach((y) => {
      this.ctx.moveTo(0, ((this.ymax - y) / (this.ymax - this.ymin)) * this.height);
      this.ctx.lineTo(5, ((this.ymax - y) / (this.ymax - this.ymin)) * this.height);
      this.ctx.stroke();
    });
  }
}
