import { LoginPageDictionary, RegisterPageDictionary, VerifyEmailDictionary } from "@/locales/dictionaries";

export const loginPageTranslation: LoginPageDictionary = {
    welcome: "Bienvenido de nuevo",
    welcomeLabel: 'Inicia sesion con tu e-mail y contraseña',
    emailLabel: "Correo Electrónico",
    passwordLabel: "Contraseña",
    emailPlaceholder: "usuario@mail.com",
    passwordPlaceholder: "********",
    submit: "Ingresar",
    forgot_password: "¿Olvidaste tu contraseña?",
}

export const registerPageTranslation: RegisterPageDictionary = {
    myAccount: "Mi cuenta",
    myAccountLabel: "Registrate con tu correo y contraseña",
    nameLabel: 'Nombre',
    namePlaceholder: 'Tu nombre aquí',
    emailLabel: "Correo Electrónico",
    passwordLabel: "Contraseña",
    emailPlaceholder: "usuario@mail.com",
    passwordPlaceholder: "********",
    submit: "Ingresar",
    haveAccount: "¿Ya tienes cuenta?"
}

export const verifyEmailTranslation: VerifyEmailDictionary = {
    missingToken: 'Falta el token.',
    validating: 'Validando información…',
    waitMoment: 'Por favor, espera un momento…',
    successTitle: '¡Éxito!',
    successMsg: 'Tu solicitud se completó correctamente.',
    errorTitle: 'Error',
    backHome: 'Volver al inicio',
    loginButton: 'Iniciar Sesión',
    backButton: 'Inicio',
    resendTokenTitle: 'Reenviar código de validación',
    resendTokenEmailLabel: 'Correo electrónico',
    resendTokenEmailPlace: "usuario@mail.com",
    resendTokenButton: 'Reenviar'
}
