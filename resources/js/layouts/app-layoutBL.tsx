import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import AppSidebarLayoutBL from './app/app-sidebar-layoutBL';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';
import AvisoEjemplo from '@/components/avisoEjemplo';

interface AppLayoutProps {
  children: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

function AppLayoutBL({ children, breadcrumbs, ...props }: AppLayoutProps) {
  return (
    <AppSidebarLayoutBL breadcrumbs={breadcrumbs} {...props}>
      {/* Aviso global arriba */}
      <AvisoEjemplo />

      {/* Contenido real */}
      {children}
    </AppSidebarLayoutBL>
  );
}

export default AppLayoutBL;
