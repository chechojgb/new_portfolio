import { useEffect, useState, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { Link, usePage } from "@inertiajs/react";
import { themeByProject, getChartColors } from '../utils/theme';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from 'chart.js';
import {
  Clock,
  PhoneMissed,
  AlertTriangle,
  Users,
  PhoneOff,
  PhoneIncoming
} from 'lucide-react';
import DiscordLoader from '@/components/discordloader';
import { useLoadStatus } from '../context/loadContext';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Filler);

// --- Tipos de alertas simuladas ---
const alertTypes = [
  { icon: <Clock size={16} />, type: 'pausa', titles: ['en pausa', 'en descanso', 'en almuerzo'], details: ['Hace 15 minutos', 'Hace 25 minutos', 'Hace 42 minutos', 'Hace 8 minutos'] },
  { icon: <PhoneMissed size={16} />, type: 'llamada', titles: ['Llamada en espera', 'Llamada perdida', 'Llamada larga'], details: ['Desde hace 1:45 min', 'Desde hace 3:20 min', 'Desde hace 4:15 min'] },
  { icon: <AlertTriangle size={16} />, type: 'desconexion', titles: ['desconectada', 'sin conexión', 'fuera de servicio'], details: ['Inesperadamente', 'Por timeout', 'Error de conexión'] },
  { icon: <Users size={16} />, type: 'grupo', titles: ['Cola saturada', 'Muchas llamadas en espera', 'Alta carga'], details: ['15 llamadas esperando', '8 agentes ocupados', 'Tiempo de espera alto'] },
  { icon: <PhoneOff size={16} />, type: 'llamada_fallida', titles: ['Llamada rechazada', 'No contesta', 'Llamada fallida'], details: ['Extensión no responde', 'Usuario ocupado', 'Número no disponible'] },
  { icon: <PhoneIncoming size={16} />, type: 'entrante', titles: ['Llamada entrante larga', 'Llamada importante', 'Cliente VIP esperando'], details: ['Más de 10 minutos', 'Requiere atención', 'En espera prioritario'] }
];

const agentNames = ['Ana García', 'Carlos López', 'María Rodríguez', 'Juan Martínez', 'Laura Hernández', 'Pedro Sánchez', 'Sofía Díaz', 'Miguel Torres', 'Elena Castro', 'David Romero'];
const extensions = ['2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010'];

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    y: { display: false, beginAtZero: true, suggestedMax: 8 },
    x: { ticks: { color: '#888' }, grid: { display: false } },
  },
  elements: { point: { radius: 3, hoverRadius: 5 } }
};

export default function AlertasRecientesWidget() {
  const { props } = usePage();
  const proyecto = props?.auth?.user?.proyecto || 'AZZU';
  const theme = themeByProject[proyecto];
  const chartColors = useMemo(() => getChartColors(proyecto), [proyecto]);

  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState([]);
  const [chartData, setChartData] = useState(null);
  const { allLoaded, markLoaded } = useLoadStatus();
  const [usingMockData, setUsingMockData] = useState(false);

  // --- Generar alertas simuladas ---
  const generateMockAlerts = () => {
    const numberOfAlerts = 3 + Math.floor(Math.random() * 2);
    const now = new Date();
    const newAlerts = [];

    for (let i = 0; i < numberOfAlerts; i++) {
      const alertType = alertTypes[Math.floor(Math.random() * alertTypes.length)];
      const agentName = agentNames[Math.floor(Math.random() * agentNames.length)];
      const extension = extensions[Math.floor(Math.random() * extensions.length)];

      const minutesAgo = Math.floor(Math.random() * 60);
      const alertTime = new Date(now.getTime() - minutesAgo * 60000);

      let title = '';
      if (alertType.type === 'pausa' || alertType.type === 'desconexion') {
        title = `${agentName} ${alertType.titles[Math.floor(Math.random() * alertType.titles.length)]}`;
      } else if (alertType.type === 'llamada' || alertType.type === 'grupo') {
        title = alertType.titles[Math.floor(Math.random() * alertType.titles.length)];
      } else {
        title = `${alertType.titles[Math.floor(Math.random() * alertType.titles.length)]} - Ext. ${extension}`;
      }

      newAlerts.push({
        icon: alertType.icon,
        title,
        detail: alertType.details[Math.floor(Math.random() * alertType.details.length)],
        date: 'Hoy',
        time: alertTime.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
        timestamp: alertTime.getTime(),
      });
    }

    return newAlerts.sort((a, b) => b.timestamp - a.timestamp);
  };

  // --- Generar datos del gráfico ---
  const generateChartData = () => {
    const hours = ['6:00', '7:00', '8:00', '9:00', '10:00', '11:00'];
    const dataPoints = hours.map(() => Math.floor(Math.random() * 6) + 1);
    return {
      labels: hours,
      datasets: [
        {
          label: 'Alertas por hora',
          data: dataPoints,
          fill: true,
          backgroundColor: chartColors.fill,
          borderColor: chartColors.border,
          tension: 0.4,
          pointBackgroundColor: chartColors.border,
          pointBorderColor: '#8d0000ff',
          pointBorderWidth: 2,
        },
      ],
    };
  };

  // --- Actualizar datos mock ---
  const updateMockData = () => {
    setAlerts(generateMockAlerts());
    setChartData(generateChartData());
    setUsingMockData(true);
  };

  // --- Inicializar datos e intervalos ---
  useEffect(() => {
    setLoading(true);
    const initialize = () => {
      setTimeout(() => {
        updateMockData();
        setLoading(false);
        markLoaded();
      }, 800);
    };
    initialize();

    const intervalId = setInterval(() => {
      updateMockData();
    }, 4000 + Math.random() * 2000);

    return () => clearInterval(intervalId);
  }, []);

  // --- Actualizar colores del gráfico cuando cambie el tema ---
  const coloredChartData = useMemo(() => {
    if (!chartData) return null;
    return {
      ...chartData,
      datasets: [
        {
          ...chartData.datasets[0],
          backgroundColor: chartColors.fill,
          borderColor: chartColors.border,
          pointBackgroundColor: chartColors.border,
        },
      ],
    };
  }, [chartData, chartColors]);

  return (
    <div className="absolute inset-0 flex flex-col justify-between p-5">
      {loading || !allLoaded ? (
        <DiscordLoader />
      ) : (
        <>
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Alertas recientes {usingMockData && ''}
              </h3>
              <button className={`${theme.text} text-xs hover:underline`}>Ver todo</button>
            </div>

            <ul className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
              {alerts.map((alert, i) => (
                <li key={`${alert.title}-${alert.time}-${i}`} className="flex items-start gap-3 animate-fadeIn">
                  <div className="flex flex-col items-center">
                    <div className={`${theme.bgSafe} ${theme.text} rounded-full p-1`}>{alert.icon}</div>
                    {i < alerts.length - 1 && <div className="h-full w-px bg-gray-300 dark:bg-gray-600 mt-1" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">{alert.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{alert.detail}</p>
                  </div>
                  <div className="text-xs text-right text-gray-500 dark:text-gray-400">
                    <p>{alert.date}</p>
                    <p>{alert.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4" style={{ height: '80px' }}>
            {coloredChartData && <Line data={coloredChartData} options={chartOptions} />}
          </div>
        </>
      )}
    </div>
  );
}
