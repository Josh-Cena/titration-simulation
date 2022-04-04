import React from "react";
import { range } from "./math";
import { Plot } from "./Plot";

const x = range(0, 4, 50000);
const y = x.map((v) => v ** 2);

export function App(): JSX.Element {
  return <Plot width={600} height={400} x={x} y={y} />;
}
