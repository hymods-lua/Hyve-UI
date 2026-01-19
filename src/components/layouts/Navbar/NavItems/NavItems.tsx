import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import style from "./navitems.module.scss";

interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: number;
    color?: string;
}
interface NavItemProps {
    type: "to" | "href";
    name: string, 
    href: string, 
    icon?: React.FC<IconProps> | null
}

const NavItems = () => {
    const location = useLocation();
    const { t } = useTranslation();

    const navItems:NavItemProps[] = [
        { type: "href", name: t("navbar.homeLabel"),        href: "/#hero",     icon: null },
        { type: "href", name: t("navbar.editorLabel"),       href: "/editor",  icon: null },
    ];
    
    const isActive = (path: string) => {
        const currentFullUrl = location.pathname + location.hash;
        if (currentFullUrl === path) {
            return true;
        }

        if (location.pathname === '/' && location.hash === '' && path === '/#hero') {
            return true;
        }

        return false;
    } 
    return (
        <div className={style.navItems}>
            {navItems.map((item) => {
                const Icon = item.icon;
                const activeClass = isActive(item.href) ? style.active : "";
                if(item.type === "href") {
                    return ( 
                        <a
                            key={item.name}
                            href={item.href}
                            className={`${style.navItems__link} ${activeClass}`}
                        >
                            {Icon && <Icon className={style.navItems__icon} />}
                            {item.name}
                        </a>
                    );
                }
                return (
                    <Link
                        key={item.name}
                        to={item.href}
                        className={`${style.navItems__link} ${activeClass}`}
                    >
                        {Icon && (
                            <Icon className={style.navItems__icon} />
                        )}
                        {item.name}
                    </Link>
                );
            })}
        </div>
    );
};

export default NavItems;
