import {
  ActionIcon,
  type ActionIconProps,
  Button,
  type ButtonProps,
  Group,
  Notification,
  type NotificationProps,
  RingProgress,
  Text,
} from "@mantine/core";
import { IconArrowBackUp } from "@tabler/icons-react";

export interface MessageProps {
  undoableTimeout?: number;
  undoableTime?: number;
  message: string;
  description?: string;
  undoLabel?: string;
  notificationProps?: NotificationProps;
  buttonProps?: ButtonProps;
  actioniconProps?: ActionIconProps;
  onUndo: () => void;
}

export const Message: React.FC<MessageProps> = ({
  message,
  description,
  undoLabel,
  undoableTime = 5,
  undoableTimeout = 0,
  notificationProps,
  actioniconProps,
  buttonProps,
  onUndo,
}) => (
  <Notification
    title={message}
    color="transparent"
    withCloseButton={false}
    icon={
      <RingProgress
        size={40}
        thickness={4}
        roundCaps
        sections={[{
          value: undoableTimeout * (100 / undoableTime),
          color: "teal",
        }]}
        label={
          <Text size="sm" ta="center">{undoableTimeout}</Text>
        }
      />
    }
    {...notificationProps}
  >
    <Group justify="space-between" wrap="nowrap">
      <Text>{description}</Text>
      {undoLabel ? (
        <Button
          variant="default"
          onClick={onUndo}
          leftSection={<IconArrowBackUp size={18} />}
          {...buttonProps}
        >
          {undoLabel}
        </Button>
      ) : (
        <ActionIcon
          variant="default"
          onClick={onUndo}
          {...actioniconProps}
        >
          <IconArrowBackUp size={18} />
        </ActionIcon>
      )}
    </Group>
  </Notification>
);
