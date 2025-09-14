import {
  Anchor,
  Button,
  type ButtonProps,
  Card,
  type CardProps,
  LoadingOverlay,
  type LoadingOverlayProps,
  type PinInputProps,
  ScrollArea,
  type ScrollAreaProps,
  Stack,
  type StackProps,
  Text,
  TextInput,
  type TextInputProps,
  Title
} from "@mantine/core";
import { type FormValidateInput, isEmail, isNotEmpty, useForm } from "@mantine/form";
import { Link, type RegisterFormTypes, useRegister, useTranslate } from "@refinedev/core";
import { IconAt, IconLockPassword } from "@tabler/icons-react";
import type { ReactNode } from "react";
import { DefaultTitle } from "./DefaultTitle";

export interface RegisterPageProps {
    withConfirmation?: boolean;
    mutationVariables?: RegisterFormTypes;
    loginLink?: string;
    validate?: FormValidateInput<RegisterForm>;
    // props
    wrapperProps?: StackProps;
    scrollAreaProps?: ScrollAreaProps;
    emailFieldProps?: TextInputProps;
    passwordFieldProps?: TextInputProps;
    passwordConfirmationFieldProps?: TextInputProps;
    cardProps?: CardProps;
    loadingOverlayProps?: LoadingOverlayProps;
    otpInputProps?: PinInputProps;
    submitButtonProps?: ButtonProps;
    cancelButtonProps?: ButtonProps;
    // components
    icon?: ReactNode;
    title?: ReactNode;
}

export interface RegisterForm {
  email: string;
  password: string;
  passwordConfirmation: string;
}

export const RegisterPage: React.FC<RegisterPageProps> = (p) => {
  const translate = useTranslate();

  const { getInputProps, onSubmit, key } = useForm<RegisterForm>({
    initialValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    validate: {
      email: isEmail(
        translate("pages.register.validate.invalidEmail", "Email is not valid")
      ),
      password: isNotEmpty(translate("pages.register.validate.passwordRequired", "Password is required")),
      passwordConfirmation: (value, form) =>
        p.withConfirmation && form.password !== value
          ? translate("pages.register.validate.passwordMismatch", "Passwords do not match")
          : undefined,
      ...p.validate,
    },
  });

  const register = useRegister<RegisterFormTypes>();

  const handleSubmit = onSubmit(({ email, password }) => {
    register.mutate({  email, password, ...p.mutationVariables });
  });

  return (
    <Stack h="100vh" align="center" justify="center" {...p.wrapperProps}>
      <ScrollArea type="never" {...p.scrollAreaProps}>
        {p.icon ?? <DefaultTitle />}
        <Card shadow="sm" padding="lg" radius="md" withBorder {...p.cardProps}>
          <LoadingOverlay
            visible={register.isPending}
            {...p.loadingOverlayProps}
          />
          {p.title ?? (
            <Title order={5} mb="lg" ta="center">
              {translate("pages.register.title", "Sign up for your account")}
            </Title>
          )}
          <form onSubmit={handleSubmit}>
            <TextInput
              mb="xs"
              type="email"
              label={translate("pages.register.email", "Email")}
              leftSection={<IconAt size={18} />}
              placeholder={translate("pages.register.emailPlaceholder", "name@example.com")}
              key={key("email")}
              {...getInputProps("email")}
              {...p.emailFieldProps}
            />
            <TextInput
              mb="sm" 
              label={translate("pages.register.password", "Password")}
              leftSection={<IconLockPassword size={18} />}
              placeholder={translate("pages.register.passwordPlaceholder", "●●●●●●●●")}
              type="password"
              key={key("password")}
              {...getInputProps("password")}
              {...p.passwordFieldProps}
            />
            {p.withConfirmation && (
              <TextInput
                mb="sm" 
                label={translate("pages.register.passwordConfirmation", "Confirm Password")}
                leftSection={<IconLockPassword size={18} />}
                placeholder={translate("pages.register.passwordConfirmationPlaceholder", "●●●●●●●●")}
                type="password"
                key={key("passwordConfirmation")}
                {...getInputProps("passwordConfirmation")}
                {...p.passwordConfirmationFieldProps}
              />
            )}
            <Button
              mt="lg"
              fullWidth
              type="submit"
              disabled={register.isPending}
              {...p.submitButtonProps}
            >
              {translate("pages.register.submit", "Sign up")}
            </Button>
          </form>
          {p.loginLink &&
            <Text mt="lg" size="xs" ta="center">
              {translate("pages.register.haveAccount", "Have an account?")}
              {" "}
              {/** biome-ignore lint/suspicious/noExplicitAny: refines types are messed up */}
              <Anchor component={Link as any} to={p.loginLink}>
                {translate("pages.register.login", "Sign in")}
              </Anchor>
            </Text>
          }
        </Card>
      </ScrollArea>
    </Stack>
  );
};
