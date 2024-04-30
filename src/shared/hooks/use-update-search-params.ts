import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { createQueryString } from "../lib";

export const useUpdateSearchParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return function updateSearchParams(name: string, value: number | string) {
    router.push(`${pathname}?${createQueryString(searchParams, name, value)}`);
  };
};
