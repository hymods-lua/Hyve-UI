import { Dictionary } from "../dictionary";
import { loginPageTranslation, registerPageTranslation, verifyEmailTranslation, navbarTranslation, homePageTranslation, TermsTranslation } from "../translations/es"

export const es: Dictionary = {
    errors: {
        invalid_email: "Correo electrónico inválido",
        required:  "Este campo es obligatorio",
        min_length:  "Mínimo {{count}} caracteres",
        error_empty: "Todos los campos son obligatorios",
        error: "Ups… ocurrió un error inesperado."
    },
    navbar: navbarTranslation,
    footer: {},
    homePage: homePageTranslation,
    loginPage: loginPageTranslation,
    registerPage: registerPageTranslation,
    verifyEmailPage: verifyEmailTranslation,
    termsPage: TermsTranslation,
    profile: {
        myperfil: "Mi Perfil",
        settings: "Configuraciones",
        setting: "Configuración",
        logout: "Cerrar sesión",
    },
    reports: "Reportes",
    dashboard: "Panel de Control",
} as const; 