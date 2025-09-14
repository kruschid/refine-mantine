import {
  Button,
  type ButtonProps,
  Card,
  type CardProps,
  LoadingOverlay,
  type LoadingOverlayProps,
  Stack,
  type StackProps,
  TextInput,
  type TextInputProps,
  Title,
} from "@mantine/core";
import { type FormValidateInput, isNotEmpty } from "@mantine/form";
import {
  type UpdatePasswordFormTypes,
  useParsed,
  useTranslate,
  useUpdatePassword,
} from "@refinedev/core";
import { IconLockPassword } from "@tabler/icons-react";
import type { ReactNode } from "react";
import { useForm } from "@/hooks/useForm";
import { DefaultTitle } from "./DefaultTitle";

export interface UpdatePasswordPageProps {
    mutationVariables?: UpdatePasswordFormTypes;
    validate?: FormValidateInput<UpdatePasswordFormTypes>;
    withToken?: boolean;
    // props
    wrapperProps?: StackProps;
    passwordFieldProps?: TextInputProps;
    confirmPasswordFieldProps?: TextInputProps;
    cardProps?: CardProps;
    loadingOverlayProps?: LoadingOverlayProps;
    submitButtonProps?: ButtonProps;
    // components
    icon?: ReactNode;
    title?: ReactNode;
}

export const UpdatePasswordPage: React.FC<UpdatePasswordPageProps> = (p) => {
  const translate = useTranslate();
  const { mutate: updatePassword, isPending } = useUpdatePassword();

  const { params } = useParsed<{ token: string }>();
  const token = params?.token;

  const { getInputProps, onSubmit, key } = useForm({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: {
      password: isNotEmpty(translate("pages.updatePassword.validate.passwordRequired", "Password is required")),
      confirmPassword: (value, form) =>
        form.password !== value
        ? translate("pages.updatePassword.validate.passwordMismatch", "Passwords do not match")
        : undefined,
      ...p.validate,
    },
  });
  
  const handleSubmit = onSubmit(({password, confirmPassword}) => {
    if (!p.withToken || token) {
      updatePassword({
        password,
        confirmPassword,
        token,
        translate,
      });
    }
  });

  return (
    <Stack h="100vh" align="center" justify="center" {...p.wrapperProps}>
      {p.icon ?? <DefaultTitle />}
      <Card shadow="sm" padding="lg" radius="md" withBorder {...p.cardProps}>
        <LoadingOverlay
          visible={isPending}
          {...p.loadingOverlayProps}
        />
        {p.title ?? (
          <Title order={5} mb="lg" ta="center">
            {translate("pages.updatePassword.title", "Update Password")}
          </Title>
        )}
        <form onSubmit={handleSubmit}>
          <TextInput
            mb="sm" 
            label={translate("pages.updatePassword.fields.password", "New Password")}
            leftSection={<IconLockPassword size={18} />}
            placeholder="●●●●●●●●"
            type="password"
            key={key("password")}
            {...getInputProps("password")}
            {...p.passwordFieldProps}
          />
          <TextInput
            mb="lg" 
            label={translate(
              "pages.updatePassword.fields.confirmPassword",
              "Confirm New Password",
            )}
            leftSection={<IconLockPassword size={18} />}
            placeholder="●●●●●●●●"
            type="password"
            key={key("confirmPassword")}
            {...getInputProps("confirmPassword")}
            {...p.confirmPasswordFieldProps}
          />
          <Button
            type="submit"
            fullWidth
            disabled={isPending}
            {...p.submitButtonProps}
          >
            {translate("pages.updatePassword.buttons.submit", "Update")}
          </Button>
        </form>
      </Card>
    </Stack>
  );
};
