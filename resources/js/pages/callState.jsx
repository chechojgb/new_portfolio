import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import AgentStatusDonut from '@/components/welcome/agentStatusDount';
import { LoadProvider } from '@/components/context/loadContext';
import { useState, useEffect } from 'react';



const breadcrumbs = [
    {
        title: 'Estado de las llamadas',
        href: '/showCallState',
    },
];

export default function TableAgents() {
    const [evolucionData, setEvolucionData] = useState([]);
    const [metricas, setMetricas] = useState({
        ocupacionEficiente: 0,
        tiempoRespuesta: 0,
        horaCritica: '',
        eficienciaPico: 0
    });

    // Función para generar datos aleatorios
    const generarDatos = () => {
        const horas = ['6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00'];
        
        const nuevosDatos = horas.map(hora => ({
            hora,
            atendidas: Math.floor(Math.random() * 35) + 5,
            enEspera: Math.floor(Math.random() * 12) + 1,
            perdidas: Math.floor(Math.random() * 8) + 1
        }));

        // Encontrar la hora con máxima actividad para la hora crítica
        const horaMaxima = nuevosDatos.reduce((max, item) => 
            item.atendidas > max.atendidas ? item : max
        );

        const nuevasMetricas = {
            ocupacionEficiente: Math.floor(Math.random() * 20) + 70, // 70-90%
            tiempoRespuesta: Math.floor(Math.random() * 10) + 18, // 18-28 min
            horaCritica: horaMaxima.hora,
            eficienciaPico: Math.floor(Math.random() * 15) + 85 // 85-100%
        };

        setEvolucionData(nuevosDatos);
        setMetricas(nuevasMetricas);
    };

    // Efecto para actualización automática
    useEffect(() => {
        // Cargar datos iniciales
        generarDatos();

        // Configurar intervalo para actualizar cada 5-8 segundos
        const intervalId = setInterval(() => {
            generarDatos();
        }, 5000 + Math.random() * 3000);

        return () => clearInterval(intervalId);
    }, []);

    const [stats, setStats] = useState({
        atendidas: 0,
        enEspera: 0,
        perdidas: 0,
        tasaExito: 0,
        tiempoPromedio: '0:00'
    });


    // Datos de prueba para las estadísticas
    useEffect(() => {
        const mockStats = {
            atendidas: 156,
            enEspera: 12,
            perdidas: 8,
            tasaExito: 88.6,
            tiempoPromedio: '2:45'
        };
        setStats(mockStats);

        // Datos para la evolución horaria
        const horas = ['6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00'];
        const mockEvolucion = horas.map(hora => ({
            hora,
            atendidas: Math.floor(Math.random() * 25) + 15,
            enEspera: Math.floor(Math.random() * 8) + 2,
            perdidas: Math.floor(Math.random() * 5) + 1
        }));
        setEvolucionData(mockEvolucion);
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Estado de Llamadas" />
            <div className="p-6 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">📞 Estado de llamadas</h1>
                        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl mt-2">
                            Esta sección presenta una vista detallada del comportamiento actual de las llamadas entrantes en el centro de contacto. Se muestra el total de llamadas atendidas, en espera y perdidas, permitiendo tomar decisiones rápidas para la gestión operativa.
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition text-sm">
                            📊 Ver reporte completo
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <LoadProvider total={1}>
                            <AgentStatusDonut />
                        </LoadProvider>
                    </div>

                    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow flex flex-col justify-between">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Resumen de hoy</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    Análisis breve del comportamiento actual. Ideal para una lectura rápida de la eficiencia en la atención.
                                </p>
                            </div>
                            <button className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 transition-colors">
                                📥 Descargar PDF
                            </button>
                        </div>

                        <div className="space-y-4 mb-6">
                            <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                                <div>
                                    <span className="font-bold text-blue-600 dark:text-blue-400 text-lg">{stats.atendidas}</span>
                                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">llamadas atendidas</span>
                                </div>
                                <div className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
                                    +15%
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                                <div>
                                    <span className="font-bold text-green-600 dark:text-green-400 text-lg">{stats.enEspera}</span>
                                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">llamadas en espera</span>
                                </div>
                                <div className="text-xs bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200 px-2 py-1 rounded-full">
                                    Estable
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                                <div>
                                    <span className="font-bold text-red-600 dark:text-red-400 text-lg">{stats.perdidas}</span>
                                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">llamadas perdidas</span>
                                </div>
                                <div className="text-xs bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200 px-2 py-1 rounded-full">
                                    -5%
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                                <div className="text-lg font-bold text-purple-600 dark:text-purple-400">{stats.tasaExito}%</div>
                                <div className="text-xs text-gray-600 dark:text-gray-400">Tasa de éxito</div>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                                <div className="text-lg font-bold text-orange-600 dark:text-orange-400">{stats.tiempoPromedio}</div>
                                <div className="text-xs text-gray-600 dark:text-gray-400">Tiempo promedio</div>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500">
                                <span>🔄 Datos en tiempo real</span>
                                <span className="flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                    Actualizado ahora
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">🌊 Flujo de Llamadas por Franja Horaria</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Monitoriza la distribución temporal de las llamadas para optimizar la asignación de recursos humanos.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        Actualizando...
                    </div>
                    <select className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm">
                        <option>Vista Compacta</option>
                        <option>Vista Detallada</option>
                        <option>Comparativa</option>
                    </select>
                </div>
            </div>

            {/* Timeline de actividad */}
            <div className="bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 mb-6">
                    <div className="relative">
                        {/* Línea de tiempo */}
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-300 dark:bg-gray-600 transform -translate-y-1/2"></div>
                        
                        {/* Marcadores de hora */}
                        <div className="flex justify-between relative">
                            {evolucionData.map((item, index) => (
                                <div key={`${item.hora}-${index}`} className="flex flex-col items-center">
                                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">{item.hora}</div>
                                    
                                    {/* Puntos de actividad */}
                                    <div className="relative mb-8">
                                        <div 
                                            className="w-6 h-6 rounded-full border-4 border-white dark:border-gray-800 shadow-lg transition-all duration-500 hover:scale-125 cursor-pointer"
                                            style={{ 
                                                backgroundColor: `rgba(59, 130, 246, ${item.atendidas / 40})`,
                                                borderColor: 'white'
                                            }}
                                            title={`${item.atendidas} atendidas | ${item.enEspera} en espera | ${item.perdidas} perdidas`}
                                        >
                                            {/* Indicador de nivel */}
                                            <div 
                                                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t transition-all duration-500"
                                                style={{ height: `${item.atendidas * 1.5}px` }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* Mini gráfico de anillos */}
                                    <div className="relative w-12 h-12">
                                        <svg viewBox="0 0 42 42" className="w-12 h-12 transform -rotate-90">
                                            {/* Fondo */}
                                            <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="#e5e7eb" strokeWidth="3"></circle>
                                            {/* Atendidas */}
                                            <circle cx="21" cy="21" r="15.9" fill="transparent" 
                                                stroke="#3b82f6" strokeWidth="3" 
                                                strokeDasharray={`${(item.atendidas / 40) * 100} 100`}
                                                strokeLinecap="round">
                                            </circle>
                                            {/* En espera */}
                                            <circle cx="21" cy="21" r="12" fill="transparent" 
                                                stroke="#10b981" strokeWidth="2" 
                                                strokeDasharray={`${(item.enEspera / 15) * 100} 100`}
                                                strokeLinecap="round">
                                            </circle>
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                                                {item.atendidas}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400 mt-8">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-blue-500 rounded-full shadow-sm"></div>
                                <span>Volumen total</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full shadow-sm"></div>
                                <span>En espera</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full shadow-sm"></div>
                                <span>Intensidad</span>
                            </div>
                        </div>
                        <div className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
                            💡 Máxima actividad: {metricas.horaCritica}
                        </div>
                    </div>
                </div>

                {/* Tarjetas de análisis estratégico */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800 transition-all duration-500 hover:scale-105">
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 transition-all duration-500">
                                    {metricas.ocupacionEficiente}%
                                </div>
                                <div className="text-sm text-blue-700 dark:text-blue-300 font-medium">Ocupación eficiente</div>
                            </div>
                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-lg flex items-center justify-center">
                                <span className="text-blue-600 dark:text-blue-400">⚡</span>
                            </div>
                        </div>
                        <div className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                            {metricas.ocupacionEficiente > 75 ? 'Mejor que el promedio' : 'En línea con objetivos'}
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-xl border border-green-200 dark:border-green-800 transition-all duration-500 hover:scale-105">
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="text-2xl font-bold text-green-600 dark:text-green-400 transition-all duration-500">
                                    {metricas.tiempoRespuesta}min
                                </div>
                                <div className="text-sm text-green-700 dark:text-green-300 font-medium">Tiempo respuesta</div>
                            </div>
                            <div className="w-8 h-8 bg-green-100 dark:bg-green-800 rounded-lg flex items-center justify-center">
                                <span className="text-green-600 dark:text-green-400">⏱️</span>
                            </div>
                        </div>
                        <div className="text-xs text-green-600 dark:text-green-400 mt-2">
                            {metricas.tiempoRespuesta <= 20 ? 'Excelente desempeño' : 'Dentro del objetivo'}
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-4 rounded-xl border border-amber-200 dark:border-amber-800 transition-all duration-500 hover:scale-105">
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="text-2xl font-bold text-amber-600 dark:text-amber-400 transition-all duration-500">
                                    {metricas.horaCritica}
                                </div>
                                <div className="text-sm text-amber-700 dark:text-amber-300 font-medium">Hora crítica</div>
                            </div>
                            <div className="w-8 h-8 bg-amber-100 dark:bg-amber-800 rounded-lg flex items-center justify-center">
                                <span className="text-amber-600 dark:text-amber-400">🔥</span>
                            </div>
                        </div>
                        <div className="text-xs text-amber-600 dark:text-amber-400 mt-2">
                            Franja de máxima demanda
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 p-4 rounded-xl border border-purple-200 dark:border-purple-800 transition-all duration-500 hover:scale-105">
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 transition-all duration-500">
                                    {metricas.eficienciaPico}%
                                </div>
                                <div className="text-sm text-purple-700 dark:text-purple-300 font-medium">Eficiencia pico</div>
                            </div>
                            <div className="w-8 h-8 bg-purple-100 dark:bg-purple-800 rounded-lg flex items-center justify-center">
                                <span className="text-purple-600 dark:text-purple-400">🎯</span>
                            </div>
                        </div>
                        <div className="text-xs text-purple-600 dark:text-purple-400 mt-2">
                            {metricas.eficienciaPico > 90 ? 'Rendimiento excepcional' : 'Buen desempeño'}
                        </div>
                    </div>
                </div>

                {/* Análisis de patrones */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center mb-3">
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                            <span>📋</span> Recomendaciones de Optimización
                        </h4>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                            Actualizado hace <span className="text-green-600 dark:text-green-400">0-8s</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-start gap-2 animate-pulse-slow">
                            <span className="w-5 h-5 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 text-xs">①</span>
                            <span className="text-gray-700 dark:text-gray-300">
                                <strong>Refuerzo {metricas.horaCritica}:</strong> Asignar +{Math.floor(Math.random() * 2) + 1} agentes en franja pico
                            </span>
                        </div>
                        <div className="flex items-start gap-2 animate-pulse-slow" style={{animationDelay: '0.1s'}}>
                            <span className="w-5 h-5 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 text-xs">②</span>
                            <span className="text-gray-700 dark:text-gray-300">
                                <strong>Optimizar recursos:</strong> {metricas.tiempoRespuesta <= 20 ? 'Mantener estrategia actual' : 'Revisar distribución'}
                            </span>
                        </div>
                        <div className="flex items-start gap-2 animate-pulse-slow" style={{animationDelay: '0.2s'}}>
                            <span className="w-5 h-5 bg-amber-100 dark:bg-amber-800 rounded-full flex items-center justify-center text-amber-600 dark:text-amber-400 text-xs">③</span>
                            <span className="text-gray-700 dark:text-gray-300">
                                <strong>Capacitación:</strong> {metricas.eficienciaPico > 90 ? 'Enfoque en mantenimiento' : 'Identificar áreas mejora'}
                            </span>
                        </div>
                        <div className="flex items-start gap-2 animate-pulse-slow" style={{animationDelay: '0.3s'}}>
                            <span className="w-5 h-5 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 text-xs">④</span>
                            <span className="text-gray-700 dark:text-gray-300">
                                <strong>Monitoreo continuo:</strong> {metricas.ocupacionEficiente > 80 ? 'Alta eficiencia detectada' : 'Seguimiento requerido'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Indicador de datos en vivo */}
                <div className="mt-4 text-center">
                    <div className="inline-flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        Datos en tiempo real - Actualizando automáticamente
                    </div>
                </div>
            </div>



            </div>
        </AppLayout>
    );
}