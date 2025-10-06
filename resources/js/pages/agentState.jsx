import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import AgentRankingWidget from '@/components/welcome/agentRankingWidget';
import { LoadProvider } from '@/components/context/loadContext';
import { useState, useEffect } from 'react';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function EvolucionHorariaChart() {
  const horas = ['6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00'];
  
  const [data, setData] = useState(
    horas.map((hora) => ({
      hora,
      llamadas: Math.floor(Math.random() * 40) + 10,
      exitosas: Math.floor(Math.random() * 35) + 8,
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const nuevosDatos = horas.map((hora) => ({
        hora,
        llamadas: Math.floor(Math.random() * 40) + 10,
        exitosas: Math.floor(Math.random() * 35) + 8,
      }));
      setData(nuevosDatos);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 20, left: -10, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
          <XAxis 
            dataKey="hora" 
            stroke="#888888"
            fontSize={12}
          />
          <YAxis 
            stroke="#888888"
            fontSize={12}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#1f2937',
              border: 'none',
              borderRadius: '8px',
              color: 'white'
            }}
          />
          <Line
            type="monotone"
            dataKey="llamadas"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
            animationDuration={800}
            name="Llamadas totales"
          />
          <Line
            type="monotone"
            dataKey="exitosas"
            stroke="#ab1eecff"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
            animationDuration={800}
            name="Llamadas exitosas"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

const breadcrumbs = [
    {
        title: 'Ranking de agentes',
        href: '/rankingAgentesAZZU',
    },
];

export default function TableAgents() {
    const [stats, setStats] = useState({
        totalLlamadas: 0,
        mejorAgente: '',
        promedioLlamadas: 0,
        tasaExito: 0
    });

    // Datos de prueba para las estadísticas
    useEffect(() => {
        const mockStats = {
            totalLlamadas: 342,
            mejorAgente: 'Ana García',
            promedioLlamadas: 28.5,
            tasaExito: 87.3
        };
        setStats(mockStats);
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ranking de Agentes" />
            <div className="p-8 space-y-8 min-h-screen">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-indigo-800 dark:text-white mb-2">🏆 Ranking de Agentes</h1>
                        <p className="text-base text-gray-700 dark:text-gray-300 max-w-xl">
                            Descubre el desempeño de cada agente en tiempo real. Analiza quiénes lideran en eficiencia, llamadas atendidas y calidad de servicio.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    <div className="xl:col-span-2 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 p-6 flex flex-col">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-indigo-700 dark:text-indigo-300">Tabla de Ranking</h2>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                Actualizado hace 2 minutos
                            </span>
                        </div>
                        <div className="flex-1">
                            <LoadProvider total={1}>
                                <AgentRankingWidget />
                            </LoadProvider>
                        </div>
                    </div>

                    <div className="bg-gradient-to-b from-purple-100 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 p-6 flex flex-col justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">📈 Resumen del Día</h3>
                            
                            <div className="space-y-4">
                                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{stats.totalLlamadas}</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Llamadas totales</p>
                                        </div>
                                        <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded-full">
                                            +12%
                                        </span>
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                    <p className="text-lg font-semibold text-gray-800 dark:text-white truncate">👑 {stats.mejorAgente}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Agente destacado</p>
                                </div>

                                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-xl font-bold text-green-600 dark:text-green-400">{stats.promedioLlamadas}</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Promedio/agente</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">{stats.tasaExito}%</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Tasa de éxito</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                                <span>🔄 Datos en tiempo real</span>
                                <span className="flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                    Activo
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 p-8">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-xl font-semibold text-indigo-700 dark:text-indigo-300">📈 Evolución Horaria</h2>
                            <p className="text-base text-gray-700 dark:text-gray-300 mt-1">
                                Visualiza el comportamiento de las llamadas a lo largo del día para identificar tendencias y optimizar recursos.
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <select className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm">
                                <option>Hoy</option>
                                <option>Ayer</option>
                                <option>Esta semana</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                        <EvolucionHorariaChart />
                        
                        <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400 mt-4">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-indigo-500 rounded"></div>
                                    <span>Llamadas totales</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                                    <span>Llamadas exitosas</span>
                                </div>
                            </div>
                            <div className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                🔄 Actualizando cada 4 segundos
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                                    <span className="text-blue-600 dark:text-blue-400">📞</span>
                                </div>
                                <div>
                                    <p className="text-lg font-semibold text-gray-800 dark:text-white">156</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Llamadas pico</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                                    <span className="text-green-600 dark:text-green-400">⏱️</span>
                                </div>
                                <div>
                                    <p className="text-lg font-semibold text-gray-800 dark:text-white">2:15</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Tiempo promedio</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                                    <span className="text-purple-600 dark:text-purple-400">⭐</span>
                                </div>
                                <div>
                                    <p className="text-lg font-semibold text-gray-800 dark:text-white">94%</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Satisfacción</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sección de métricas adicionales */}
                <div className="rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">🎯 Métricas de Desempeño</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">12</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Agentes activos</div>
                        </div>
                        <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">87%</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Eficiencia</div>
                        </div>
                        <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">4.8</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Rating promedio</div>
                        </div>
                        <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">18</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Min. respuesta</div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}