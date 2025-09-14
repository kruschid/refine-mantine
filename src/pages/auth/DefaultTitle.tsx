import { Stack } from "@mantine/core";
import { useRefineOptions } from "@refinedev/core";

export const DefaultTitle = () => {
  const { title } = useRefineOptions();

  return (
    <Stack align="center" mb="lg">
      {title.icon}
      {title.text}
    </Stack>
  );
}