import React from "react";

export interface AuthLayoutProps {
    children?: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ( {children} ) => {
    return (
        <div className="">
            <div className="">
                <main className="">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AuthLayout;