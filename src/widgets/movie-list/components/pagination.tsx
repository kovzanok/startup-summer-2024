import {
  Flex,
  PaginationControl,
  PaginationNext,
  PaginationPrevious,
  PaginationRoot,
  useMantineTheme,
} from "@mantine/core";
import { usePagination } from "@mantine/hooks";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

import { createQueryString } from "@/shared/lib";

type PaginationProps = { total: number };

export default function Pagination({ total }: PaginationProps) {
  const theme = useMantineTheme();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { next, previous, active, setPage } = usePagination({
    total,
    initialPage: 1,
    page: Number(searchParams.get("page")) || 1,
    onChange(page) {
      router.push(
        `${pathname}?${createQueryString(searchParams, "page", page)}`,
      );
    },
  });
  return (
    <PaginationRoot
      value={active}
      onChange={setPage}
      color={theme.colors.purple[2]}
      total={total}
    >
      <Flex columnGap={8}>
        <PaginationPrevious disabled={active === 1} onClick={previous} />
        {active === 1 && (
          <>
            <PaginationControl active>{active}</PaginationControl>
            <PaginationControl onClick={() => setPage(active + 1)}>
              {active + 1}
            </PaginationControl>
            <PaginationControl onClick={() => setPage(active + 2)}>
              {active + 2}
            </PaginationControl>
          </>
        )}
        {active === total && (
          <>
            <PaginationControl onClick={() => setPage(active - 2)}>
              {active - 2}
            </PaginationControl>
            <PaginationControl onClick={() => setPage(active - 1)}>
              {active - 1}
            </PaginationControl>
            <PaginationControl active>{active}</PaginationControl>
          </>
        )}
        {active !== 1 && active !== total && (
          <>
            <PaginationControl onClick={() => setPage(active - 1)}>
              {active - 1}
            </PaginationControl>
            <PaginationControl active>{active}</PaginationControl>
            <PaginationControl onClick={() => setPage(active + 1)}>
              {active + 1}
            </PaginationControl>
          </>
        )}
        <PaginationNext disabled={active === total} onClick={next} />
      </Flex>
    </PaginationRoot>
  );
}
