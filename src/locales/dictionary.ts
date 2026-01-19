import { LoginPageDictionary, ErrorsDictionary, RegisterPageDictionary, VerifyEmailDictionary , NavbarDictionary, HomePageDictionary, TermsPageDictionary} from "./dictionaries"


export interface Dictionary {
    errors: ErrorsDictionary
    navbar: NavbarDictionary,
    footer: {},
    homePage: HomePageDictionary
    loginPage: LoginPageDictionary,
    registerPage: RegisterPageDictionary,
    verifyEmailPage: VerifyEmailDictionary,
    termsPage: TermsPageDictionary,
    profile:{
        myperfil:string,
        settings:string,
        setting:string,
        logout:string,
    },
    reports:string,
    dashboard:string
}