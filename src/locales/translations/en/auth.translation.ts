import { LoginPageDictionary, RegisterPageDictionary, VerifyEmailDictionary } from "@/locales/dictionaries";

export const loginPageTranslation: LoginPageDictionary = {
    welcome: "Welcome back",
    welcomeLabel: "Sign in with your email and password",
    emailLabel: "Email Address",
    passwordLabel: "Password",
    emailPlaceholder: "user@mail.com",
    passwordPlaceholder: "********",
    submit: "Login",
    forgot_password: "Forgot your password?",
};

export const registerPageTranslation: RegisterPageDictionary = {
    myAccount: "My Account",
    myAccountLabel: "Sign up with your email and password",
    nameLabel: 'Name',
    namePlaceholder: 'Your name here',
    emailLabel: "Email Address",
    passwordLabel: "Password",
    emailPlaceholder: "user@mail.com",
    passwordPlaceholder: "********",
    submit: "Register",
    haveAccount: "Already have an account?",
}

export const verifyEmailTranslation: VerifyEmailDictionary = {
    missingToken: 'Token is missing.',
    validating: 'Validating information...',
    waitMoment: 'Please wait a moment...',
    successTitle: 'Success!',
    successMsg: 'Your request was completed successfully.',
    errorTitle: 'Error',
    backHome: 'Back to home',
    loginButton: 'Login',
    backButton: 'Home',
    resendTokenTitle: 'Resend verification code',
    resendTokenEmailLabel: 'Email address',
    resendTokenEmailPlace: "user@mail.com",
    resendTokenButton: 'Resend'
}
