import { ActionIcon, Avatar, Badge, Card, Group, Menu, SimpleGrid, Text } from "@mantine/core";
import { useList } from "@refinedev/core";
import { IconDots, IconEye, IconPencil, IconTrash } from "@tabler/icons-react";
import { Default } from "../table/Table.story";
import { List } from "./List";

export default {
  title: 'Crud/List',
  component: List,
};

interface UserRecord {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  status: boolean;
  birthday: string;
  skills: string[];
}

export const Cards = () => {
  const { result } = useList<UserRecord>({
    resource: "users",
    pagination: {
      pageSize: 100,
    }
  });

  return (
    <List resource="users">
      <SimpleGrid cols={{
        xs: 1,
        sm: 3,
        md: 4,
        lg: 5,
        xl: 6,
      }}>
        {result.data.map(user => (
          <Card key={user.id} withBorder padding="lg" radius="md">
            <Card.Section withBorder inheritPadding py="xs" mb="md">
              <Group justify="space-between" wrap="nowrap">
                <Text fw={500} truncate>{user.email}</Text>
                <Menu withinPortal position="bottom-end" shadow="sm">
                  <Menu.Target>
                    <ActionIcon variant="subtle" color="gray">
                      <IconDots size={16} />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item leftSection={<IconPencil size={14} />}>
                      Edit
                    </Menu.Item>
                    <Menu.Item leftSection={<IconEye size={14} />}>
                      Show
                    </Menu.Item>
                    <Menu.Item
                      leftSection={<IconTrash size={14} />}
                      color="red"
                    >
                      Delete
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>
            </Card.Section>
            <Group justify="space-between">
              <Avatar>{user.firstName[0]}{user.lastName[0]}</Avatar>
              {user.status ? (
                <Badge c="green" variant="light">active</Badge>
              ) : (
                <Badge c="red" variant="light">inactive</Badge>
              ) }
            </Group>

            <Text fz="lg" fw={500} mt="md">
              {user.firstName} {user.lastName}
            </Text>
            <Text fz="sm" c="dimmed" mt={5}>
              {new Date(user.birthday).toDateString()}
            </Text>

            <Text c="dimmed" fz="sm" mt="md">
              {user.skills.map(skill =>
                <Badge key={skill} variant="default" me="2">{skill}</Badge>
              )}
            </Text>
          </Card>
        ))}
      </SimpleGrid>
    </List>
  );
}

export const Table = () => 
  // see Tables/Table for further details
  <List resource="products">
    <Default />
  </List>;
