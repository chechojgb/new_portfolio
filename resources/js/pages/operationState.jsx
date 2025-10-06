import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import CallsPerOperationChart from '@/components/welcome/callPerOperationChart';
import { LoadProvider } from '@/components/context/loadContext';
import { Dropdown, DropdownDivider, DropdownItem } from "flowbite-react";
import { useState, useEffect, useRef } from 'react';
import { useLoadStatus } from '@/components/context/loadContext';
import { themeByProject } from '@/components/utils/theme';
import { usePage } from "@inertiajs/react";
import TiempoFormateado from '@/components/utils/formatTime';
import AgentModalWrapper from '@/components/agentsModalWrapper';
import useOperationModal from '@/hooks/useOperationModal';
import ModalColasAgent from '@/components/queuesAgentsModal';

import {
    Hourglass,
    Glasses,
    CircleDashed,
    CircleFadingPlus
} from 'lucide-react';

const breadcrumbs = [
    {
        title: 'Llamadas en espera por operación',
        href: '/estadoOperacionesAZZU',
    },
];

export default function CallsWaitingByOperation() {
    const [operation, setOperation] = useState(null);
    const [stats, setStats] = useState({ detalle_colas: [] });
    const [promedio, setPromedio] = useState({});
    const [estadoAgentes, setEstadoAgentes] = useState({ total: {} });
    const { props } = usePage();
    const proyecto = props?.auth?.user?.proyecto || 'AZZU';
    const theme = themeByProject[proyecto];
    const { modal, showModal, hideModal } = useOperationModal();
    const intervalRef = useRef(null);

    // Operaciones disponibles
    const userOps = ['Soporte Técnico', 'Ventas', 'Retención', 'Atención al Cliente', 'Emergencias'];

    // Base de datos de agentes completa
    const baseAgentsData = {
        'Ana García': { extension: '1001', colas: ['SOP01', 'SOP02'], estado: 'disponible' },
        'Carlos López': { extension: '1002', colas: ['SOP01', 'SOP03'], estado: 'disponible' },
        'María Rodríguez': { extension: '1003', colas: ['SOP02', 'SOP03'], estado: 'ocupado' },
        'Juan Martínez': { extension: '1004', colas: ['VNT01', 'VNT02'], estado: 'ocupado' },
        'Laura Hernández': { extension: '1005', colas: ['VNT01', 'VNT03'], estado: 'en_pausa' },
        'Pedro Sánchez': { extension: '1006', colas: ['VNT02', 'VNT03'], estado: 'disponible' },
        'Sofía Díaz': { extension: '1007', colas: ['RET01'], estado: 'disponible' },
        'Miguel Torres': { extension: '1008', colas: ['RET01', 'RET02'], estado: 'ocupado' },
        'Elena Castro': { extension: '1009', colas: ['ATC01'], estado: 'ocupado' },
        'David Romero': { extension: '1010', colas: ['ATC01', 'ATC02'], estado: 'disponible' },
        'Carmen Vargas': { extension: '1011', colas: ['ATC02'], estado: 'en_pausa' },
        'Jorge Navarro': { extension: '1012', colas: ['EMG01'], estado: 'ocupado' },
        'Lucía Morales': { extension: '1013', colas: ['SOP01', 'EMG01'], estado: 'disponible' },
        'Raúl Ortega': { extension: '1014', colas: ['VNT01', 'ATC01'], estado: 'ocupado' },
        'Patricia Silva': { extension: '1015', colas: ['RET02'], estado: 'en_pausa' },
        'Fernando Reyes': { extension: '1016', colas: ['EMG01'], estado: 'disponible' },
        'Isabel Mendoza': { extension: '1017', colas: ['SOP03', 'EMG01'], estado: 'ocupado' },
        'Roberto Castro': { extension: '1018', colas: ['VNT03'], estado: 'disponible' },
        'Mónica Ruiz': { extension: '1019', colas: ['ATC02'], estado: 'ocupado' },
        'Gabriel Soto': { extension: '1020', colas: ['RET01'], estado: 'en_pausa' }
    };

    // Mapeo de operaciones a colas
    const operationQueuesMap = {
        'Soporte Técnico': ['SOP01', 'SOP02', 'SOP03'],
        'Ventas': ['VNT01', 'VNT02', 'VNT03'],
        'Retención': ['RET01', 'RET02'],
        'Atención al Cliente': ['ATC01', 'ATC02'],
        'Emergencias': ['EMG01']
    };

    // Datos base para las colas por operación
    const baseOperationData = {
        'Soporte Técnico': {
            colas: [
                { cola: 'SOP01', llamadas: 3, agentes_totales: 8, agentes_ocupados: 5, agentes_disponibles: 3 },
                { cola: 'SOP02', llamadas: 1, agentes_totales: 6, agentes_ocupados: 4, agentes_disponibles: 2 },
                { cola: 'SOP03', llamadas: 0, agentes_totales: 4, agentes_ocupados: 2, agentes_disponibles: 2 }
            ],
            promedio: {
                promedio_respuesta_hora: 45,
                promedio_respuesta_dia: 120,
                maximo_respuesta: 300
            }
        },
        'Ventas': {
            colas: [
                { cola: 'VNT01', llamadas: 5, agentes_totales: 10, agentes_ocupados: 7, agentes_disponibles: 3 },
                { cola: 'VNT02', llamadas: 2, agentes_totales: 8, agentes_ocupados: 5, agentes_disponibles: 3 },
                { cola: 'VNT03', llamadas: 1, agentes_totales: 6, agentes_ocupados: 4, agentes_disponibles: 2 }
            ],
            promedio: {
                promedio_respuesta_hora: 30,
                promedio_respuesta_dia: 90,
                maximo_respuesta: 180
            }
        },
        'Retención': {
            colas: [
                { cola: 'RET01', llamadas: 2, agentes_totales: 5, agentes_ocupados: 3, agentes_disponibles: 2 },
                { cola: 'RET02', llamadas: 0, agentes_totales: 4, agentes_ocupados: 2, agentes_disponibles: 2 }
            ],
            promedio: {
                promedio_respuesta_hora: 60,
                promedio_respuesta_dia: 150,
                maximo_respuesta: 240
            }
        },
        'Atención al Cliente': {
            colas: [
                { cola: 'ATC01', llamadas: 4, agentes_totales: 12, agentes_ocupados: 8, agentes_disponibles: 4 },
                { cola: 'ATC02', llamadas: 1, agentes_totales: 8, agentes_ocupados: 5, agentes_disponibles: 3 }
            ],
            promedio: {
                promedio_respuesta_hora: 25,
                promedio_respuesta_dia: 80,
                maximo_respuesta: 160
            }
        },
        'Emergencias': {
            colas: [
                { cola: 'EMG01', llamadas: 1, agentes_totales: 6, agentes_ocupados: 4, agentes_disponibles: 2 }
            ],
            promedio: {
                promedio_respuesta_hora: 15,
                promedio_respuesta_dia: 45,
                maximo_respuesta: 90
            }
        }
    };

    // Función para obtener agentes por operación y estado
    const getAgentsByOperationAndStatus = (operation, status) => {
        const operationQueues = operationQueuesMap[operation] || [];
        
        return Object.entries(baseAgentsData)
            .filter(([nombre, datos]) => 
                datos.estado === status && 
                datos.colas.some(cola => operationQueues.includes(cola))
            )
            .map(([nombre, datos]) => ({
                usuario: nombre,
                extension: datos.extension,
                colas: datos.colas.filter(cola => operationQueues.includes(cola)),
                estado: datos.estado
            }));
    };

// Función para contar agentes por estado en una operación - CORREGIDA
    const countAgentsByStatus = (operation) => {
        const operationQueues = operationQueuesMap[operation] || [];
        
        const counts = { disponibles: 0, ocupados: 0, en_pausa: 0 };
        
        Object.values(baseAgentsData).forEach(agente => {
            if (agente.colas.some(cola => operationQueues.includes(cola))) {
                if (agente.estado === 'disponible') counts.disponibles++;
                else if (agente.estado === 'ocupado') counts.ocupados++;
                else if (agente.estado === 'en_pausa') counts.en_pausa++;
            }
        });
        
        return counts;
    };

    // Función para generar variaciones en los datos
    const generateDataVariations = (selectedOp) => {
        if (!selectedOp) return;
        
        const baseData = baseOperationData[selectedOp];
        if (!baseData) return;

        // Generar variaciones en las colas
        const nuevasColas = baseData.colas.map(cola => ({
            ...cola,
            llamadas: Math.max(0, cola.llamadas + (Math.random() < 0.4 ? (Math.random() > 0.5 ? 1 : -1) : 0)),
            agentes_ocupados: Math.max(0, cola.agentes_ocupados + (Math.random() < 0.3 ? (Math.random() > 0.5 ? 1 : -1) : 0)),
            agentes_disponibles: Math.max(0, cola.agentes_totales - cola.agentes_ocupados)
        }));

        // Generar variaciones en promedios
        const nuevosPromedios = {
            ...baseData.promedio,
            promedio_respuesta_hora: Math.max(10, baseData.promedio.promedio_respuesta_hora + (Math.random() < 0.4 ? (Math.random() > 0.5 ? 5 : -5) : 0))
        };

        // Obtener agentes por estado para esta operación
        const agentCounts = countAgentsByStatus(selectedOp);
        const agentesData = {
            total: agentCounts,
            disponibles: getAgentsByOperationAndStatus(selectedOp, 'disponible'),
            ocupados: getAgentsByOperationAndStatus(selectedOp, 'ocupado'),
            en_pausa: getAgentsByOperationAndStatus(selectedOp, 'en_pausa')
        };

        setStats({ detalle_colas: nuevasColas });
        setPromedio(nuevosPromedios);
        setEstadoAgentes(agentesData);
    };

    const startPolling = (selectedOp) => {
        setOperation(selectedOp);
        generateDataVariations(selectedOp);
    };

    useEffect(() => {
        // Configurar intervalo para actualizaciones automáticas cada 6-9 segundos
        intervalRef.current = setInterval(() => {
            if (operation) {
                generateDataVariations(operation);
            }
        }, 6000 + Math.random() * 3000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [operation]);

    const customTheme = {
        root: {
            base: 'relative inline-block text-left',
        },
        floating: {
            target: `${theme.bgHard} ${theme.bgHover}/80 focus:ring-none dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-400 dark:border-gray-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center z-50`,
            item: {
                base: 'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white w-full text-left z-50',
            },
        },
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Llamadas en espera por operación"/>
            <div className="p-6 space-y-6">
                <h1 className="text-lg font-semibold border-b border-gray-300 dark:border-gray-600 pb-2 mb-2 flex items-center gap-2"><Hourglass/> Llamadas en espera por operación</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl">
                    Esta sección muestra la cantidad de llamadas actualmente en espera, segmentadas por cada operación. Permite identificar rápidamente las áreas con mayor demanda y tomar decisiones para optimizar la atención.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="relative rounded-xl border border-sidebar-border/70 dark:border-sidebar-border shadow-lg">
                        <LoadProvider total={1}>
                            <CallsPerOperationChart />
                        </LoadProvider>
                    </div>

                    <div className=" p-6 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border shadow-lg flex flex-col justify-between h-full ">
                        <div className="flex flex-col gap-2 mb-4">
                            <Dropdown label={operation || "Selecciona la operación"} theme={customTheme}>
                            {userOps.map((op) => (
                                <DropdownItem key={op} onClick={() => startPolling(op)}>
                                {op}
                                </DropdownItem>
                            ))}
                            </Dropdown>

                            {!operation ? 
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Resumen de llamadas en espera</h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Selecciona una operación para ver más detalles.
                                    </p>
                                </div> : ``
                            }
                        </div>
                        
                        {!operation ? 
                            <div className="flex-1 flex items-center justify-center min-h-[80px] text-gray-400 dark:text-gray-500">
                                 Sin operación seleccionada
                            </div> : 
                            <div className="flex flex-col gap-2 mb-2">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                Desglose de llamadas y agentes por cola en la operación <strong>{operation}</strong>.
                                </p>
                            </div>
                        }
                        

                        <div className="max-h-[300px] overflow-y-auto space-y-4">
                            {stats.detalle_colas && stats.detalle_colas
                                .sort((a, b) => b.llamadas - a.llamadas)
                                .map((cola) => {
                                    let containerClass = "p-3 rounded-lg border mb-4 transition-colors ";

                                    if (cola.llamadas > 5) {
                                        containerClass += "border-red-500 dark:border-red-600 bg-red-50 dark:bg-red-900/10 text-red-800 dark:text-red-300";
                                    } else if (cola.llamadas >= 1) {
                                        containerClass += "border-blue-500 dark:border-blue-600 bg-blue-50 dark:bg-blue-900/10 text-blue-800 dark:text-blue-300";
                                    } else {
                                        containerClass += "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white";
                                    }

                                    return (
                                        <div key={cola.cola} className={containerClass}>
                                            <div className="flex justify-between items-center mb-1">
                                                <h4 className="font-semibold flex items-center gap-2">
                                                    <CircleDashed className={`${theme.text}`} />
                                                    Cola {cola.cola}
                                                </h4>
                                                <span className="text-xs font-semibold">
                                                    {cola.llamadas} llamadas
                                                </span>
                                            </div>
                                            <div className="grid grid-cols-3 gap-2 text-xs">
                                                <p>Total: <strong>{cola.agentes_totales}</strong></p>
                                                <p>Ocupados: <strong>{cola.agentes_ocupados}</strong></p>
                                                <p>Disponibles: <strong>{cola.agentes_disponibles}</strong></p>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>

                        <div className="mt-6 text-xs text-gray-400 dark:text-gray-500">
                            🔄 Datos simulados - Actualizándose automáticamente cada 6-9 segundos
                        </div>
                    </div>
                </div>

               {!operation  ? (
                    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><Glasses/> Análisis detallado por operación</h2>
                        <div className="h-64 flex flex-col items-center justify-center text-center text-sm text-gray-400 dark:text-gray-500">
                            <p className="mb-2">Aún no has seleccionado una operación.</p>
                            <p>Selecciona una operación para ver información detallada sobre tiempos de espera y agentes conectados.</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Columna 1: Tiempo promedio de espera */}
                        <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow">
                            <div className="flex flex-col items-start gap-2">
                                <p className={`${theme.text} text-3xl font-semibold`}>
                                    <TiempoFormateado tiempo={promedio.promedio_respuesta_hora} />
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Promedio actual en la operación <strong>{operation}</strong>
                                </p>
                                <div className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                                    Máximo histórico hoy: <TiempoFormateado tiempo={promedio.promedio_respuesta_dia} /> <br />
                                    Tiempo maximo de respuesta hoy: <TiempoFormateado tiempo={promedio.maximo_respuesta} /><br />
                                    Objetivo ideal: ≤ 01:00
                                </div>
                            </div>
                        </div>

                        {/* Columna 2: Agentes conectados */}
                        <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow">
                            <div className="flex flex-col gap-2">
                                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {estadoAgentes.total.disponibles + estadoAgentes.total.ocupados + estadoAgentes.total.en_pausa} agentes conectados (selecciona el estado para ver los agentes en este)                                </p>
                                <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                                    <li className='cursor-pointer hover:underline' onClick={() => showModal('disponibles')}>
                                        🟢 {estadoAgentes.total.disponibles} disponibles
                                    </li>
                                    <li className='cursor-pointer hover:underline' onClick={() => showModal('ocupados')}>
                                        🔴 {estadoAgentes.total.ocupados} ocupados
                                    </li>
                                    <li className='cursor-pointer hover:underline' onClick={() => showModal('en_pausa')}>
                                        🟡 {estadoAgentes.total.en_pausa} en pausa
                                    </li>
                                </ul>
                                <div className="mt-3">
                                    <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">Has click en el status que desees para obtener mas informacion</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {modal.show && (
                    <AgentModalWrapper closeModal={hideModal}>
                        <ModalColasAgent
                            titulo={`Agentes ${modal.tipo?.replace('_', ' ')} - ${operation}`}
                            tipo={modal.tipo}
                            usuarios={estadoAgentes[modal.tipo] ?? []}
                        />
                    </AgentModalWrapper>
                )}
            </div>
        </AppLayout>
    );
}