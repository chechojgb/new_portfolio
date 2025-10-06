import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';
import AvisoEjemploAZZU from '@/components/avisoEjemploAzzu';

interface AppLayoutProps {
  children: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

function AppLayout({ children, breadcrumbs, ...props }: AppLayoutProps) {
  return (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
      {/* Aviso global arriba */}
      <AvisoEjemploAZZU />

      {/* Contenido real */}
      {children}
    </AppLayoutTemplate>
  );
}

export default AppLayout;
