import { Link, usePage } from "@inertiajs/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState, useRef } from 'react';
import DiscordLoader from '@/components/discordloader';
import axios from "axios";
import { useLoadStatus } from "../context/loadContext";
import { themeByProject, getChartColors } from '../utils/theme';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: '#111827',
      titleColor: '#fff',
      bodyColor: '#d1d5db',
      callbacks: {
        label: function(context) {
          return `Llamadas: ${context.parsed.y}`;
        }
      }
    },
  },
  scales: {
    y: {
      min: 0,
      max: 50, 
      ticks: {
        stepSize: 10, 
        color: '#6b7280',
      },
      grid: {
        color: '#e5e7eb',
        drawBorder: false,
      },
    },
    x: {
      ticks: { color: '#6b7280' },
      grid: { display: false },
    },
  },
  animation: {
    duration: 1000,
    easing: 'easeInOutQuart'
  }
};

const labels = ['Soporte', 'Trámites', 'Retención', 'Móvil', 'Pruebas'];

export default function CallsPerOperationChart() {
  const { props } = usePage();
  const proyecto = props?.auth?.user?.proyecto || 'AZZU';
  const theme = themeByProject[proyecto];
  const [loading, setLoading] = useState(true);
  const { allLoaded, markLoaded } = useLoadStatus();
  const chartColors = getChartColors(proyecto);
  const [error, setError] = useState(false);
  const [usingMockData, setUsingMockData] = useState(false);
  const intervalRef = useRef(null);

  const [callData, setCallData] = useState({
    Soporte: 0,
    Tramites: 0,
    Retencion: 0,
    Movil: 0,
    Pruebas: 0
  });

  // Función para generar datos de operaciones realistas
  const generateMockCallData = () => {
    // Base realista para cada operación
    const baseData = {
      Soporte: 25 + Math.floor(Math.random() * 20),  // 25-45
      Tramites: 15 + Math.floor(Math.random() * 25), // 15-40
      Retencion: 10 + Math.floor(Math.random() * 15), // 10-25
      Movil: 20 + Math.floor(Math.random() * 25),    // 20-45
      Pruebas: 5 + Math.floor(Math.random() * 10)    // 5-15
    };

    // Añadir variaciones pequeñas para simular actividad en tiempo real
    Object.keys(baseData).forEach(key => {
      if (Math.random() > 0.6) { // 40% de probabilidad de cambio
        const variation = Math.floor(Math.random() * 5) - 2; // -2 a +2
        baseData[key] = Math.max(0, baseData[key] + variation);
      }
    });

    return baseData;
  };

  // Función para simular la carga de datos
  const simulateDataFetch = () => {
    const mockData = generateMockCallData();
    setCallData(mockData);
    setUsingMockData(true);
    setError(false);
  };

  useEffect(() => {
    // Simular carga inicial con pequeño delay para mejor UX
    const timer = setTimeout(() => {
      simulateDataFetch();
      setLoading(false);
      markLoaded();
    }, 600);

    // Configurar intervalo para actualizar cada 4-6 segundos
    intervalRef.current = setInterval(() => {
      simulateDataFetch();
    }, 4000 + Math.random() * 2000);

    return () => {
      clearTimeout(timer);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Llamadas',
        data: [
          callData.Soporte,
          callData.Tramites,
          callData.Retencion,
          callData.Movil,
          callData.Pruebas
        ],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',   // Soporte - Azul
          'rgba(16, 185, 129, 0.8)',   // Trámites - Verde
          'rgba(245, 158, 11, 0.8)',   // Retención - Amarillo
          'rgba(139, 92, 246, 0.8)',   // Móvil - Púrpura
          'rgba(156, 163, 175, 0.8)'   // Pruebas - Gris
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
          'rgb(245, 158, 11)',
          'rgb(139, 92, 246)',
          'rgb(156, 163, 175)'
        ],
        borderWidth: 2,
        borderRadius: 8,
        hoverBackgroundColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(139, 92, 246, 1)',
          'rgba(156, 163, 175, 1)'
        ],
        hoverBorderWidth: 3,
      },
    ],
  };

  // Calcular total de llamadas
  const totalLlamadas = Object.values(callData).reduce((sum, value) => sum + value, 0);

  // Encontrar la operación con más llamadas
  const operacionTop = labels.reduce((top, label, index) => {
    const value = Object.values(callData)[index];
    return value > top.value ? { label, value } : top;
  }, { label: '', value: 0 });

  return (
    <div className="px-4 py-3 sm:px-6 sm:py-4 flex flex-col justify-between h-full">
      {loading || !allLoaded ? (
        <DiscordLoader />
      ) : (
        <>
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Llamadas por operación
              {usingMockData && ""}
            </h3>
            <span className="text-sm text-gray-500">
              {/* <Link className={`${theme.text}`} href={route('showOperationState')}>Hoy</Link> */}
            </span>
          </div>


          {/* Estadísticas rápidas */}
          <div className="mb-3 grid grid-cols-2 gap-2 text-xs">
            <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded">
              <div className="text-gray-500 dark:text-gray-400">Total llamadas</div>
              <div className="font-semibold text-gray-900 dark:text-white">{totalLlamadas}</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded">
              <div className="text-gray-500 dark:text-gray-400">Operación top</div>
              <div className="font-semibold text-gray-900 dark:text-white truncate">
                {operacionTop.label}
              </div>
            </div>
          </div>

          {/* Gráfico */}
          <div className="flex-grow">
            <Bar 
              options={options} 
              data={chartData} 
              className="h-full w-full"
            />
          </div>

          {/* Leyenda de colores */}
          <div className="mt-3 flex flex-wrap gap-2 justify-center text-xs">
            {labels.map((label, index) => (
              <div key={label} className="flex items-center gap-1">
                <div 
                  className="w-3 h-3 rounded"
                  style={{ 
                    backgroundColor: chartData.datasets[0].backgroundColor[index] 
                  }}
                ></div>
                <span className="text-gray-600 dark:text-gray-400">{label}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}