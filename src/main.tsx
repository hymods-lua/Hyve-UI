import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './hooks/useAuth';
import { ToastProvider } from './hooks/useToast.tsx';
import App from './App.tsx';
import "./i18n";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ToastProvider>
            <AuthProvider>
                <App />
            </AuthProvider>
        </ToastProvider>
    </React.StrictMode>
)