import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "./Logo/Logo";
import { MXIcon, USIcon } from "@/components/icons/Countries/Countries";
import NavItems from "./NavItems/NavItems";
import useAppTranslation from "@/hooks/layouts/useTranslation";
import style from "./navbar.module.scss";

const Navbar = () => {
     const [isOpen, setIsOpen] = useState(false);
    const { appI18n, changeLanguage } = useAppTranslation();

    return (
        <header className={style.headerWrapper}>
            <nav className={style.navbar}>
                <div className={style.navbar__container}>
                    
                    {/* Sección Izquierda: Logo y Mobile Toggle */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <button onClick={() => setIsOpen(!isOpen)} className={style.navbar__hamburger}>
                            {isOpen ? <FaTimes /> : <FaBars />}
                        </button>
                        <div className={style.navbar__logo}>
                            <Logo /> {/* Asegúrate que el componente Logo use el color v.$hytale-gold */}
                        </div>
                    </div>

                    {/* Sección Central: Navegación de herramientas */}
                    <div className={style.navbar__menu}>
                        <NavItems />
                    </div>
                    
                    {/* Sección Derecha: Acciones, Idioma y Perfil */}
                    <div className={style.navbar__actions}>
                        
                        <div className={style.lenguageBtn}>
                            {appI18n === 'es' ? (
                                <button onClick={() => changeLanguage("en")} title="Switch to English">
                                    <USIcon />
                                </button>
                            ) : (
                                <button onClick={() => changeLanguage("es")} title="Cambiar a Español">
                                    <MXIcon />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Dropdown (Simplificado para PC) */}
                {isOpen && (
                    <div className={style.navbar__mobileMenu}>
                        <NavItems />
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Navbar;