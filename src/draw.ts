function scaleX(x: number, min: number, max: number, dim: number) {
  return ((x - min) / (max - min)) * dim;
}

function scaleY(y: number, min: number, max: number, dim: number) {
  return ((max - y) / (max - min)) * dim;
}

export function drawCurve(
  ctx: CanvasRenderingContext2D,
  x: number[],
  y: number[],
  {
    xmin,
    xmax,
    ymin,
    ymax,
    width,
    height,
  }: {
    xmin: number;
    ymin: number;
    xmax: number;
    ymax: number;
    width: number;
    height: number;
  },
): void {
  const [x0, ...xr] = x;
  const [y0, ...yr] = y;
  ctx.moveTo(scaleX(x0, xmin, xmax, width), scaleY(y0, ymin, ymax, height));
  xr.forEach((v, i) => {
    ctx.lineTo(scaleX(v, xmin, xmax, width), scaleY(yr[i], ymin, ymax, height));
    ctx.fillRect(
      scaleX(v, xmin, xmax, width) - 3,
      scaleY(yr[i], ymin, ymax, height) - 3,
      6,
      6,
    );
  });
  ctx.stroke();
}
