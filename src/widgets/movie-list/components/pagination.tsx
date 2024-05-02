import {
  Flex,
  PaginationControl,
  PaginationNext,
  PaginationPrevious,
  PaginationRoot,
  useMantineTheme,
} from "@mantine/core";
import { usePagination } from "@mantine/hooks";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

import { useUpdateSearchParams } from "@/shared/hooks";

type PaginationProps = { total: number };

export function Pagination({ total }: PaginationProps) {
  const updateSearchParams = useUpdateSearchParams();
  const theme = useMantineTheme();
  const searchParams = useSearchParams();
  const { next, previous, active, setPage } = usePagination({
    total,
    initialPage: 1,
    page: Number(searchParams.get("page")) || 1,
    onChange(page) {
      updateSearchParams("page", page);
    },
  });

  const pageValueArr = useMemo(
    () =>
      new Array(Math.min(total, 3)).fill(0).map((_, idx) => {
        if (active === 1) {
          return active + idx;
        }
        if (active === total) {
          return Math.abs(active - Math.min(total, 3) + idx + 1);
        }
        return active + idx - 1;
      }),
    [total, active],
  );

  return (
    <PaginationRoot
      value={active}
      onChange={setPage}
      color={theme.colors.purple[2]}
      total={total}
    >
      <Flex columnGap={8}>
        <PaginationPrevious disabled={active === 1} onClick={previous} />
        {pageValueArr.map(v => (
          <PaginationControl
            key={v}
            onClick={() => setPage(v)}
            active={v === active}
          >
            {v}
          </PaginationControl>
        ))}
        <PaginationNext disabled={active === total} onClick={next} />
      </Flex>
    </PaginationRoot>
  );
}
