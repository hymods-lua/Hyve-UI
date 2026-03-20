import { HomePageDictionary } from "@/locales/dictionaries"

export const homePageTranslation: HomePageDictionary = {
    home: "Inicio",
    welcome: "Bienvenido",
    hero: {
        badge: "Desarrollador Full Stack",
        title: [
            "Creando experiencias",
            "digitales completas.",
        ],
        description: "Desarrollador Full Stack especializado en construir soluciones web de principio a fin. Transformo ideas complejas en aplicaciones escalables, accesibles y de alto rendimiento.",
        seeprojects: "Ver Proyectos",
        contactme: "Contáctame",
        techstack: "Tech Stack",
        stacklabels: [
            { label: "React" },
            { label: "Sass" },
            { label: "Node" },
        ]
    },
    about: {
        badge: "Conóceme",
        title: "Más allá del código.",
        description: [
            "Soy un desarrollador web apasionado, especializado en desarrollo full stack. Me entusiasma dar vida a los aspectos técnicos y visuales de los productos digitales. La experiencia de usuario, el diseño con precisión de píxeles y la escritura de código claro, legible y de alto rendimiento son fundamentales para mí.",
            "Cuando no estoy programando, probablemente me encuentres explorando Twitter, aprendiendo a través de nuevos hobbies o simplemente disfrutando de mi tiempo libre. Puedes seguirme en Twitter, donde comparto ideas sobre tecnología y desarrollo en público, o visitar mi GitHub para ver en qué estoy trabajando."
        ],
        btn_cv: "Descargar CV",
        
        // Tarjetas de destacados (Highlights)
        highlights: [
            {
                id: "experience",
                title: "Experiencia",
                text: "+1 Años desarrollando"
            },
            {
                id: "education",
                title: "Educación",
                text: "Ingeniería en Sistemas"
            },
            {
                id: "focus",
                title: "Enfoque",
                text: "Performance & A11y"
            }
        ]
    },
    projects: {
        title_normal: "Mis",
        title_bold: "Proyectos",
        items: [
            {
                title: "Nova Sync",
                description: "Landing page corporativa para una startup SaaS financiera. Diseñada con un enfoque en la conversión, cuenta con una interfaz moderna (Glassmorphism), tipografía optimizada y una arquitectura de componentes escalable y totalmente responsiva.",
                link: "https://an.de-view.com/novasync/"
            },
            {
                title: "InnovaTube",
                description: "Aplicación de streaming de video desarrollada con React. Integra la API de YouTube (vía RapidAPI) para ofrecer búsqueda en tiempo real, reproducción de video, filtrado por categorías y perfiles de canal dinámicos. Gestión de estado optimizada y diseño totalmente responsivo.",
                link: "https://github.com/lugr4/InnovaTube"
            },
            {
                title: "QR Code Generator API",
                description: "API RESTful desarrollada y desplegada en RapidAPI para la generación dinámica de códigos QR. Permite a desarrolladores integrar funcionalidades de códigos QR personalizados (color, tamaño, corrección de errores) en sus aplicaciones mediante endpoints HTTP optimizados y seguros.",
                link: "https://rapidapi.com/suarezflores33/api/qr-code-generator-pro3"
            }
        ]
    },
    stack: {
        badge: "Mis conocimientos",
        title: "Tech Stack"
    },
    contact: {
        badge: "Contacto",
        title: "¿Listo para empezar?",
        description: "Estoy disponible para trabajos freelance y colaboraciones. Cuéntame sobre tu proyecto.",
        info: {
            email: "Email",
            social: "Redes Sociales"
        },
        form: {
            name: "Tu Nombre",
            email: "Tu Email",
            subject: "Asunto",
            subjectPlaceholder: "Propuesta de proyecto",
            message: "Cuéntame los detalles...",
            btn_send: "Enviar Mensaje",
            btn_sending:"Enviando Mensaje"
        }
    }
}
