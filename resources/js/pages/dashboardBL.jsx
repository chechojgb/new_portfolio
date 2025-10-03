import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayoutbl from '@/layouts/app-layoutBL';
import { dashboard } from '@/routes';
import { Head } from '@inertiajs/react';
import MovimientosRecientesBL from '@/components/BL/MovimientosRecientes';
import StockActualProductosBL from '@/components/BL/StockActualProductosBL';
import RankingBotonesVendidosBL from '@/components/BL/RankingBotonesVendidosBL';
import OrdenesPendientesBL from '@/components/BL/OrdenesPendientesBL';
import GraficoProduccionSemanalBL from '@/components/BL/GraficoProduccionSemanal';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayoutbl breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
                <div className='flex flex-col flex-1 gap-4 rounded-xl p-4 min-h-screen'>
                    <div className="grid grid-cols-1 md:grid-cols-[7fr_3fr] gap-4 flex-1">
                    {/* Panel 70% */}
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border min-h-[300px]">
                        <GraficoProduccionSemanalBL />
                    </div>

                    {/* Panel 30% */}
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border min-h-[300px]">
                        <MovimientosRecientesBL />
                    </div>
                    </div>

                    <div className="grid auto-rows-fr gap-4 md:grid-cols-3 flex-1">
                        <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border ">
                            <StockActualProductosBL />
                        </div>
                        <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border">
                            <RankingBotonesVendidosBL />
                        </div>
                        <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border ">
                            <OrdenesPendientesBL />
                        </div>
                    </div>
                    
                </div>

        </AppLayoutbl>
    );
}
