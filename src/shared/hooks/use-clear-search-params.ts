import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { deleteValueFromSearchParams } from "../lib";

export const useClearSearchParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return function clear(names: string[]) {
    const newSearchParams = names.reduce<URLSearchParams>(
      (query, name) => deleteValueFromSearchParams(query, name),
      searchParams,
    );
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };
};
