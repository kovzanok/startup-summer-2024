export const transformRuntime = (runtime: number): string =>
  `${Math.floor(runtime / 60)}h ${String(runtime % 60).padStart(2, "0")}m`;

export const transformMoneyValue = (val: number): string =>
  `$${val.toLocaleString("en-US")}`;
