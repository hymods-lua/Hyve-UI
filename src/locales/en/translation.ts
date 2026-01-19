import { Dictionary } from "../dictionary";
import { loginPageTranslation, registerPageTranslation, verifyEmailTranslation, navbarTranslation, homePageTranslation, TermsTranslation } from "../translations/en"

export const en: Dictionary = {
    errors: {
        invalid_email: "Invalid email address",
        required: "This field is required",
        min_length: "Minimum {{count}} characters",
        error_empty: "All fields are required",
        error: "Oops… an unexpected error occurred.",
    },
    navbar: navbarTranslation,
    footer: {},
    homePage: homePageTranslation,
    loginPage: loginPageTranslation,
    registerPage: registerPageTranslation,
    verifyEmailPage: verifyEmailTranslation,
    termsPage: TermsTranslation,
    profile: {
        myperfil: "My Profile",
        settings: "Settings",
        setting: "Setting",
        logout: "Log out",
    },
    reports: "Reports",
    dashboard: "Dashboard",
} as const;