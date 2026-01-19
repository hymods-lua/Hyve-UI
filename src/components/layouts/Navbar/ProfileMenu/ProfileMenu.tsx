import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "react-i18next";
import style from './profilemenu.module.scss';

const ProfileMenu = () => {
    const [open, setOpen] = useState(false);
    const {logout, isAuthenticated, isLoading, user} = useAuth();
    const { t } = useTranslation();
    
    if (isLoading) {
        return <div className={style.loadingContainer}></div>;
    }

    return (
        <div className={style.wrapper}>
            <button
                onClick={() => setOpen(!open)}
                className={`${style.triggerBtn} ${open ? style.active : ''}`}
                aria-label="Abrir menú de usuario"
            >
                <FaUser className={style.icon} />
            </button>

            {open && (!isAuthenticated || !user) && (
                <div className={style.dropdown}>
                    <div className={style.dropdownHeader}>
                        <Link to="/login" className={style.menuItemLogin}>
                            <FaUser className={style.menuIcon} />
                             {t("navbar.loginLabel")} 
                        </Link>
                    </div>
                </div>
            )}

            {/* Menú Desplegable */}
            {open && (isAuthenticated && user) && (
                <div className={style.dropdown}>
                    <div className={style.dropdownHeader}>
                        <div>
                            Hy <strong>{user.name || "Usuario"}</strong>
                        </div>
                    </div>

                    <Link to="/profile" className={style.menuItem}>
                        <FaUser className={style.menuIcon} />
                        {t("navbar.myAccountLabel")}
                    </Link>
                    
                    <Link to="/settings" className={style.menuItem}>
                        <FaCog className={style.menuIcon} />
                        {t("navbar.settingsLabel")}
                    </Link>
                    
                    <div className={style.divider}></div>

                    <button
                        className={style.menuItemDanger}
                        onClick={() => {
                            setOpen(false);
                            logout();
                        }}
                    >
                        <FaSignOutAlt className={style.menuIcon} />
                        {t("navbar.logoutLabel")}
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfileMenu;
