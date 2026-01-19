import style from './forgotpassword.module.scss';
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form"
import { ResetPasswordRequest } from '@/types/user.dto';
import { Input } from '@/components/ui/forms/Input/Input';
import { formRules } from '@/utils/formRules';
import { Link } from 'react-router-dom';
import useForgotPassword from '@/hooks/auth/useForgotPassword';

export default function ForgotPassword() {
    const { t } = useTranslation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordRequest>({
        mode: "onChange"
    });
    const APP_NAME = import.meta.env.VITE_APP_NAME;
    const {error, loading, submitForm} = useForgotPassword()

    return (
        <div className={style.forgotPassContainer}>
            <div className={style.forgotPassCard}>
                <h1 className={style.title}>{APP_NAME}</h1>
                <p className={style.subtitle}>{t('loginPage.welcome',) || 'Bienvenido de nuevo'}</p>

                <form onSubmit={handleSubmit(submitForm)}>
                    
                    {/* Input Email */}
                    <div className={style.inputGroup}>
                        <Input
                            label={t('loginPage.emailLabel') || "Correo Electrónico"}
                            type="email"
                            autoComplete="email"
                            placeholder="ejemplo@correo.com"
                            error={errors.email?.message} // Pasamos el error si existe
                            {...register("email", formRules.email<ResetPasswordRequest>(t))}
                        />
                    </div>

                    {/* Mensaje de Error */}
                    {error && <div className={style.errorMessage}>{error}</div>}

                    {/* Botón Submit */}
                    <button type="submit" disabled={loading} className={style.submitButton}>
                        {t('loginPage.submit') || 'Enviar '}
                    </button>
                    
                    {/* Link Olvidé contraseña */}
                    <div className={style.footerLinks}>
                        <Link 
                            to="/forgot-password"
                        >
                            {t('loginPage.forgot_password') || '¿Olvidaste tu contraseña?'}
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}