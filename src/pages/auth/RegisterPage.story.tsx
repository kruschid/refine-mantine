import { RegisterPage } from './RegisterPage';

export default {
  title: 'Auth/RegisterPage',
  component: RegisterPage,
};

export const WithPassword = () =>
  <RegisterPage />;

export const WithPasswordConfirmation = () =>
  <RegisterPage withConfirmation />;

export const WithLink = () =>
  <RegisterPage
    withConfirmation
    loginLink="/login"
  />;