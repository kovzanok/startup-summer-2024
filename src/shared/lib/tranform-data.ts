export const transformRuntime = (runtime: number): string =>
  `${Math.floor(runtime / 60)}h ${String(runtime % 60).padStart(2, "0")}m`;

export const transformMoneyValue = (val: number): string =>
  `$${val.toLocaleString("en-US")}`;

export const chunk = <T>(array: T[], size: number): T[][] => {
  if (!array.length) {
    return [];
  }
  const head = array.slice(0, size);
  const tail = array.slice(size);
  return [head, ...chunk(tail, size)];
};
