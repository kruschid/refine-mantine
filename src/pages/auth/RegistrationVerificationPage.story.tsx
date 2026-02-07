import { RegistrationVerificationPage } from "./RegistrationVerificationPage";

export default {
  title: "Auth/RegistrationVerificationPage",
  component: RegistrationVerificationPage,
};

export const Default = () => <RegistrationVerificationPage />;

export const WithLoginLink = () => (
  <RegistrationVerificationPage loginLink="/login" />
);
