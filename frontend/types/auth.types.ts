import { AxiosError } from "axios";

export interface User {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
  createdAt: string;
  role: string;
  notifyByEmail: boolean;
  provider: "LOCAL" | "GOOGLE" | "GITHUB";
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

export interface VerifyEmailRequest {
  code: string;
  email?: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}

export type ApiErrorResponse = AxiosError<ApiError>;
