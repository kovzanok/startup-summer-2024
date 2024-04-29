import { createFormContext } from "@mantine/form";

import { FormValues } from "./types";

export const [FormProvider, useFormContext, useForm] =
  createFormContext<FormValues>();
