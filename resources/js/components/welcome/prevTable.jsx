import { Link, usePage } from "@inertiajs/react";
import ButtonLarge from "@/components/button";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ButtonPurple from "@/components/buttonPurple";
import DiscordLoader from '@/components/discordloader';
import { useLoadStatus } from "../context/loadContext";
import { themeByProject } from '../utils/theme';

function PrevTable() {
    const { props } = usePage();
    const proyecto = props?.auth?.user?.proyecto || 'AZZU';
    const theme = themeByProject[proyecto];
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { allLoaded, markLoaded } = useLoadStatus();
    const [error, setError] = useState(false);
    const [usingMockData, setUsingMockData] = useState(false);
    const intervalRef = useRef(null);
    
    // Datos de prueba realistas
    const generateMockData = () => {
        const names = ['Ana García', 'Carlos López', 'María Rodríguez', 'Juan Martínez', 'Laura Hernández', 'Pedro Sánchez', 'Sofía Díaz', 'Miguel Torres'];
        const estados = ['Disponible', 'En llamada', 'En pausa', 'Desconectado', 'Almuerzo'];
        
        return Array.from({ length: 6 }, (_, index) => {
            const randomName = names[Math.floor(Math.random() * names.length)];
            const randomEstado = estados[Math.floor(Math.random() * estados.length)];
            
            return {
                extension: `10${100 + index}`,
                accountcode: `${Math.floor(Math.random() * 8) + 1}h ${Math.floor(Math.random() * 60)}m`,
                member: {
                    nombre: randomName,
                    estado: randomEstado
                }
            };
        });
    };

    // Función para simular la carga de datos
    const simulateDataFetch = () => {
        setLoading(true);
        
        // Simular delay de red
        setTimeout(() => {
            const mockData = generateMockData();
            setData(mockData);
            setLoading(false);
            setUsingMockData(true);
            markLoaded();
        }, 800);
    };

    useEffect(() => {
        const fetchData = () => {
            // Si ya estamos usando datos mock, simplemente los actualizamos
            if (usingMockData) {
                const mockData = generateMockData();
                setData(mockData);
                return;
            }

            // Intentar obtener datos reales primero
            simulateDataFetch();
            setError(false);
        };

        // Cargar datos iniciales
        fetchData();
        
        // Configurar intervalo para actualizar cada 3-4 segundos
        intervalRef.current = setInterval(fetchData, 3000 + Math.random() * 1000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [usingMockData]);

    // Función para obtener el color del estado
    const getStatusColor = (estado) => {
        const statusColors = {
            'Disponible': 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100',
            'En llamada': 'bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-100',
            'En pausa': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100',
            'Desconectado': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100',
            'Almuerzo': 'bg-purple-100 text-purple-800 dark:bg-purple-700 dark:text-purple-100'
        };
        
        return statusColors[estado] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
    };

    // Función para obtener el ícono del estado
    const getStatusIcon = (estado) => {
        const statusIcons = {
            'Disponible': '',
            'En llamada': '',
            'En pausa': '',
            'Desconectado': '',
            'Almuerzo': ''
        };
        
        return statusIcons[estado] || '';
    };

    return (
        <div className="absolute inset-0 p-6 flex flex-col justify-between">
            {loading || !allLoaded ? (
                <DiscordLoader />
            ) : (
                <>

                    
                    <div className="flex flex-col">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Agentes activos 
                                {usingMockData && ""}
                            </h2>
                            {/* <Link href={route('showTableAgents')}>
                                <button className={`${theme.text} text-sm font-medium hover:underline cursor-pointer`}>
                                    Ver tabla completa
                                </button>
                            </Link> */}
                        </div>

                        <div className="overflow-x-auto rounded-lg border border-gray-100 dark:border-gray-700 mb-4">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
                                <thead className="bg-gray-50 dark:bg-gray-800">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-400">Nombre</th>
                                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-400">Extensión</th>
                                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-400">Conectado</th>
                                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-400">Estado</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-[#011111] divide-y divide-gray-100 dark:divide-gray-700">
                                    {data.map((p, index) => (
                                        <tr key={`${p.extension}-${index}`} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
                                            <td className="px-4 py-2 text-gray-900 dark:text-white">{p.member?.nombre || 'Sin usuario'}</td>
                                            <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{p.extension}</td>
                                            <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{p.accountcode}</td>
                                            <td className="px-4 py-2">
                                                <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(p.member?.estado)}`}>
                                                    <span className="text-sm">{getStatusIcon(p.member?.estado)}</span>
                                                    {p.member?.estado || 'Desconocido'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default PrevTable;