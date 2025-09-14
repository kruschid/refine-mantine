import type { Meta } from "@storybook/react";
import { IconBrandApple, IconBrandFacebook, IconBrandGoogle } from '@tabler/icons-react';
import { useOtp } from '@/hooks/useOtp';
import { LoginPage } from './LoginPage';

export default {
  title: 'Auth/LoginPage',
  component: LoginPage,
} satisfies Meta<typeof LoginPage>;

export const WithPassword = () =>
  <LoginPage method='password' />;

export const WithProviders = () =>
  <LoginPage
    method='oauth'
    providers={[{
      name: "google",
      label: "Continue with Google",
      icon: <IconBrandGoogle />,
      buttonProps: {
        color: "red",
      }
    }, {
      name: "facebook",
      label: "Continue with the Facebook",
      icon: <IconBrandFacebook />,
      buttonProps: {
        color: "blue",
      }
    }, {
      name: "apple",
      label: "Continue with Apple",
      icon: <IconBrandApple />,
      buttonProps: {
        color: "gray",
      }
    }]}
  />;

export const WithProvidersAndPassword = () =>
  <LoginPage
    method='password'
    providers={[{
      name: "google",
      label: "Continue with Google",
      icon: <IconBrandGoogle />,
      buttonProps: {
        color: "red",
      }
    }]}
  />;

export const WithProvidersAndOtp = () => {
  const otpHandler = useOtp();

  return (
    <LoginPage
      method='otp'
      otpHandler={otpHandler}
      providers={[{
        name: "google",
        label: "Continue with Google",
        icon: <IconBrandGoogle />,
        buttonProps: {
          color: "red",
        }
      }]}
    />
  );
}

export const WithProvidersAndMfa = () => {
  const otpHandler = useOtp();

  return (
    <LoginPage
      method='mfa'
      otpHandler={otpHandler}
      otpInputProps={{ length: 6 }}
      providers={[{
        name: "google",
        label: "Continue with Google",
        icon: <IconBrandGoogle />,
        buttonProps: {
          color: "red",
        }
      }]}
    />
  );
}

export const WithLinks = () =>
  <LoginPage
    method="password"
    registerLink="/register"
    forgotPasswordLink="/forgot-password"
  />;