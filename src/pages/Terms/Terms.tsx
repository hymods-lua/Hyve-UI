import { useTranslation } from 'react-i18next';
import style from './terms.module.scss';

export default function Terms() {
    const { t } = useTranslation();

    const sections = t("termsPage.sections", { returnObjects: true });

    return (
        <main className={style.termsPage}>
            <div className={style.container}>
                
                {/* Header de la página */}
                <header className={style.header}>
                    <h1 className={style.title}>{t("termsPage.title")}</h1>
                    <p className={style.date}>{t("termsPage.last_updated")}</p>
                </header>

                <div className={style.content}>
                    {/* Introducción */}
                    <p className={style.intro}>{t("termsPage.intro")}</p>
                    
                    {/* Sección Dinámica */}
                    <div className={style.legalBlocks}>
                        {sections.map((section) => (
                            <section key={section.title} className={style.block}>
                                <h2 className={style.blockTitle}>{section.title}</h2>
                                <p className={style.blockText}>{section.content}</p>
                            </section>
                        ))}
                    </div>

                    {/* Footer de contacto */}
                    <div className={style.footerNote}>
                        <h3>{t("termsPage.contact_title")}</h3>
                        <p>{t("termsPage.contact_text")}</p>
                    </div>
                </div>
            </div>
        </main>
    );
}