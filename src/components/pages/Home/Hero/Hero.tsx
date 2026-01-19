
import { useTranslation } from 'react-i18next';
import style from './hero.module.scss';

export default function Hero () {
    const { t } = useTranslation();
    
    return (
        <section className={style.hero}>
            <div className={style.hero__container}>
                
                {/* LADO IZQUIERDO: TEXTO */}
                <div className={style.hero__content}>
                    <span className={style.hero__badge}>v1.0 Early Access</span>
                    
                    <h1 className={style.hero__title}>
                        HYVE <span>UI</span><br />
                        <span className={style.highlight}>CONSTRUCTOR</span>
                    </h1>
                    
                    <p className={style.hero__description}>
                        La herramienta definitiva para diseñar interfaces de Hytale. 
                        Crea componentes visuales, gestiona estilos dinámicos y exporta 
                        código DSL listo para tu servidor en segundos.
                    </p>
                    
                    <div className={style.hero__actions}>
                        <button className={`${style.btn} ${style.btn__primary}`}>
                            COMENZAR A DISEÑAR
                        </button>
                        <button className={`${style.btn} ${style.btn__outline}`}>
                            DOCUMENTACIÓN DSL
                        </button>
                    </div>
                </div>

                <div className={style.hero__visual}>
                    <div className={style.hero__mockup}>
                        <div className={style.mockup__header}>Preview: AdminPanel.ui</div>
                        <div className={style.mockup__body}>
                            <div className={style.mockup__item}>Group #MyPanel {'{'}</div>
                            <div className={style.mockup__indent}>
                                <div className={style.mockup__prop}>Background: #000000(0.9);</div>
                                <div className={style.mockup__prop}>Anchor: (Width: 500);</div>
                                <div className={style.mockup__label}>Label {"{ Text: 'WAYHOME' }"}</div>
                            </div>
                            <div className={style.mockup__item}>{'}'}</div>
                        </div>
                        <div className={style.mockup__accent}></div>
                    </div>
                </div>

            </div>
        </section>
    );
};
