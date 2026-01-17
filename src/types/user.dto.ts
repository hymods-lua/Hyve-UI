export interface UserCookie {
    id: string;
    email: string;
    name?: string;
    role?: string;
}

export interface UserResponseDto {
    email: string;
    name: string | null;
}

export interface LoginResponse {
    token: string;
    user: UserCookie
};

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    name: string;
}

export interface RegisterResponse {
    id: string;
    name: string;
    email: string;
};

export interface VerifyResponse {
    status: boolean
}
export interface VerifyRequest {
    token: string;
}

export interface ResetPasswordRequest {
    email: string;
}

export interface ChangePasswordRequest {
    newPassword: string;
    token: string;
}

export interface ResendValidateEmailRequest {
    email: string;
}
