// components/LayoutWrapper.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';

interface LayoutWrapperProps {
  layout: React.ComponentType<{ children: React.ReactNode }>;
  children?: React.ReactNode;
}

export const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ 
  layout: Layout, 
  children 
}) => {
  return (
    <Layout>
      {children || <Outlet />}
    </Layout>
  );
};

// Hook para facilitar el uso
export const useLayoutWrapper = (LayoutComponent: React.ComponentType<{ children: React.ReactNode }>) => {
  return function WrappedLayout({ children }: { children?: React.ReactNode }) {
    return (
      <LayoutWrapper layout={LayoutComponent}>
        {children}
      </LayoutWrapper>
    );
  };
};