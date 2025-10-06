import { useEffect, useState, useRef } from "react";
import axios from "axios";
import DiscordLoader from '@/components/discordloader';
import { useLoadStatus } from "../context/loadContext";
import { Link, usePage } from "@inertiajs/react";
import { themeByProject } from '../utils/theme';
import TiempoFormateado from '@/components/utils/formatTime';

const getMedal = (rank) => {
  switch (rank) {
    case 1: return '🥇';
    case 2: return '🥈';
    case 3: return '🥉';
    default: return `${rank}.`;
  }
};

// Datos de agentes para simulación
const agentNames = [
  'Ana García López', 'Carlos Martínez', 'María Rodríguez', 'Juan Hernández', 
  'Laura Sánchez', 'Pedro Díaz', 'Sofía Torres', 'Miguel Castro', 
  'Elena Romero', 'David Jiménez', 'Carmen Vargas', 'Jorge Navarro'
];

export default function AgentRankingWidget() {
  const { props } = usePage();
  const proyecto = props?.auth?.user?.proyecto || 'AZZU';
  const theme = themeByProject[proyecto];
  const [agentes, setAgentes] = useState([]);
  const [loading, setLoading] = useState(true); 
  const { allLoaded, markLoaded } = useLoadStatus();
  const [error, setError] = useState(false);
  const [usingMockData, setUsingMockData] = useState(false);
  const intervalRef = useRef(null);

  // Función para generar datos de agentes realistas
  const generateMockAgents = () => {
    const numberOfAgents = 5; // 6-9 agentes
    
    return agentNames
      .slice(0, numberOfAgents)
      .map((nombre, index) => {
        const totalLlamadas = 15 + Math.floor(Math.random() * 30); // 15-45 llamadas
        const promedioDuracion = 180 + Math.floor(Math.random() * 600); // 3-13 minutos
        const totalDuracion = totalLlamadas * promedioDuracion; // Duración total
        
        return {
          agente: nombre,
          total_llamadas: totalLlamadas,
          promedio_duracion: promedioDuracion,
          total_duracion: totalDuracion,
          // Estos campos se añadirán después al ordenar
          rank: index + 1
        };
      })
      .sort((a, b) => b.total_llamadas - a.total_llamadas)
      .map((agente, index) => ({ 
        ...agente, 
        rank: index + 1,
        // Añadir pequeñas variaciones para simular cambios en tiempo real
        total_llamadas: agente.total_llamadas + (Math.random() > 0.7 ? 1 : 0)
      }));
  };

  // Función para simular la carga de datos
  const simulateDataFetch = () => {
    const mockAgents = generateMockAgents();
    setAgentes(mockAgents);
    setUsingMockData(true);
    setError(false);
  };

  useEffect(() => {
    // Simular carga inicial de datos
    const initializeData = () => {
      setLoading(true);
      
      // Simular delay de red
      setTimeout(() => {
        simulateDataFetch();
        setLoading(false);
        markLoaded();
      }, 800);
    };

    initializeData();

    // Configurar intervalo para actualizar cada 5-8 segundos
    intervalRef.current = setInterval(() => {
      if (!loading) {
        simulateDataFetch();
      }
    }, 5000 + Math.random() * 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Función para obtener color especial del top 3
  const getTopRankColor = (rank) => {
    switch (rank) {
      case 1: return 'text-yellow-500 dark:text-yellow-300';
      case 2: return 'text-gray-500 dark:text-gray-300';
      case 3: return 'text-amber-600 dark:text-amber-400';
      default: return 'text-gray-400 dark:text-gray-500';
    }
  };

  return (
    <div className="p-0 sm:p-6 flex flex-col justify-between">
      {loading || !allLoaded ? (
        <DiscordLoader />
      ) : (
        <>
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Ranking de Agentes
              {usingMockData && ""}
            </h3>
            <span className="text-sm text-gray-500">
              {/* <Link className={`${theme.text}`} href={route('showAgentRankingState')}>Hoy</Link> */}
            </span>
          </div>



          {/* Lista de agentes */}
          <ul className="space-y-3 text-sm text-gray-800 dark:text-gray-200">
            {agentes.map((agente, i) => (
              <li
                key={`${agente.agente}-${agente.rank}-${i}`}
                className={`flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-2 transition-all duration-300 ${
                  agente.rank <= 3 ? 'scale-[1.02] transform' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-lg ${getTopRankColor(agente.rank)}`}>
                    {getMedal(agente.rank)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900 dark:text-white truncate">
                      {agente.agente}
                      {agente.rank === 1 && " 👑"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Promedio: <TiempoFormateado tiempo={agente?.promedio_duracion}/>,<br/> 
                      Total en llamadas: <TiempoFormateado tiempo={agente?.total_duracion}/>
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`${theme.textSafe} font-semibold`}>
                    {agente.total_llamadas} llamadas
                  </p>
                  {agente.rank <= 3 && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      #{agente.rank} en ranking
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          {/* Estadísticas del ranking */}
          {agentes.length > 0 && (
            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
                <div>
                  <span>Total agentes: </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {agentes.length}
                  </span>
                </div>
                <div>
                  <span>Llamadas totales: </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {agentes.reduce((sum, agente) => sum + agente.total_llamadas, 0)}
                  </span>
                </div>
                <div>
                  <span>Mejor agente: </span>
                  <span className="font-semibold text-yellow-600 dark:text-yellow-400">
                    {agentes[0]?.agente.split(' ')[0]}
                  </span>
                </div>
                <div>
                  <span>Promedio/agente: </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {Math.round(agentes.reduce((sum, agente) => sum + agente.total_llamadas, 0) / agentes.length)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}