import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SubmitHandler } from "react-hook-form"
import { httpFetch } from '@/api/http/httpClient';
import { getErrorMessage } from "@/api/http/getErrorMessage";
import { ResendValidateEmailRequest } from "@/types/user.dto";
import { ApiResponse } from "@/types/api";
import { useToast } from "@/hooks/useToast";

type useVerifyEmailReturns = {
    status: string
    errorMessage: string
    loadingResend: boolean
    submitResend: SubmitHandler<ResendValidateEmailRequest>;
}
type useVerifyEmailProps = {
    token: string | null
}
type VerificationStatus = 'loading' | 'success' | 'error';


function useVerifyEmail({ token }: useVerifyEmailProps): useVerifyEmailReturns {
    const { t } = useTranslation();
    const { addToast } = useToast();
    
    const [status, setStatus] = useState<VerificationStatus>('loading');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [loadingResend, setLoadingResend] = useState<boolean>(false);


     useEffect(() => {
        if (!token) {
            setStatus('error');
            setErrorMessage(t('verifyEmailPage.missingToken') || 'Token no encontrado.');
            return;
        }

        const verifyToken = async () => {
            try {
                await httpFetch('auth/verify-email', {
                    method: 'POST',
                    body: JSON.stringify({ token })
                });

                setStatus('success');
            } catch (error: any) {
                const msg = getErrorMessage(error);
                console.error("Error verifying email", error);
                setStatus('error');

                setErrorMessage(
                    msg || 
                    t('verifyEmailPage.errorTitle') || 
                    'El enlace es inválido o ha expirado.'
                );
            }
        };

        verifyToken();
    }, []);

    const submitResend: SubmitHandler<ResendValidateEmailRequest> = async (data) => {
        setLoadingResend(true);
        if (!data.email) {
            addToast(t('errors.error_empty') || 'Por favor llena todos los campos', 'error')
            return;
        }

        try{
            const res = await httpFetch<ApiResponse<boolean>>(
                '/auth/resend-email-validation', 
                {
                    method: 'POST',
                    body: JSON.stringify(data),
                } 
            )

            if(!res.success){
                return;
            }
            if(res.message){
                addToast(res.message, 'success')
            }
        }
        catch (e: any) {
            const msg = getErrorMessage(e);
            addToast(msg, 'error')
            setLoadingResend(false);
        }
        setLoadingResend(false);
    };

    return {
        status,
        errorMessage,
        loadingResend,
        submitResend
    }
}

export default useVerifyEmail;
