import { Breadcrumbs, Card, Flex, Skeleton } from "@mantine/core";
import { useDocumentTitle } from "@mantine/hooks";

export function PageSkeleton() {
  useDocumentTitle("Loading...");
  return (
    <Card p={24}>
      <Flex direction="column" rowGap={20}>
        <Breadcrumbs>
          <Skeleton width={48} height={20} />
          <Skeleton width={101} height={20} />
        </Breadcrumbs>
        <Skeleton width="100%" height={400} />
      </Flex>
    </Card>
  );
}
