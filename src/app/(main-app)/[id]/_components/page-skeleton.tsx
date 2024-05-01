import { Breadcrumbs, Card, Flex, Skeleton } from "@mantine/core";

export function PageSkeleton() {
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
