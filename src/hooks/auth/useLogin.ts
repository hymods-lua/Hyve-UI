import { useState } from "react";
import { SubmitHandler } from "react-hook-form"
import { useTranslation } from "react-i18next";
import { httpFetch } from '@/api/http/httpClient';
import { LoginResponse, LoginRequest } from "@/types/user.dto";
import { ApiResponse } from "@/types/api";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/useToast";
import { getErrorMessage } from "@/api/http/getErrorMessage";

type useFormReturns = {
    loading: boolean
    error: string
    submitForm: SubmitHandler<LoginRequest>;
}

function useLogin(): useFormReturns {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { t } = useTranslation();
    const { login } = useAuth();
    const { addToast } = useToast();
    const navigate = useNavigate();

    const submitForm: SubmitHandler<LoginRequest> = async (data) => {
        setLoading(true);
        if (!data.email || !data.password) {
            addToast(t('errors.error_empty') || 'Por favor llena todos los campos', 'error')
            setError(t('errors.error_empty') || 'Por favor llena todos los campos');
            return;
        }

        try{
            const res = await httpFetch<ApiResponse<LoginResponse>>(
                '/auth/login', 
                {
                    method: 'POST',
                    body: JSON.stringify(data),
                } 
            )

            if(!res.success || !res.data?.user){
                return;
            }
            if(res.message){
                addToast(res.message, 'success')
            }
            const user = res.data.user;
            login(user)

            navigate('/');
        }
        catch (e: any) {
            const msg = getErrorMessage(e);
            addToast(msg, 'error')
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

export default useLogin;
