/** biome-ignore-all lint/correctness/useUniqueElementIds: test ids for playwright */
import {
  Anchor,
  Button,
  type ButtonProps,
  Card,
  type CardProps,
  LoadingOverlay,
  type LoadingOverlayProps,
  ScrollArea,
  type ScrollAreaProps,
  Stack,
  type StackProps,
  Text,
  TextInput,
  type TextInputProps,
  Title
} from "@mantine/core";
import { type FormValidateInput, isEmail } from "@mantine/form";
import { Link, useForgotPassword, useTranslate } from "@refinedev/core";
import { IconAt } from "@tabler/icons-react";
import type { ReactNode } from "react";
import { useForm } from "@/hooks/useForm";
import { DefaultTitle } from "./DefaultTitle";

export interface ForgotPasswordPageProps {
  loginLink?: string;
  validate?: FormValidateInput<ForgotPasswordForm>;
  // customization
  wrapperProps?: StackProps;
  scrollAreaProps?: ScrollAreaProps;
  emailFieldProps?: TextInputProps;
  cardProps?: CardProps;
  loadingOverlayProps?: LoadingOverlayProps;
  submitButtonProps?: ButtonProps;
  // components
  icon?: ReactNode;
  title?: ReactNode;
}

export interface ForgotPasswordForm {
  email: string;
} 

export const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = (p: {
  loginLink?: string;
  validate?: FormValidateInput<ForgotPasswordForm>;
  // customization
  wrapperProps?: StackProps;
  scrollAreaProps?: ScrollAreaProps;
  emailFieldProps?: TextInputProps;
  cardProps?: CardProps;
  loadingOverlayProps?: LoadingOverlayProps;
  submitButtonProps?: ButtonProps;
  // components
  icon?: ReactNode;
  title?: ReactNode;
}) => {
  const translate = useTranslate();
  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const { getInputProps, onSubmit, key } = useForm({
    initialValues: {
      email: "",
    },
    validate: {
      email: isEmail(
        translate("pages.login.invalidEmail", "Email is not valid")
      ),
    },
    ...p.validate,
  });
  
  const handleResetPassword = onSubmit(({ email }) => {
    forgotPassword({ email, translate });
  });

  return (
    <Stack h="100vh" align="center" justify="center" {...p.wrapperProps}>
      <ScrollArea type="never" {...p.scrollAreaProps}>
        {p.icon ?? <DefaultTitle />}
        <Card shadow="sm" padding="lg" radius="md" withBorder {...p.cardProps}>
          <LoadingOverlay
            visible={isPending }
            {...p.loadingOverlayProps}
          />
          {p.title ?? (
            <Title order={5} mb="lg" ta="center">
              {translate("pages.forgotPassword.title", "Reset your password")}
            </Title>
          )}
          <form onSubmit={handleResetPassword}>
            <TextInput
              mb="lg"
              type="email"
              label={translate("pages.forgotPassword.fields.email", "Email")}
              leftSection={<IconAt size={18} />}
              placeholder={translate("pages.forgotPassword.fields.emailPlaceholder", "name@example.com")}
              key={key("email")}
              {...getInputProps("email")}
              {...p.emailFieldProps}
            />
            <Button
              fullWidth
              variant="outline"
              type="submit"
              {...p.submitButtonProps}
            >
              {translate("pages.forgotPassword.buttons.submit", "Send reset instructions")}
            </Button>
            {p.loginLink &&
              <Text mt="lg" size="xs" ta="center">
                {translate(
                  "pages.register.buttons.haveAccount",
                  "Have an account? ",
                )}{" "}
                {/** biome-ignore lint/suspicious/noExplicitAny: that's fine */}
                <Anchor component={Link as any} to={p.loginLink}>
                  {translate("pages.login.signin", "Sign in")}
                </Anchor>
              </Text>
            }
          </form> 
        </Card>
      </ScrollArea>
    </Stack>
  );
};
