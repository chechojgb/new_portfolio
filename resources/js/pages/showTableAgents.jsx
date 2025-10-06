import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import AgentPanel from '@/components/tableAgents';

const breadcrumbs = [
    {
        title: 'Tabla de agentes',
        href: '/tablaAgentesAZZU',
    },
];

export default function TableAgents() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="showTableAgents" />
            <AgentPanel/>
        </AppLayout>
    );
}
