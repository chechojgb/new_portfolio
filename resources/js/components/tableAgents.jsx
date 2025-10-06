import React, { useState, useEffect, useRef } from 'react';
import { usePage } from "@inertiajs/react";
import { Dropdown, DropdownDivider, DropdownItem } from "flowbite-react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import AgentModalWrapper from '@/components/agentsModalWrapper';
import AgentModalContent from '@/components/agentsModalContent';
import ContentTableAgents from '@/components/contentTableAgents';
import { useLoadStatus } from './context/loadContext';
import { themeByProject } from './utils/theme';

const AgentPanel = () => {
    const { props } = usePage();
    const proyecto = props?.auth?.user?.proyecto || 'AZZU';
    const theme = themeByProject[proyecto];
    const [modalOpen, setModalOpen] = useState(false);
    const [activeExtension, setActiveExtension] = useState(null);
    const [search, setSearch] = useState('');
    const [agents, setAgents] = useState([]);
    const [stats, setStats] = useState({ 
        total: 12, 
        Busy: 3, 
        'On Hold': 2, 
        'In call': 4, 
        'Ringing': 1, 
        'Not in use': 2 
    });
    const [operation, setOperation] = useState('Ventas');
    const intervalRef = useRef(null);

    // Datos base de agentes - SOLO PARA INICIALIZACIÓN
    const baseAgents = [
        { extension: '1001', member: { nombre: 'Ana García', estado: 'In call' }, accountcode: '2h 15m' },
        { extension: '1002', member: { nombre: 'Carlos López', estado: 'Busy' }, accountcode: '1h 45m' },
        { extension: '1003', member: { nombre: 'María Rodríguez', estado: 'On Hold' }, accountcode: '3h 20m' },
        { extension: '1004', member: { nombre: 'Juan Martínez', estado: 'Not in use' }, accountcode: '0h 30m' },
        { extension: '1005', member: { nombre: 'Laura Hernández', estado: 'Ringing' }, accountcode: '2h 05m' },
        { extension: '1006', member: { nombre: 'Pedro Sánchez', estado: 'In call' }, accountcode: '4h 10m' },
        { extension: '1007', member: { nombre: 'Sofía Díaz', estado: 'Busy' }, accountcode: '1h 55m' },
        { extension: '1008', member: { nombre: 'Miguel Torres', estado: 'Not in use' }, accountcode: '0h 45m' },
        { extension: '1009', member: { nombre: 'Elena Castro', estado: 'On Hold' }, accountcode: '2h 50m' },
        { extension: '1010', member: { nombre: 'David Romero', estado: 'In call' }, accountcode: '3h 35m' }
    ];

    // Operaciones disponibles
    const userOps = ['Soporte Técnico', 'Ventas', 'Retención', 'Atención al Cliente', 'Emergencias'];

    // Stats base por operación
    const baseOperationStats = {
        'Soporte Técnico': { total: 8, Busy: 2, 'On Hold': 1, 'In call': 3, 'Ringing': 1, 'Not in use': 1 },
        'Ventas': { total: 12, Busy: 3, 'On Hold': 2, 'In call': 4, 'Ringing': 1, 'Not in use': 2 },
        'Retención': { total: 6, Busy: 1, 'On Hold': 2, 'In call': 2, 'Ringing': 0, 'Not in use': 1 },
        'Atención al Cliente': { total: 10, Busy: 2, 'On Hold': 3, 'In call': 3, 'Ringing': 1, 'Not in use': 1 },
        'Emergencias': { total: 4, Busy: 1, 'On Hold': 0, 'In call': 2, 'Ringing': 1, 'Not in use': 0 }
    };

    // Estados que NO deben acumular tiempo de conexión
    const estadosSinTiempo = ['Not in use', 'Ringing'];

    // Función para generar variaciones en los estados de los agentes - CORREGIDA
    const generateAgentVariations = (currentAgents) => {
        const estados = ['In call', 'Busy', 'On Hold', 'Not in use', 'Ringing'];
        
        return currentAgents.map(agent => {
            // 30% de probabilidad de cambiar el estado
            const nuevoEstado = Math.random() < 0.3 
                ? estados[Math.floor(Math.random() * estados.length)]
                : agent.member.estado;

            // Solo incrementar tiempo si el agente está en un estado activo
            let nuevoTiempo = agent.accountcode;
            
            if (!estadosSinTiempo.includes(nuevoEstado)) {
                const tiempoActual = agent.accountcode.split(' ');
                let horas = parseInt(tiempoActual[0]);
                let minutos = parseInt(tiempoActual[1]);
                
                // Añadir entre 1-5 minutos solo para estados activos
                minutos += 1 + Math.floor(Math.random() * 5);
                if (minutos >= 60) {
                    horas += 1;
                    minutos -= 60;
                }
                
                nuevoTiempo = `${horas}h ${minutos.toString().padStart(2, '0')}m`;
            }
            // Para "Not in use" y "Ringing", mantener el tiempo actual sin cambios

            return {
                ...agent,
                member: {
                    ...agent.member,
                    estado: nuevoEstado
                },
                accountcode: nuevoTiempo
            };
        });
    };

    // Función para generar variaciones en las estadísticas
    const generateStatsVariations = (operation) => {
        const baseStats = baseOperationStats[operation] || baseOperationStats['Ventas'];
        
        // Primero creamos las nuevas stats con variaciones
        const newStats = Object.keys(baseStats).reduce((acc, key) => {
            if (key === 'total') {
                // El total se calculará después
                acc[key] = baseStats[key];
                return acc;
            }
            
            // Variación pequeña (±1) con 40% de probabilidad
            const variacion = Math.random() < 0.4 ? (Math.random() > 0.5 ? 1 : -1) : 0;
            acc[key] = Math.max(0, baseStats[key] + variacion);
            return acc;
        }, {});
        
        // Recalcular el total basado en los otros estados
        const { total, ...otros } = newStats;
        newStats.total = Object.values(otros).reduce((sum, val) => sum + val, 0);
        
        return newStats;
    };

    // Función para actualizar todos los datos - CORREGIDA
    const updateAllData = (selectedOp = operation) => {
        setAgents(currentAgents => {
            const nuevosAgentes = generateAgentVariations(currentAgents.length > 0 ? currentAgents : baseAgents);
            
            // También actualizar stats basado en los nuevos estados
            const nuevosEstados = nuevosAgentes.reduce((acc, agent) => {
                acc[agent.member.estado] = (acc[agent.member.estado] || 0) + 1;
                return acc;
            }, {});
            
            const nuevasStats = {
                total: nuevosAgentes.length,
                Busy: nuevosEstados['Busy'] || 0,
                'On Hold': nuevosEstados['On Hold'] || 0,
                'In call': nuevosEstados['In call'] || 0,
                'Ringing': nuevosEstados['Ringing'] || 0,
                'Not in use': nuevosEstados['Not in use'] || 0
            };
            
            setStats(nuevasStats);
            return nuevosAgentes;
        });
    };

    const initializeData = (selectedOp) => {
        setOperation(selectedOp);
        // Inicializar con los agentes base
        setAgents(baseAgents);
        setStats(baseOperationStats[selectedOp] || baseOperationStats['Ventas']);
    };

    useEffect(() => {
        // Inicializar con datos por defecto
        initializeData('Ventas');

        // Configurar intervalo para actualizaciones automáticas cada 5-8 segundos
        intervalRef.current = setInterval(() => {
            updateAllData();
        }, 5000 + Math.random() * 3000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    const openModal = (agent) => {
        if (!agent || !agent.extension) {
            console.warn('No se puede abrir el modal: agente inválido');
            return;
        }
        
        console.log('Abriendo modal para:', agent.member?.nombre);
        setActiveExtension(agent.extension);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const getActiveAgent = () => agents.find(a => a.extension === activeExtension) || {};

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
        <div className="rounded-lg mt-4 relative shadow-md sm:rounded-lg px-4 mb-16">
            
            <div className="flex flex-wrap items-center px-4 py-2 text-sm dark:bg-gray-900 break-words max-w-full">
                <a href="/table/agents" className={`${theme.text} `}>Tablas</a>
                <span className="mx-2 text-gray-500">/</span>
                <span>Agentes</span>
                <span className="mx-2 text-gray-500">{operation ? `/` : ''}</span>
                <span>{operation ? ` ${operation}` : ''}</span>
            </div>

            <div className="overflow-hidden shadow-sm pb-60">
                <div className="flex flex-col lg:flex-row flex-wrap items-start lg:items-center justify-between gap-4 px-4 pb-4 pt-2 ">
                    <div className="w-full lg:w-auto mb-2 relative [&_.dropdown-menu]:w-auto [&_.dropdown-menu]:max-w-xs [&_.dropdown-menu]:mx-auto [&_.dropdown-menu]:z-50">
                        <Dropdown
                            label={operation || "Selecciona la operación"}
                            theme={customTheme}
                            className={`w-full dark:bg-gray-900 `}
                        >
                            {userOps.map((op) => (
                                <DropdownItem
                                    key={op}
                                    onClick={() => initializeData(op)}
                                    className='z-99'
                                >
                                    {op}
                                </DropdownItem>
                            ))}
                        </Dropdown>
                    </div>
                    <div className="flex-1 flex justify-center">
                        <div className="grid grid-cols-3 sm:grid-cols-4 xl:grid-cols-6 gap-4 max-w-full">
                            {Object.entries(stats).map(([key, value]) => (
                                <div
                                    key={key}
                                    className="text-center border border-gray-200 dark:border-gray-700 
                                            rounded-xl px-4 py-2 shadow transition-all duration-300 hover:scale-105"
                                >
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{key}</p>
                                    <p
                                        className={`text-lg font-semibold cursor-pointer ${getStatusClass(key)}`}
                                        onClick={() => key === 'total' ? setSearch('') : setSearch(key)}
                                    >
                                        {value}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full sm:w-auto">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full sm:w-64 block p-2 pl-10 text-sm text-gray-900 border border-gray-200 rounded-xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white shadow"
                            placeholder="Buscar agente..."
                        />
                    </div>
                </div>
                
                {/* Indicador de actualización automática */}
                <div className="px-4 pb-2">
                    <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                        Datos actualizándose automáticamente cada 5-8 segundos
                    </div>
                </div>

                <ContentTableAgents
                    data={agents}
                    search={search}
                    openModal={openModal}
                    getStatusClass={getStatusClass}
                />
            </div>

            {/* Modal (comentado como en el original) */}
            {modalOpen && (
                <AgentModalWrapper closeModal={closeModal}>
                    <AgentModalContent agent={getActiveAgent()} onClose={closeModal} />
                </AgentModalWrapper>
            )}
        </div>
    );
};

const getStatusClass = (status) => {
    switch (status) {
        case 'total':
            return 'text-blue-500';
        case 'Busy':
            return 'text-yellow-400';
        case 'On Hold':
            return 'text-purple-500';
        case 'In call':
            return 'text-green-600';
        case 'Ringing':
            return 'text-red-500';
        case 'Not in use':
            return 'text-blue-400';
        default:
            return '';
    }
};

export default AgentPanel;