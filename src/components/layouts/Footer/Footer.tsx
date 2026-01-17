
import { FaTwitter, FaGithub, FaDiscord } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import style from './footer.module.scss'; 
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();
    const year = new Date().getFullYear();

    return (
        <footer className={style.footer}>
            <div className={style.container}>
                <div className={style.topSection}>
                    {/* Columna Marca */}
                    <div className={style.brandCol}>
                        <div className={style.logo}>
                            <span className={style.logoText}>WAYHOME<span>UI</span></span>
                        </div>
                        <p className={style.description}>
                            El constructor visual de interfaces más potente para Hytale. 
                            Diseña, previsualiza y exporta código DSL en tiempo real.
                        </p>
                        <div className={style.socials}>
                            <a href="https://x.com/" target="_blank" rel="noreferrer"><FaTwitter /></a>
                            <a href="https://discord.gg/" target="_blank" rel="noreferrer"><FaDiscord /></a>
                            <a href="https://github.com/" target="_blank" rel="noreferrer"><FaGithub /></a>
                        </div>
                    </div>

                    {/* Columnas de Links Técnicos */}
                    <div className={style.linksCol}>
                        <h4>PLATAFORMA</h4>
                        <ul>
                            <li><Link to="/">Inicio</Link></li>
                            <li><Link to="/editor">Editor Visual</Link></li>
                            <li><Link to="/components">Librería</Link></li>
                            <li><Link to="/pricing">Planes</Link></li>
                        </ul>
                    </div>

                    <div className={style.linksCol}>
                       <h4>RECURSOS</h4>
                        <ul>
                            <li><a href="#docs">Documentación DSL</a></li>
                            <li><a href="#wiki">Wiki Comunidad</a></li>
                            <li><a href="#api">API Reference</a></li>
                            <li><a href="#tutorials">Tutoriales</a></li>
                        </ul>
                    </div>

                    <div className={style.linksCol}>
                        <h4>HYTALE</h4>
                        <ul>
                            <li><a href="https://hytale.com" target="_blank" rel="noreferrer">Web Oficial</a></li>
                            <li><a href="#marketplace">Marketplace</a></li>
                            <li><a href="#assets">Asset Server</a></li>
                        </ul>
                    </div>
                </div>

                {/* BOTTOM BAR */}
                <div className={style.bottomBar}>
                    <p>WayhomeUI © {year} — Creado para desarrolladores de Hytale.</p>
                    <div className={style.legalLinks}>
                        <Link to="/terms">Términos</Link>
                        <Link to="/privacy">Privacidad</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;