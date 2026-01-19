// hooks/useAuth.ts
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserCookie } from '@/types/user.dto';
import { httpFetch } from '@/api/http/httpClient';
import { ApiResponse } from '@/types/api';

interface AuthContextType {
    user: UserCookie | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (userData: UserCookie) => void;
    logout: () => void;
    hasRole: (role: string) => boolean;
    hasAnyRole: (roles: string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserCookie | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Validar token y obtener usuario
        validateToken();
    }, []);

    const validateToken = async () => {
        setIsLoading(true);
        try {
            await fetchUser();
        } catch (error) {
            console.warn('Access token inválido o expirado, intentando refresh...', error);

            try {
                const refreshResponse = await httpFetch<ApiResponse<any>>('/auth/refresh', { method: 'POST' });
                
                if (refreshResponse.success) {
                    await fetchUser();
                } else {
                    throw new Error('Refresh token inválido');
                }
            } catch (refreshError) {
                console.error('Sesión expirada completamente', refreshError);
                handleLogoutState();
            }
        } finally {
            setIsLoading(false);
        }
    };

    const fetchUser = async () => {
        const response = await httpFetch<ApiResponse<UserCookie>>('/auth/me');
        
        if (response.success && response.data) {
            setUser(response.data);
            setIsAuthenticated(true);
        } else {
            throw new Error('No se pudo obtener el usuario'); 
        }
    };

    const handleLogoutState = () => {
        setUser(null);
        setIsAuthenticated(false);
    };

    const login = (userData: UserCookie) => {
        setUser(userData);
    };

    const logout = async () => {
        try {
            await httpFetch('/auth/logout', { method: 'POST' });
        } catch (error) {
            console.error('Error al cerrar sesión', error);
        }
        setUser(null);
    };

    const hasRole = (role: string): boolean => {
        return user?.role?.includes(role) ?? false;
    };

    const hasAnyRole = (roles: string[]): boolean => {
        return roles.some(role => hasRole(role));
    };


    const value: AuthContextType = {
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
        hasRole,
        hasAnyRole
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};