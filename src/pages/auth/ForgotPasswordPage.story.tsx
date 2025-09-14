import { ForgotPasswordPage } from './ForgotPasswordPage';

export default {
  title: 'Auth/ForgotPasswordPage',
  component: ForgotPasswordPage,
};

export const Basic = () =>
  <ForgotPasswordPage />;

export const WithLoginLink = () =>
  <ForgotPasswordPage
    loginLink="/login"
  />;
