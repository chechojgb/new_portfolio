import { useState, useEffect, useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { usePage } from "@inertiajs/react";
import DiscordLoader from '@/components/discordloader';
import { useLoadStatus } from "../context/loadContext";
import { themeByProject } from '../utils/theme';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: '#6b7280',
      },
    },
  },
  cutout: '70%',
};

export default function AgentStatusDonut() {
  const { props } = usePage();
  const proyecto = props?.auth?.user?.proyecto || 'AZZU';
  const theme = themeByProject[proyecto];
  const [loading, setLoading] = useState(true);
  const [callData, setCallData] = useState({
    atendidas: 0,
    en_espera: 0,
    abandonadas: 0
  });
  const [selectedOperation, setSelectedOperation] = useState('');
  const { allLoaded, markLoaded } = useLoadStatus();
  const intervalRef = useRef(null);

  // Función para generar datos de llamadas realistas
  const generateMockCallData = () => {
    const baseAtendidas = 45 + Math.floor(Math.random() * 30); // 45-75 llamadas
    const baseEnEspera = 3 + Math.floor(Math.random() * 8);   // 3-11 llamadas
    const baseAbandonadas = 2 + Math.floor(Math.random() * 6); // 2-8 llamadas
    
    // Añadir variación pequeña para simular cambios en tiempo real
    const variacion = Math.floor(Math.random() * 5) - 2; // -2 a +2
    
    return {
      atendidas: Math.max(0, baseAtendidas + variacion),
      en_espera: Math.max(0, baseEnEspera + (Math.random() > 0.7 ? 1 : 0)),
      abandonadas: Math.max(0, baseAbandonadas + (Math.random() > 0.8 ? 1 : 0))
    };
  };

  // Operaciones disponibles
  const operations = ['- Movil', '- Retencion', '- Turno Noche', '- Soporte', '- Tramites'];

  // Función para actualizar datos
  const updateData = () => {
    const mockCallData = generateMockCallData();
    const randomOperation = operations[Math.floor(Math.random() * operations.length)];
    
    setCallData(mockCallData);
    setSelectedOperation(randomOperation);
  };

  useEffect(() => {
    // Simular carga inicial
    const timer = setTimeout(() => {
      updateData();
      setLoading(false);
      markLoaded();
    }, 800);

    // Configurar intervalo para actualizar cada 4-7 segundos
    intervalRef.current = setInterval(() => {
      updateData();
    }, 4000 + Math.random() * 3000);

    return () => {
      clearTimeout(timer);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const chartData = {
    labels: ['Llamadas atendidas', 'Llamadas en espera', 'Llamadas perdidas'],
    datasets: [
      {
        label: 'Llamadas',
        data: [callData.atendidas, callData.en_espera, callData.abandonadas],
        backgroundColor: [
          'rgba(147, 51, 234, 1)',     // atendidas - púrpura
          'rgba(16, 185, 129, 0.8)',   // en espera - verde
          'rgba(239, 68, 68, 0.8)'     // abandonadas - rojo
        ],
        borderColor: [
          'rgba(147, 51, 234, 0.8)',
          'rgba(16, 185, 129, 0.6)',
          'rgba(239, 68, 68, 0.6)'
        ],
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };

  // Calcular total de llamadas
  const totalLlamadas = callData.atendidas + callData.en_espera + callData.abandonadas;
  const tasaExito = totalLlamadas > 0 ? Math.round((callData.atendidas / totalLlamadas) * 100) : 0;

  return (
    <div className="h-full min-h-[360px] p-6 flex flex-col gap-4">
      {loading || !allLoaded ? (
        <DiscordLoader />
      ) : (
        <>
          {/* Header */}
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Estado de Llamadas {selectedOperation}
            </h3>
            <span className="text-sm text-gray-500">
              Demo en vivo
            </span>
          </div>

          {/* Donut Chart con espacio controlado */}
          <div className="flex-grow flex flex-col items-center justify-center max-h-[220px] relative">
            <Doughnut data={chartData} options={options} />
            
            {/* Total en el centro del donut */}
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {totalLlamadas}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Total
              </span>
            </div>
          </div>

          {/* Detalles con animaciones sutiles */}
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            <div className="flex justify-between items-center py-2">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-purple-600 shadow-sm"></span>
                <span className="text-sm text-gray-700 dark:text-gray-200">Atendidas</span>
              </div>
              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                {callData.atendidas}
                <span className="text-xs text-gray-500 ml-1">
                  ({tasaExito}%)
                </span>
              </div>
            </div>
            
            <div className="flex justify-between items-center py-2">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-emerald-500 shadow-sm"></span>
                <span className="text-sm text-gray-700 dark:text-gray-200">En espera</span>
              </div>
              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                {callData.en_espera}
                <span className="text-xs text-gray-500 ml-1">
                  ({totalLlamadas > 0 ? Math.round((callData.en_espera / totalLlamadas) * 100) : 0}%)
                </span>
              </div>
            </div>
            
            <div className="flex justify-between items-center py-2">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500 shadow-sm"></span>
                <span className="text-sm text-gray-700 dark:text-gray-200">Perdidas</span>
              </div>
              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                {callData.abandonadas}
                <span className="text-xs text-gray-500 ml-1">
                  ({totalLlamadas > 0 ? Math.round((callData.abandonadas / totalLlamadas) * 100) : 0}%)
                </span>
              </div>
            </div>
          </div>

          {/* Estadísticas rápidas */}
          <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
              <span>Tasa de éxito:</span>
              <span className="font-semibold text-green-600 dark:text-green-400">
                {tasaExito}%
              </span>
            </div>
          </div>

          {/* Indicador sutil de demo */}
          <div className="text-center">
            <span className="text-xs text-gray-400 dark:text-gray-500">
              📊 Datos simulados - Actualizando en tiempo real
            </span>
          </div>
        </>
      )}
    </div>
  );
}