import { ActionIcon, Avatar, Badge, Card, Group, Menu, SimpleGrid, Text } from "@mantine/core";
import { useList } from "@refinedev/core";
import { IconDots } from "@tabler/icons-react";
import { DeleteButton } from "../buttons/DeleteButton";
import { EditButton } from "../buttons/EditButton";
import { ShowButton } from "../buttons/ShowButton";
import { Default as DefaultTableStory } from "../table/Table.story";
import { Empty } from "./Empty";
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
  const { result, query: { isLoading } } = useList<UserRecord>({
    resource: "users",
    pagination: {
      pageSize: 100,
    }
  });

  return (
    <List resource="users" isLoading={isLoading}>
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
                    <EditButton menuItem />
                    <ShowButton menuItem />
                    <DeleteButton menuItem />
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
    <DefaultTableStory />
  </List>;

export const Loading = () =>
  <List resource="products" isLoading />;

export const EmptyList = () =>
  <List resource="products">
    <Empty />
  </List>;
