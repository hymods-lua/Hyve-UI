import style from './verifyemail.module.scss';
import { useTranslation } from "react-i18next";
import { useSearchParams, Link } from 'react-router-dom';
import { FiCheck, FiX, FiLoader  } from "react-icons/fi";
import useVerifyEmail from '@/hooks/auth/useVerifyEmail';
import { Input } from '@/components/ui/forms/Input/Input';
import { useForm } from "react-hook-form"
import { ResendValidateEmailRequest } from '@/types/user.dto';
import { formRules } from '@/utils/formRules';

export default function VerifyEmail() {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const email = searchParams.get('email');
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResendValidateEmailRequest>({
        mode: "onChange",
        defaultValues: {
            email: email || ''
        }
    });

    const {status, errorMessage, submitResend, loadingResend} = useVerifyEmail({token});

    // Renderizado condicional del contenido según el estado
    const renderContent = () => {
        switch (status) {
            case 'loading':
                return (
                    <div className={style.card}>
                        <div className={`${style.iconWrapper} ${style.loading}`}>
                            <FiLoader />
                        </div>
                        <h1 className={style.title}>{t('verifyEmailPage.validating') || 'Validando...'}</h1>
                        <p className={style.message}>
                            {t('verifyEmailPage.waitMoment') || 'Por favor espera mientras verificamos tu cuenta.'}
                        </p>
                    </div>
                );
            
            case 'success':
                return (
                    <div className={style.card}>
                        <div className={`${style.iconWrapper} ${style.success}`}>
                            <FiCheck />
                        </div>
                        <h1 className={style.title}>{t('verifyEmailPage.successTitle') || '¡Email Verificado!'}</h1>
                        <p className={style.message}>
                            {t('verifyEmailPage.successMsg') || 'Tu cuenta ha sido activada correctamente. Ya puedes iniciar sesión.'}
                        </p>
                        <Link to="/login" className={style.button}>
                            {t('verifyEmailPage.loginButton') || 'Iniciar Sesión'}
                        </Link>
                    </div>
                );

            case 'error':
                return (
                    <>
                    <div className={style.card}>
                        <div className={`${style.iconWrapper} ${style.error}`}>
                            <FiX />
                        </div>
                        <h1 className={style.title}>{t('verifyEmailPage.errorTitle') || 'Validación Fallida'}</h1>
                        <p className={style.message}>
                            {errorMessage}
                        </p>
                        <Link to="/login" className={style.button}>
                            {t('verifyEmailPage.backButton') || 'Volver al inicio'}
                        </Link>
                    </div>
                    <div className={style.card}>
                        <h4 className={style.titleResend}>{t('verifyEmailPage.resendTokenTitle')}</h4>
                        <form onSubmit={handleSubmit(submitResend)}>
                            {/* Name Email */}
                            <div className={style.inputGroup}>
                                <Input
                                    label={t('verifyEmailPage.resendTokenEmailLabel') || "Correo electrónico"}
                                    type="email"
                                    autoComplete="email"
                                    placeholder={t('verifyEmailPage.resendTokenEmailPlace') || "usuario@email.com"}
                                    error={errors.email?.message}
                                    {...register("email", formRules.required<ResendValidateEmailRequest>(t))}
                                    />
                            </div>
                            <button type="submit" disabled={loadingResend} className={style.button}>
                                {t('verifyEmailPage.resendTokenButton') || 'Enviar correo'}
                            </button>
                            
                        </form>
                    </div>
                    </>
                );
            default: 
                return (
                    <div className={style.card}>
                        <div className={`${style.iconWrapper} ${style.error}`}>
                            <FiX />
                        </div>
                        <h1 className={style.title}>{t('verifyEmailPage.errorTitle') || 'Validación Fallida'}</h1>
                        <p className={style.message}>
                            {errorMessage}
                        </p>
                        <Link to="/login" className={style.button}>
                            {t('loginPage.submit') || 'Volver al inicio'}
                        </Link>
                    </div>
                );  
        }
    };

    return (
        <div className={style.verifyEmailContainer}>
            {renderContent()}
        </div>
    );
}