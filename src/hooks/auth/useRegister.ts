import { useState } from "react";
import { SubmitHandler } from "react-hook-form"
import { useTranslation } from "react-i18next";
import { httpFetch } from '@/api/http/httpClient';
import { RegisterResponse, RegisterRequest } from "@/types/user.dto";

type useFormReturns = {
    loading: boolean
    error: string
    submitForm: SubmitHandler<RegisterRequest>; 
}

function useRegister(): useFormReturns {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { t } = useTranslation();

    const submitForm: SubmitHandler<RegisterRequest> = async (data) => {
        setLoading(true);
        if (!data.email || !data.password || !data.name) {
            setError(t('errors.error_empty') || 'Por favor llena todos los campos');
            return;
        }

        console.log("Datos enviados:", data);
        const res = await httpFetch<RegisterResponse>(
            '/auth/register', 
            {
                method: 'POST',
                body: JSON.stringify(data),
            } 
        )
        setLoading(false);
        console.log("Datos enviados:", res);
    };

    return {
        loading,
        error,
        submitForm: submitForm
    }
}

export default useRegister;
