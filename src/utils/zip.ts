export function zip<T1, T2>(a1: T1[], a2: T2[]): [T1, T2][] {
  return a1.map((a, idx) => [a, a2[idx]]);
}
