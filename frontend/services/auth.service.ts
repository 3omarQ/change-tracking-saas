import apiClient from "@/lib/api-client";
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  VerifyEmailRequest,
} from "@/types/auth.types";

export const authService = {
  // Login
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>("/auth/login", data);
    if (response.data.accessToken) {
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // also set cookie so middleware(proxy) can read it
      document.cookie = `accessToken=${
        response.data.accessToken
      }; path=/; max-age=${7 * 24 * 60 * 60}`;
    }
    return response.data;
  },

  // Register
  register: async (
    data: RegisterRequest
  ): Promise<{ message: string; email: string }> => {
    const response = await apiClient.post("/auth/register", data);
    return response.data;
  },

  // Verify email
  verifyEmail: async (data: VerifyEmailRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(
      "/auth/verify-email",
      data
    );
    if (response.data.accessToken) {
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      document.cookie = `accessToken=${
        response.data.accessToken
      }; path=/; max-age=${7 * 24 * 60 * 60}`;
    }
    return response.data;
  },

  // Forgot password
  forgotPassword: async (
    data: ForgotPasswordRequest
  ): Promise<{ message: string }> => {
    const response = await apiClient.post("/auth/forgot-password", data);
    return response.data;
  },

  // Reset password
  resetPassword: async (
    data: ResetPasswordRequest
  ): Promise<{ message: string }> => {
    const response = await apiClient.post("/auth/reset-password", data);
    return response.data;
  },

  // Resend verification code
  resendVerificationCode: async (
    email: string
  ): Promise<{ message: string }> => {
    const response = await apiClient.post("/auth/resend-verification", {
      email,
    });
    return response.data;
  },

  // Logout
  logout: () => {
    document.cookie = "accessToken=; path=/; max-age=0"; // clear cookie too
    localStorage.removeItem("accessToken");
    window.location.href = "/sign-in";
  },

  // Social auth
  socialLogin: async (provider: "google" | "github"): Promise<void> => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/${provider}`;
  },
};
