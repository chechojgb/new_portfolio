import { Link } from "@inertiajs/react";
import { getStatusClass, getStatusBorderClass, getStatusBgClass } from '@/utils/statusStyles';

const AgentModalContent = ({ agent, onClose }) => {
  // Datos estáticos mejorados para el modal
  const agentDetails = {
    extension: agent?.extension || '1001',
    nombre: agent?.member?.nombre || 'Agente No Encontrado',
    estado: agent?.member?.estado || 'Not in use',
    accountcode: agent?.accountcode || '0h 00m',
    inCall: agent?.member?.estado === 'In call' || agent?.member?.estado === 'Ringing',
    enPausa: agent?.member?.estado === 'On Hold',
    tiempoConectado: `${Math.floor(Math.random() * 8)}h ${Math.floor(Math.random() * 60)}m`,
    llamadasAtendidas: Math.floor(Math.random() * 50) + 10,
    satisfaccion: `${Math.floor(Math.random() * 30) + 70}%`,
    ultimaLlamada: `${Math.floor(Math.random() * 60)} minutos ago`
  };

  return (
    <>
      {/* Header del agente */}
      <div className="flex items-center gap-4 mb-6">
        <div className={`w-16 h-16 rounded-full ${getStatusBgClass(agentDetails.estado)} flex items-center justify-center text-white text-2xl font-semibold shadow-lg`}>
          {agentDetails.nombre.split(' ').map(n => n[0]).join('').toUpperCase()}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{agentDetails.nombre}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Extensión: {agentDetails.extension}</p>
        </div>
        <div className="text-right">
          <p className={`${getStatusClass(agentDetails.estado)} text-lg font-bold`}>
            {agentDetails.estado}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-300">Conectado: {agentDetails.accountcode}</p>
        </div>
      </div>

      {/* Estadísticas del agente */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-center">
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{agentDetails.llamadasAtendidas}</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Llamadas hoy</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-center">
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{agentDetails.satisfaccion}</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Satisfacción</p>
        </div>
      </div>

      {/* Información detallada */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
        <h4 className="text-sm font-semibold mb-3 text-gray-800 dark:text-gray-200">Información del Agente</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Tiempo conectado:</span>
            <span className="font-medium text-gray-900 dark:text-white">{agentDetails.tiempoConectado}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Última llamada:</span>
            <span className="font-medium text-gray-900 dark:text-white">{agentDetails.ultimaLlamada}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Estado actual:</span>
            <span className={`font-medium ${getStatusClass(agentDetails.estado)}`}>
              {agentDetails.estado}
            </span>
          </div>
        </div>
      </div>

      {/* Acciones disponibles */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
        <h4 className="text-sm font-semibold mb-3 text-gray-800 dark:text-gray-200">Acciones Disponibles</h4>
        
        {/* Estado de pausa */}
        <div className="flex justify-between items-center mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          {agentDetails.enPausa ? (
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-gray-700 dark:text-gray-300">Agente en pausa</span>
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
              <span className="text-gray-700 dark:text-gray-300">Agente activo</span>
            </span>
          )}
          <button className={`px-4 py-2 rounded-md text-sm font-medium ${
            agentDetails.enPausa 
              ? 'bg-green-600 hover:bg-green-700 text-white' 
              : 'bg-yellow-600 hover:bg-yellow-700 text-white'
          }`}>
            {agentDetails.enPausa ? '▶️ Reanudar' : '⏸️ Pausar'}
          </button>
        </div>

        {/* Acciones de llamada */}
        {agentDetails.inCall && (
          <div className="space-y-3">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Agente en llamada activa:</p>
            <div className="flex gap-3">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200">
                <span>🎧</span>
                Escuchar llamada
              </button>
              <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200">
                <span>📞</span>
                Finalizar llamada
              </button>
            </div>
          </div>
        )}

        {/* Otras acciones */}
        <div className="mt-4 space-y-2">
          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-all duration-200">
            📊 Ver estadísticas completas
          </button>
          <button className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-all duration-200">
            ✏️ Editar información
          </button>
        </div>
      </div>

      {/* Enlace de administración */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <div className="text-center">
          <span className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold cursor-pointer hover:underline">
            ⚙️ Panel completo de administración
          </span>
        </div>
      </div>

      {/* Nota de demo */}
      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-xs text-blue-600 dark:text-blue-400 text-center">
          🎮 Modal de demostración - Datos simulados
        </p>
      </div>
    </>
  );
};

export default AgentModalContent;