export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function generateNumberArray(from: number, to: number) {
  const array = [];
  for (let i = from; i <= to; i++) {
    array.push(i);
  }
  return array;
}
