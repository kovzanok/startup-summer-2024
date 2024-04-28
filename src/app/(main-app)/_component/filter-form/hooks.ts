import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { createQueryString, deleteValueFromSearchParams } from "@/shared/lib";

export const useUpdateSearchParamsWithoutPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return function updateSearchParams(name: string, value: number | string) {
    router.push(
      `${pathname}?${createQueryString(deleteValueFromSearchParams(searchParams, "page"), name, value)}`,
    );
  };
};
