import style from './register.module.scss';
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form"
import useRegister from '@/hooks/auth/useRegister';
import { RegisterRequest } from '@/types/user.dto';
import { Input } from '@/components/ui/forms/Input/Input';
import { formRules } from '@/utils/formRules';
import { Link } from 'react-router-dom';

export default function RegisterForm() {
    const { t } = useTranslation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterRequest>({
        mode: "onChange"
    });
    const APP_NAME = import.meta.env.VITE_APP_NAME;
    const {error, loading, submitForm} = useRegister()

    return (
        <div className={style.registerContainer}>
            <div className={style.registerCard}>
                <h1 className={style.title}>{APP_NAME}</h1>
                <p className={style.subtitle}>{t('loginPage.welcome',) || 'Bienvenido de nuevo'}</p>

                <form onSubmit={handleSubmit(submitForm)}>
                    {/* Name Email */}
                    <div className={style.inputGroup}>
                        <Input
                            label={t('registerPage.emailLabel') || "Correo Electrónico"}
                            type="text"
                            autoComplete="name"
                            placeholder={t('registerPage.namePlaceholder') || "Tu nombre aquí"}
                            error={errors.email?.message}
                            {...register("name", formRules.required<RegisterRequest>(t))}
                        />
                    </div>

                    {/* Input Email */}
                    <div className={style.inputGroup}>
                        <Input
                            label={t('registerPage.emailLabel') || "Correo Electrónico"}
                            type="email"
                            autoComplete="email"
                            placeholder={t('registerPage.emailPlaceholder') || "ejemplo@correo.com"}
                            error={errors.email?.message} // Pasamos el error si existe
                            {...register("email", formRules.email<RegisterRequest>(t))}
                        />
                    </div>

                    {/* Input Password */}
                    <div className={style.inputGroup}>
                        <Input
                            label={t('registerPage.passwordLabel') || "Contraseña"}
                            type="password"
                            placeholder={t('registerPage.passwordPlaceholder') || "******"}
                            error={errors.password?.message}
                            {...register("password", formRules.password<RegisterRequest>(t))}
                        />
                    </div>

                    {/* Mensaje de Error */}
                    {error && <div className={style.errorMessage}>{error}</div>}

                    {/* Botón Submit */}
                    
                    <button type="submit" disabled= {!loading}  className={style.submitButton}>
                        {t('registerPage.submit') || 'Registrarse'}
                    </button>
                    
                    {/* Link Olvidé contraseña */}
                    <div className={style.footerLinks}>
                        <Link 
                            to="/login"
                        >
                            {t('registerPage.haveAccount') || '¿Ya tienes cuenta?'}
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}