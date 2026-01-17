// components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { LayoutWrapper } from './LayoutWrapper';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
    children: React.ReactNode;
    layout?: React.ComponentType<{ children: React.ReactNode }>;
    requiredRoles?: string[];
    redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    layout,
    requiredRoles = [],
    redirectTo = '/login'
}) => {
    const { user, isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <div className="p-4">Verificando sesión...</div>; 
    }
    
    if (!isAuthenticated || !user) {
        return <Navigate to={redirectTo}  state={{ from: location.pathname + location.search }} replace />;
    }

    // Verificar roles si se especifican
    if (requiredRoles.length > 0 && user) {
        const hasRequiredRole = requiredRoles.some(role => 
            user.role?.includes(role)
        );
        
        if (!hasRequiredRole) {
            return <Navigate to="/unauthorized" replace />;
        }
    }

    // Renderizar con layout si se proporciona
    if (layout) {
        return (
            <LayoutWrapper layout={layout}>
                {children}
            </LayoutWrapper>
        );
    }

    return <>{children}</>;
};

// Hook personalizado para crear rutas protegidas con layout
export const useProtectedRoute = (
    layout?: React.ComponentType<{ children: React.ReactNode }>,
    requiredRoles?: string[]
) => {
    return function ProtectedLayout({ children }: { children: React.ReactNode }) {
        return (
            <ProtectedRoute layout={layout} requiredRoles={requiredRoles}>
                {children}
            </ProtectedRoute>
        );
    };
};