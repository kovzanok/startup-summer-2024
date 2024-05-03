import { Flex, Image, Text, Title, useMantineTheme } from "@mantine/core";
import NextImage from "next/image";

import companyPlaceholder from "@/../public/production-company-placeholder.png";
import { ProductionCompany } from "@/shared/types";

type CompaniesListProps = { companies: ProductionCompany[] };

export function CompaniesList({ companies }: CompaniesListProps) {
  const theme = useMantineTheme();
  return (
    <>
      <Title order={4} fz={20} mb={16}>
        Production
      </Title>
      <Flex direction="column" rowGap={12}>
        {companies.map(({ id: companyId, name, logo_path }) => (
          <Flex key={companyId} columnGap={8} align="center">
            <Image
              style={{ border: `1px solid ${theme.colors.slate[3]}` }}
              component={NextImage}
              w={40}
              miw={40}
              width={40}
              h={40}
              height={40}
              radius="100%"
              fit="scale-down"
              src={`${process.env.NEXT_PUBLIC_IMAGE_SRC}/w500${logo_path}`}
              fallbackSrc={companyPlaceholder.src}
              alt={name}
            />
            <Text fw={700}>{name}</Text>
          </Flex>
        ))}
      </Flex>
    </>
  );
}
