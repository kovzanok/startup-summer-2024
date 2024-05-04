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

export const roundVotesCount = (count: number): string | number => {
  switch (true) {
    case count / 1000000 >= 1:
      return `${(count / 1000000).toFixed(1)}M`;
    case count / 1000 >= 1:
      return `${Math.round(count / 1000)}K`;
    default:
      return count;
  }
};
