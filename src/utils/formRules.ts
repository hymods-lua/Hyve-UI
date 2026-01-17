import { RegisterOptions, FieldValues } from "react-hook-form";
import { TFunction } from "i18next";

// Expresiones Regulares (Regex)
export const PATTERNS = {
    EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    PASSWORD_STRONG: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
    ONLY_NUMBERS: /^[0-9]+$/,
};

export const formRules = {
    // Regla para Email
    email: <T extends FieldValues>(t?: TFunction): RegisterOptions<T> => ({
        required: t ? t('errors.required') : "El correo es obligatorio",
        pattern: {
            value: PATTERNS.EMAIL,
            message: t ? t('errors.invalid_email') : "Correo inválido",
        },
    }),

    // Regla para Password (Login - Simple)
    password: <T extends FieldValues> (t?: TFunction, min_length = 6): RegisterOptions<T> => ({
        required: t ? t('errors.required') : "La contraseña es obligatoria",
        minLength: {
        value: 6,
            message: t ? t('errors.min_length', { count: min_length }) : "Mínimo 6 caracteres",
        },
    }),

    // Regla para Password (Registro - Fuerte)
    passwordStrong: <T extends FieldValues> (t?: TFunction): RegisterOptions<T> => ({
        required: t ? t('errors.required') : "La contraseña es obligatoria",
        pattern: {
        value: PATTERNS.PASSWORD_STRONG,
            message: "Debe tener 8 caracteres, 1 mayúscula y 1 número",
        },
    }),

    // Regla genérica para campos de texto requeridos
    required: <T extends FieldValues> (t?: TFunction, label?: string): RegisterOptions<T> => ({
        required: label 
        ? `${label} es requerido` 
        : (t ? t('errors.required') : "Este campo es obligatorio"),
    }),
};