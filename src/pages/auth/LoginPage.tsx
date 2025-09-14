import {
  Anchor,
  Button,
  type ButtonProps,
  Card,
  type CardProps,
  Center,
  Collapse,
  Divider,
  Input,
  LoadingOverlay,
  type LoadingOverlayProps,
  PinInput,
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
import { Link, type OAuthProvider, type LoginFormTypes as RefineLoginFormTypes, useLogin, useTranslate } from "@refinedev/core";
import { IconAt, IconLockPassword } from "@tabler/icons-react";
import { type ReactNode, useCallback } from "react";
import type { OtpHandler } from "@/hooks/useOtp";
import { DefaultTitle } from "./DefaultTitle";

export type TranslateFn = ReturnType<typeof useTranslate>;

export interface LoginArgs {
  providerName?: string; // providerName prop is used by several AuthPage implementations
  email?: string;
  password?: string;
  otpHandler?: OtpHandler;
  translate?: TranslateFn;
  [key: string]: unknown;
}

export interface OAuthProviderMantine extends OAuthProvider {
  buttonProps?: ButtonProps;
} 

export type LoginPageProps = {
  providers?: OAuthProviderMantine[];
  mutationVariables?: RefineLoginFormTypes;
  registerLink?: string;
  forgotPasswordLink?: string;
  validate?: FormValidateInput<LoginForm>;
  // customization
  wrapperProps?: StackProps;
  scrollAreaProps?: ScrollAreaProps;
  emailFieldProps?: TextInputProps;
  passwordFieldProps?: TextInputProps;
  cardProps?: CardProps;
  loadingOverlayProps?: LoadingOverlayProps;
  otpInputProps?: PinInputProps;
  submitButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  // components
  icon?: ReactNode;
  title?: ReactNode;
  // otp promise handler
  otpHandler?: OtpHandler;
} & (
  {
    method: "oauth";
    providers: OAuthProvider[];
  } | {
    method: "otp" | "mfa" | "password";
  }
);

interface LoginForm {
  email: string;
  password: string;
}

export const LoginPage: React.FC<LoginPageProps> = (p) => {
  const translate = useTranslate();
  const login = useLogin<LoginArgs>();

  const { getInputProps, onSubmit, key } = useForm<LoginForm>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: isEmail(
        translate("pages.login.validate.invalidEmail", "Email is not valid")
      ),
      password: (p.method === "password" || p.method === "mfa")
        ? isNotEmpty(translate("pages.login.validate.passwordRequired", "Password is required"))
        : undefined,
      ...p.validate,
    },
  });

  const handleProviderLogin = useCallback((provider: OAuthProvider) => {
    login.mutate({
      providerName: provider.name,
      translate,
      ...p.mutationVariables
    });
  }, [login, translate, p.mutationVariables]);

  const handleLogin = onSubmit(({ email, password }) => {
    login.mutate({
      email,
      password,
      otpHandler: p.otpHandler,
      translate,
      ...p.mutationVariables,
    });
  });

  return (
    <Stack h="100vh" align="center" justify="center" {...p.wrapperProps}>
      <ScrollArea type="never" {...p.scrollAreaProps}>
        {p.icon ?? <DefaultTitle />}
        <Card shadow="sm" padding="lg" radius="md" withBorder {...p.cardProps}>
          <LoadingOverlay
            visible={login.isPending && !p.otpHandler?.isPending}
            {...p.loadingOverlayProps}
          />
          {p.title ?? (
            <Title order={5} mb="lg" ta="center">
              {translate("pages.login.title", "Sign in to your account")}
            </Title>
          )}
          <Collapse in={!p.otpHandler?.isPending}>
            {p.providers?.length && (
              <Providers
                providers={p.providers}
                withDivider={p.method !== "oauth"}
                onClickProvider={handleProviderLogin}
              />
            )}
          </Collapse>
          {p.method !== "oauth" && (
            <form onSubmit={handleLogin}>
              <Collapse in={!p.otpHandler?.isPending}>
                <TextInput
                  mb="xs"
                  type="email"
                  label={translate("pages.login.fields.email", "Email")}
                  leftSection={<IconAt size={18} />}
                  placeholder={translate("pages.login.fields.emailPlaceholder", "name@example.com")}
                  key={key("email")}
                  {...getInputProps("email")}
                  {...p.emailFieldProps}
                />
                {(p.method === "mfa" || p.method === "password") && (
                  <TextInput
                    label={translate("pages.login.fields.password", "Password")}
                    leftSection={<IconLockPassword size={18} />}
                    placeholder={translate("pages.login.fields.passwordPlaceholder", "●●●●●●●●")}
                    type="password"
                    key={key("password")}
                    {...getInputProps("password")}
                    {...p.passwordFieldProps}
                  />
                )}
                {p.forgotPasswordLink &&
                  <Text size="xs" mt="xs" ta="end">
                    {/** biome-ignore lint/suspicious/noExplicitAny: refines type is messed up */}
                    <Anchor component={Link as any} to={p.forgotPasswordLink}>
                      {translate( "pages.login.buttons.forgotPassword", "Forgot password?")}
                    </Anchor>
                  </Text>
                }
                <Button
                  fullWidth
                  mt="lg"
                  type="submit"
                  {...p.submitButtonProps}
                >
                  {translate("pages.login.signin", "Login")}
                </Button>
                {p.registerLink &&
                  <Text mt="lg" size="xs" ta="center">
                    {translate("pages.login.buttons.noAccount", "Don’t have an account?")}
                    {" "}
                    {/** biome-ignore lint/suspicious/noExplicitAny: that's fine */}
                    <Anchor component={Link as any} to={p.registerLink}>
                      {translate("pages.login.register", "Sign up")}
                    </Anchor>
                  </Text>
                }
              </Collapse>
              <Collapse in={!!p.otpHandler?.isPending}>
                <Input.Wrapper
                  label={translate("pages.login.fields.otp", "Enter or paste your auth token")}
                >
                  <Center>
                    <PinInput
                      type="number"
                      oneTimeCode
                      disabled={login.isPending && !p.otpHandler?.isPending}
                      onComplete={p.otpHandler?.resolve}
                      {...p.otpInputProps}
                    />
                  </Center>
                </Input.Wrapper>
                <Button
                  fullWidth
                  mt="lg"
                  variant="outline"
                  onClick={p.otpHandler?.reject}
                  {...p.cancelButtonProps}
                >
                  {translate("pages.login.buttons.cancel", "Cancel")}
                </Button>
              </Collapse>
            </form>
          )}
        </Card>
      </ScrollArea>
    </Stack>
  );
};

const Providers = (p: {
  providers: OAuthProviderMantine[];
  withDivider: boolean;
  onClickProvider: (provider: OAuthProvider) => void;
}) => {
  const translate = useTranslate();

  return (
    <>
      <Stack gap={8}>
        {p.providers.map((provider) =>
          <Button
            key={provider.name}
            fullWidth
            leftSection={provider.icon}
            onClick={() => p.onClickProvider(provider)}
            {...provider.buttonProps}
          >
            {provider.label ?? provider.name}
          </Button>
        )}
      </Stack>
      {p.withDivider && (
        <Divider
          my="md"
          labelPosition="center"
          label={translate("pages.login.divider", "or")}
        />
      )}
    </>
  );
}
