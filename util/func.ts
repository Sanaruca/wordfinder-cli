export function factorizate(num: number) {
  num = Math.floor(num);
  return Array.range(1, num - 1).reduce((acc, n) => n * acc);
}
