import { hasLength } from '@mantine/form';
import { UpdatePasswordPage } from './UpdatePasswordPage';

export default {
  title: 'Auth/UpdatePasswordPage',
  component: UpdatePasswordPage,
};

export const WithPasswordConfirmation = () =>
  <UpdatePasswordPage />;

export const WithAsterisk = () =>
  <UpdatePasswordPage
    passwordFieldProps={{
      withAsterisk: true,
    }}
    confirmPasswordFieldProps={{
      withAsterisk: true,
    }}
  />;

export const WithCustomValidation = () =>
  <UpdatePasswordPage
    validate={{
      password: hasLength({ min: 2, max: 10 }, 'Password must be 2-10 characters long'),
    }}
  />;
