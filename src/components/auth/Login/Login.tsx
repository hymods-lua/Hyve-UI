import style from './login.module.scss';
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form"
import useLogin from '@/hooks/auth/useLogin';
import { LoginRequest } from '@/types/user.dto';
import { Input } from '@/components/ui/forms/Input/Input';
import { formRules } from '@/utils/formRules';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export default function LoginForm() {
    const { t } = useTranslation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginRequest>({
        mode: "onChange"
    });

    const {error, loading, submitForm} = useLogin();
    const {isLoading, isAuthenticated, user} = useAuth();
    const APP_NAME = import.meta.env.VITE_APP_NAME;

    if (isLoading) {
        return <div className="p-4">Verificando sesión...</div>; 
    }
    
    if (isAuthenticated || user) {
        return <Navigate to={'/'}  replace />;
    }

    return (
        <div className={style.loginContainer}>
            <div className={style.loginCard}>
                <h1 className={style.title}><Link to="/">{APP_NAME}</Link></h1>
                <p className={style.subtitle}>{t('loginPage.welcome') || 'Bienvenido de nuevo'}</p>

                <form onSubmit={handleSubmit(submitForm)}>
                    {/* Input Email */}
                    <div className={style.inputGroup}>
                        <Input
                            label={t('loginPage.emailLabel') || "Correo Electrónico"}
                            type="email"
                            autoComplete="email"
                            placeholder="ejemplo@correo.com"
                            error={errors.email?.message}
                            {...register("email", formRules.email<LoginRequest>(t))}
                        />
                    </div>

                    {/* Input Password */}
                    <div className={style.inputGroup}>
                        <Input
                            label={t('loginPage.passwordLabel') || "Contraseña"}
                            type="password"
                            autoComplete="new-password"
                            placeholder="******"
                            error={errors.password?.message}
                            {...register("password", formRules.password<LoginRequest>(t))}
                        />
                    </div>
                    {/* Mensaje de Error */}
                    {error && <div className={style.errorMessage}>{error}</div>}

                    <button type="submit" disabled={loading} className={style.submitButton}>
                        {t('loginPage.submit') || 'Iniciar Sesión'}
                    </button>
                    {/* Link Olvidé contraseña */}
                    <div className={style.footerLinks}>
                        <Link 
                            to="/forgot-password"
                        >
                            {t('loginPage.forgot_password') || '¿Olvidaste tu contraseña?'}
                        </Link>
                        <Link 
                            to="/register"
                        >
                            {t('loginPage.forgot_password') || '¿Olvidaste tu contraseña?'}
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}