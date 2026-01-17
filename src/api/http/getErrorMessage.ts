import { HttpError } from "./httpClient";
import { ApiResponse } from "@/types/api";

export const getErrorMessage = (error: unknown): string => {
    if (error instanceof HttpError) {
        const data = error.data as ApiResponse<unknown>;
        return data?.message || `Error del servidor (${error.status})`;
    }
    if (error instanceof Error) {
        return error.message;
    }
    return String(error) || 'Error desconocido';
};