import { createBrowserRouter } from 'react-router-dom';
import React, { Suspense } from 'react';
import { PATHS } from './paths';

// Componentes de utilidad
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { LayoutWrapper } from '@/components/LayoutWrapper';

import EditorLayout from '@/layouts/EditorLayout/EditorLayout';
import PublicLayout from '@/layouts/PublicLayout/PublicLayout';
import AuthLayout from '@/layouts/AuthLayout/AuthLayout';
import NotFount from '@/components/layouts/NotFound/NotFound';
import Loader from '@/components/layouts/Loader/Loader';

const Home = React.lazy(() => import('@/pages/Home/Home'));
const Editor = React.lazy(() => import('@/pages/Editor/EditorPage'));
const Terms = React.lazy(() => import('@/pages/Terms/Terms'));
const Login = React.lazy(() => import('@/pages/auth/LoginPage'));
const Register = React.lazy(() => import('@/pages/auth/RegisterPage'));
const VerifyEmail = React.lazy(() => import('@/pages/auth/VerifyEmailPage'));
const ForgotPassword = React.lazy(() => import('@/pages/auth/ForgotPassword'));
const Profile = React.lazy(() => import('@/pages/user/Profile/Profile'));

// Componente de carga mientras llega el chunk JS
const PageLoader = () => <Loader />;

export const router = createBrowserRouter([
    {
        path: PATHS.HOME,
        element: (
            <LayoutWrapper layout={PublicLayout}>
                <Suspense fallback={<PageLoader />}>
                    <Home />
                </Suspense>
            </LayoutWrapper>
        ),
    },
    {
        path: PATHS.TERMS,
        element: (
            <LayoutWrapper layout={PublicLayout}>
                <Suspense fallback={<PageLoader />}>
                    <Terms />
                </Suspense>
            </LayoutWrapper>
        ),
    },
    {
        path: PATHS.EDITOR,
        element: (
            <LayoutWrapper layout={EditorLayout}>
                <Suspense fallback={<PageLoader />}>
                    <Editor />
                </Suspense>
            </LayoutWrapper>
        ),
    },
    // --- RUTAS DE AUTENTICACIÓN ---
    {
        path: PATHS.LOGIN,
        element: (
            <LayoutWrapper layout={AuthLayout}>
                <Suspense fallback={<PageLoader />}>
                    <Login />
                </Suspense>
            </LayoutWrapper>
        ),
    },
    {
        path: PATHS.REGISTER,
        element: (
            <LayoutWrapper layout={AuthLayout}>
                <Suspense fallback={<PageLoader />}>
                    <Register />
                </Suspense>
            </LayoutWrapper>
        ),
    },
    {
        path: PATHS.VERIFYEMAIL,
        element: (
            <LayoutWrapper layout={AuthLayout}>
                <Suspense fallback={<PageLoader />}>
                    <VerifyEmail />
                </Suspense>
            </LayoutWrapper>
        ),
    },
    {
        path: PATHS.FORGOTPASSWORD,
        element: (
            <LayoutWrapper layout={AuthLayout}>
                <Suspense fallback={<PageLoader />}>
                    <ForgotPassword />
                </Suspense>
            </LayoutWrapper>
        ),
    },
    // --- RUTAS PROTEGIDAS (USUARIOS) ---
    {
        path: PATHS.PROFILE,
        element: ( 
            <ProtectedRoute layout={PublicLayout}>
                <Suspense fallback={<PageLoader />}>
                    <Profile />
                </Suspense>
            </ProtectedRoute>
        ),
    },

    // --- RUTAS ADMIN ---
    /*
    {
        path: '/admin',
        element: <ProtectedRoute requiredRoles={['admin']} />,
        children: [
        {
            path: 'users', // Se concatena a /admin/users
            element: (
                <LayoutWrapper layout={DashboardLayout}>
                    <Suspense fallback={<PageLoader />}><Users /></Suspense>
                </LayoutWrapper>
            )
        }
        ]
    },
    */

    // --- 404 NOT FOUND ---
    {
        path: '*',
        element: (
            <NotFount/>
        ),
    },
]);