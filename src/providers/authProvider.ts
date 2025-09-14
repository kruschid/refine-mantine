import type { AuthProvider } from "@refinedev/core";
import type { LoginArgs } from "@/pages/auth/LoginPage";
import { wait } from "@/utils/wait";

const LOCAL_STORAGE_KEY = "auth";

export const authProvider: AuthProvider = {
  login: async (args: LoginArgs) => {
    await wait(500);

    try{
      await args.otpHandler?.request();
    } catch {
      return {
        success: false,
        error: {
          statusCode: 400,
          name: "Verification canceled",
          message: "You stopped entering the code. Try again when you’re ready.",
        }
      }
    }

    await wait(500);

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(args));

    return {
      success: true,
      redirectTo: "/",
      successNotification: {
        message: "Login successful",
        description: "You're now signed in and ready to go."
      }
    };
  },

  logout: async () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);

    return {
      success: true,
      redirectTo: "/login",
    };
  },

  onError: async (error) => {
    return { error };
  },

  check: async () =>
    localStorage.getItem(LOCAL_STORAGE_KEY)
      ? {
          authenticated: true,
        }
      : {
          authenticated: false,
          redirectTo: "/login",
        },
  
  register: async () => {
    await wait(1000);

    return {
      success: true,
      successNotification: {
        message: "Registration completed",
        description: "Please sign in using your credentials",
      }
    };
  },

  forgotPassword: async () => {
    await wait(1000);

    return {
      success: true,
      successNotification: {
        message: "Password reset link sent",
        description: "Check your email for instructions to reset your password.",
      }
    }
  },

  updatePassword: async () => {
    await wait(1000);
    
    return {
      success: true,
      successNotification: {
        message: "Password updated",
        description: "Your password has been changed successfully.",
      },
    }
  },

  getIdentity: async () => ({
    id: "7d27d7c8-adca-49e6-88ea-c6f2c15caa6c",
    name: "John Doe",
    email: "jd@example.com",
    avatar: "https://ui-avatars.com/api/?name=John+Doe",
  }),

  getPermissions: async () => null,
};
