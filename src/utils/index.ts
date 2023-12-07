import { DataExport } from '../types';

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function generateNumberArray(from: number, to: number): number[] {
  const array = [];
  for (let i = from; i <= to; i++) {
    array.push(i);
  }
  return array;
}

export function sortByTimeStamp(array: DataExport[], sortBy: 'desc' | 'asc') {
  if (sortBy == 'desc') {
    return array.sort((a, b) => b?.timestamp?.unix() - a?.timestamp?.unix());
  }
  if (sortBy == 'asc') {
    return array.sort((a, b) => a?.timestamp?.unix() - b?.timestamp?.unix());
  }
  return array;
}
