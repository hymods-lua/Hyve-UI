import { useState } from "react";
import { SubmitHandler } from "react-hook-form"
import { useTranslation } from "react-i18next";
import { httpFetch } from '@/api/http/httpClient';
import { ResetPasswordRequest } from "@/types/user.dto";
import { ApiResponse } from "@/types/api"

type useFormReturns = {
    loading: boolean
    error: string
    submitForm: SubmitHandler<ResetPasswordRequest>;
}

function useForgotPassword(): useFormReturns {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { t } = useTranslation();

    const submitForm: SubmitHandler<ResetPasswordRequest> = async (data) => {
        setLoading(true);
        if (!data.email) {
            setError(t('errors.error_empty') || 'Por favor llena todos los campos');
            return;
        }

        console.log("Datos enviados:", data);
        try{
            const res = await httpFetch<ApiResponse<boolean>>(
                '/auth/request-password-reset', 
                {
                    method: 'POST',
                    body: JSON.stringify(data),
                } 
            )

            console.log("Datos enviados:", res);

        }
        catch (e) {
            console.error(e);
            setLoading(false);
        }
        setLoading(false);
    };

    return {
        loading,
        error,
        submitForm: submitForm
    }
}

export default useForgotPassword;
