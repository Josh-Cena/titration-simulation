function broadcast(
  arr1: number[],
  arr2: number[],
  cb: (v1: number, v2: number) => number,
) {
  if (arr1.length !== arr2.length) throw new Error("Length mismatch");
  return arr1.map((v, i) => cb(v, arr2[i]));
}

export function mul(arr1: number[], arr2: number[]): number[] {
  return broadcast(arr1, arr2, (a, b) => a * b);
}

export function add(arr1: number[], arr2: number[]): number[] {
  return broadcast(arr1, arr2, (a, b) => a + b);
}

export function range(start: number, end: number, cnt: number): number[] {
  const int = (end - start) / cnt;
  return Array.from({ length: cnt }, (v, i) => start + i * int);
}
