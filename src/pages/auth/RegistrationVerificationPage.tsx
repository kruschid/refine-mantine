import {
  Button,
  type ButtonProps,
  Card,
  type CardProps,
  ScrollArea,
  type ScrollAreaProps,
  Stack,
  type StackProps,
  Text,
  Title,
} from "@mantine/core";
import { Link, useTranslate } from "@refinedev/core";
import type { ReactNode } from "react";
import { DefaultTitle } from "./DefaultTitle";

export interface RegistrationVerificationPageProps {
  loginLink?: string;
  // props
  wrapperProps?: StackProps;
  scrollAreaProps?: ScrollAreaProps;
  cardProps?: CardProps;
  buttonProps?: ButtonProps;
  // components
  icon?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
}

export const RegistrationVerificationPage: React.FC<
  RegistrationVerificationPageProps
> = (p) => {
  const translate = useTranslate();

  return (
    <Stack h="100vh" align="center" justify="center" {...p.wrapperProps}>
      <ScrollArea type="never" {...p.scrollAreaProps}>
        {p.icon ?? <DefaultTitle />}
        <Card shadow="sm" padding="lg" radius="md" withBorder {...p.cardProps}>
          {p.title ?? (
            <Title order={5} mb="sm" ta="center">
              {translate(
                "pages.registerVerification.title",
                "Thank you for your registration",
              )}
            </Title>
          )}
          {p.description ?? (
            <Text size="sm" ta="center" c="dimmed">
              {translate(
                "pages.registerVerification.description",
                "You will get an email where you can confirm your registration.",
              )}
            </Text>
          )}
          {p.loginLink && (
            <Button
              component={Link as React.FC<{ to: string }>}
              to={p.loginLink}
              fullWidth
              mt="lg"
              variant="light"
              {...p.buttonProps}
            >
              {translate("pages.registerVerification.login", "Back to login")}
            </Button>
          )}
        </Card>
      </ScrollArea>
    </Stack>
  );
};
