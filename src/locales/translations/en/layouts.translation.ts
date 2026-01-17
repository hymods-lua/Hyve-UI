import { NavbarDictionary, FooterDictionary } from "@/locales/dictionaries";

export const navbarTranslation: NavbarDictionary = {
    myAccountLabel: 'My profile',
    settingsLabel: 'Settings',
    loginLabel: 'Login',
    logoutLabel: 'Logout',
    topBanner: {
        message: 'Sign up and get 20% off to your first order.',
        signupLabel: 'Sign Up Now' 
    },
    searchPlaceholder: 'Search for...',
    welcomeLabel: 'Hello,',
    aboutMeLabel: "hel",
    homeLabel: "Home",
    editorLabel: "Editor",
    helpLabel: 'Help',
};

export const footerTranslation: FooterDictionary = {
    summaryFooter:      "I build modern and scalable digital experiences with high-performance development.",
    newSletter:         "Stay up to date with our latest offers",
    emailPhaceholder:   "Enter your email address",
    subscribeBtnLabel:  "Subscribe to Newsletter",
    technologiesTitle:      "Technologies",
    technologiesLabels: [
        {
            type: "to" ,
            label: "NodeJs",
            link: "/technology#nodejs"
        },
        {
            type: "to" ,
            label: "Python",
            link: "/technology#python"
        },
        {
            type: "to" ,
            label: "DevOps",
            link: "/technology#devops"
        },
        {
            type: "to" ,
            label: "PHP",
            link: "/technology#php"
        },
    ],  
    supportTitle: "Support",
    supportLabels: [
        {
            type: "href" ,
            label: "Contact Me",
            link: "#contact"
        },
        {
            type: "to" ,
            label: "Terms & Conditions",
            link: "terms-of-service"
        },
        {
            type: "to" ,
            label: "Privacy Policy",
            link: "privacy"
        },
    ],
    meTitle:            "Me",
    companyLabels: {
        about:          "About",
        services:       "Services",
        projects:       "Projects",
        stack:          "My stack",
    }
}