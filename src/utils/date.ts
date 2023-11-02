const dateParts = (dt: Date): string[] => {
  const Y = dt.getUTCFullYear().toString();
  const M = ('00' + (dt.getUTCMonth() + 1)).slice(-2);
  const D = ('00' + dt.getUTCDate()).slice(-2);
  const h = ('00' + dt.getUTCHours()).slice(-2);
  const m = ('00' + dt.getUTCMinutes()).slice(-2);
  const s = ('00' + dt.getUTCSeconds()).slice(-2);
  return [Y, M, D, h, m, s];
};

export const getDate = (timestamp: Date) => {
  return dateParts(timestamp).slice(0, 3).join('/');
};

export const getTime = (timestamp: Date) => {
  return dateParts(timestamp).slice(3).join(':');
};

export const getMonthDate = (timestamp: Date) => {
  return dateParts(timestamp).slice(0, 2).join('');
};
