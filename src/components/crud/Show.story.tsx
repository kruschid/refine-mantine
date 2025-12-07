import { ButtonGroup, getThemeColor, Text, Title, useMantineTheme } from "@mantine/core";
import { useShow } from "@refinedev/core";
import { Meta } from "@storybook/react";
import { CloneButton } from "../buttons/CloneButton";
import { DeleteButton } from "../buttons/DeleteButton";
import { EditButton } from "../buttons/EditButton";
import { RefreshButton } from "../buttons/RefreshButton";
import { BooleanField } from "../fields/BooleanField";
import { EmailField } from "../fields/EmailField";
import { Show } from "./Show";

interface UsersRecord {
  id: number;
  email: string;
  firstName: string,
  lastName: string;
  skills: string[];
  status: boolean;
}

export default {
  title: 'Crud/Show',
  component: Show,
} satisfies Meta<typeof Show>;

export const Default = () => {
  const { query } = useShow<UsersRecord>({
    resource: "users",
    id: 1
  });
  const user = query.data?.data;

  const theme = useMantineTheme();

  return (
    <Show
      isLoading={query.isPending}
      headerButtons={() =>
        <ButtonGroup>
          <RefreshButton />
          <CloneButton />
          <EditButton />
          <DeleteButton />
        </ButtonGroup>
      }
    >
      {user && (
        <>
          <Title order={5}>
            Email
          </Title>
          <EmailField value={user.email} />
          <Title order={5} mt="sm">
            First name
          </Title>
          <Text>{user.firstName}</Text>
          <Title order={5} mt="sm">
            Last name
          </Title>
          <Text>{user.lastName}</Text>
          <Title order={5} mt="sm">
            Skills
          </Title>
          <Title order={5} mt="sm">
            Status
          </Title>
          <BooleanField
            value={user.status}
            trueLabel="active"
            falseLabel="inactive"
            falseIconProps={{color: getThemeColor("red", theme)}}
            iconProps={{color: getThemeColor("green", theme)}}
          />
        </>
      )}
    </Show>
  );
}

