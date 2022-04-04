import React, { useCallback, useLayoutEffect, useRef } from "react";
import { Canvas } from "./Canvas";

export function Plot({
  width,
  height,
  x,
  y,
  xmin = Math.min(...x),
  xmax = Math.max(...x),
  ymin = Math.min(...y),
  ymax = Math.max(...y),
}: {
  width: number;
  height: number;
  x: number[];
  y: number[];
  xmin?: number;
  ymin?: number;
  xmax?: number;
  ymax?: number;
}): JSX.Element {
  const canvasRef = useRef<Canvas | null>(null);
  const canvasElem = useCallback(
    (node: HTMLCanvasElement | null) => {
      if (node && !canvasRef.current) {
        canvasRef.current = new Canvas(
          node.getContext("2d")!,
          { xmin, xmax, ymin, ymax },
          { width, height },
        );
      }
    },
    [width, height, xmin, xmax, ymin, ymax],
  );
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.clear();
      canvas.drawCurve(x, y);
      canvas.drawBox();
      canvas.drawTicks();
    }
  }, [x, y, xmin, xmax, ymin, ymax]);
  return <canvas ref={canvasElem} width={width} height={height} />;
}
