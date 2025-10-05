// resources/js/pages/BLHistorico.jsx
import AppLayoutBL from "@/layouts/app-layoutBL";
import { Head, router } from "@inertiajs/react";
import { Button } from "flowbite-react";
import { useState } from "react";
// Componentes
import TablaMarcacionBL from "@/components/BL/tablaMarcacionBL";
import { Toast } from "flowbite-react";
import { HiCheck, HiX } from "react-icons/hi";
import { useEffect } from "react";
import {
    BookText,
    SaveAll
} from 'lucide-react';
import MarcacionForm from "@/components/BLHistorico/marcarProceso";

const breadcrumbs = [
  { title: "Marcacion BL", href: "/BLproductosInventario/BLMarcacion" }
];

// 🔹 Datos ficticios para pruebas
const datosFicticios = {
  orderCustomer: [
    { id: 1, nombre: "Fashion Store S.A.", nit: "123456789" },
    { id: 2, nombre: "Boutique Elegante", nit: "987654321" },
    { id: 3, nombre: "Textiles Modernos", nit: "456789123" },
    { id: 4, nombre: "Moda Express", nit: "321654987" },
    { id: 5, nombre: "Distribuidora Textil", nit: "789123456" }
  ],
  
  buttonUser: [
    { id: 1, name: "María González", role: "operario" },
    { id: 2, name: "Carlos Rodríguez", role: "supervisor" },
    { id: 3, name: "Ana Martínez", role: "operario" },
    { id: 4, name: "José López", role: "operario" },
    { id: 5, name: "Laura Sánchez", role: "calidad" }
  ],
  
  itemsPedidos: [
    // Items con marcaciones para Fashion Store S.A.
    { 
      id: 101, 
      pedido_id: 1, 
      pedido: { id: 1, cliente_id: 1, codigo: "PED-001" },
      producto: "Botones Dorados 15mm",
      cantidad_empaques: 50,
      estado: "completado",
      cliente: "Fashion Store S.A.",
      updated_at: "2024-01-15T10:30:00Z",
      marcaciones: [
        {
          id: 1,
          trabajador: { id: 1, name: "María González" },
          cantidad: 50,
          fecha: "2024-01-15",
          created_at: "2024-01-15T10:30:00Z"
        }
      ]
    },
    { 
      id: 102, 
      pedido_id: 1, 
      pedido: { id: 1, cliente_id: 1, codigo: "PED-001" },
      producto: "Cremalleras Negras 20cm",
      cantidad_empaques: 30,
      estado: "en proceso",
      cliente: "Fashion Store S.A.",
      updated_at: "2024-01-16T14:20:00Z",
      marcaciones: [
        {
          id: 2,
          trabajador: { id: 3, name: "Ana Martínez" },
          cantidad: 15,
          fecha: "2024-01-16",
          created_at: "2024-01-16T14:20:00Z"
        }
      ]
    },
    
    // Items para Boutique Elegante
    { 
      id: 201, 
      pedido_id: 3, 
      pedido: { id: 3, cliente_id: 2, codigo: "PED-003" },
      producto: "Botones Plateados 12mm",
      cantidad_empaques: 80,
      estado: "pendiente",
      cliente: "Boutique Elegante",
      updated_at: "2024-01-10T09:15:00Z",
      marcaciones: []
    },
    { 
      id: 202, 
      pedido_id: 3, 
      pedido: { id: 3, cliente_id: 2, codigo: "PED-003" },
      producto: "Elásticos Blancos 25mm",
      cantidad_empaques: 40,
      estado: "completado",
      cliente: "Boutique Elegante",
      updated_at: "2024-01-14T16:45:00Z",
      marcaciones: [
        {
          id: 3,
          trabajador: { id: 4, name: "José López" },
          cantidad: 40,
          fecha: "2024-01-14",
          created_at: "2024-01-14T16:45:00Z"
        }
      ]
    },
    
    // Items para Textiles Modernos
    { 
      id: 301, 
      pedido_id: 4, 
      pedido: { id: 4, cliente_id: 3, codigo: "PED-004" },
      producto: "Cremalleras Invisibles 30cm",
      cantidad_empaques: 60,
      estado: "en proceso",
      cliente: "Textiles Modernos",
      updated_at: "2024-01-17T11:00:00Z",
      marcaciones: [
        {
          id: 4,
          trabajador: { id: 1, name: "María González" },
          cantidad: 30,
          fecha: "2024-01-17",
          created_at: "2024-01-17T11:00:00Z"
        }
      ]
    },
    { 
      id: 302, 
      pedido_id: 4, 
      pedido: { id: 4, cliente_id: 3, codigo: "PED-004" },
      producto: "Botones Madera Natural",
      cantidad_empaques: 25,
      estado: "pendiente",
      cliente: "Textiles Modernos",
      updated_at: "2024-01-09T08:30:00Z",
      marcaciones: []
    },
    
    // Items con diferentes fechas para probar filtros
    { 
      id: 401, 
      pedido_id: 5, 
      pedido: { id: 5, cliente_id: 4, codigo: "PED-005" },
      producto: "Hilos de Coser Negro",
      cantidad_empaques: 75,
      estado: "completado",
      cliente: "Moda Express",
      updated_at: "2024-01-05T13:20:00Z",
      marcaciones: [
        {
          id: 5,
          trabajador: { id: 2, name: "Carlos Rodríguez" },
          cantidad: 75,
          fecha: "2024-01-05",
          created_at: "2024-01-05T13:20:00Z"
        }
      ]
    },
    { 
      id: 402, 
      pedido_id: 6, 
      pedido: { id: 6, cliente_id: 5, codigo: "PED-006" },
      producto: "Botones Perla Blancos",
      cantidad_empaques: 100,
      estado: "en proceso",
      cliente: "Distribuidora Textil",
      updated_at: "2024-01-18T15:30:00Z",
      marcaciones: [
        {
          id: 6,
          trabajador: { id: 5, name: "Laura Sánchez" },
          cantidad: 45,
          fecha: "2024-01-18",
          created_at: "2024-01-18T15:30:00Z"
        }
      ]
    }
  ]
};

export default function MarcadoPage({ 
  orderCustomer = datosFicticios.orderCustomer, 
  buttonUser = datosFicticios.buttonUser, 
  itemsPedidos = datosFicticios.itemsPedidos 
}) {
  const [search, setSearch] = useState('');
  const [estadoFiltro, setEstadoFiltro] = useState("");
  const [trabajadorFiltro, setTrabajadorFiltro] = useState("");
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [toast, setToast] = useState({
        show: false,
        success: false,
        message: "",
  });

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ show: false, success: false, message: '' });
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [toast]);

  const filtrarPorFecha = (item, inicio, fin) => {
    if (!inicio && !fin) return true;
    
    const fechaItem = new Date(item.updated_at);
    
    if (inicio && fin) {
      const start = new Date(inicio);
      const end = new Date(fin);
      end.setHours(23, 59, 59);
      return fechaItem >= start && fechaItem <= end;
    }
    
    if (inicio) {
      const start = new Date(inicio);
      return fechaItem >= start;
    }
    
    if (fin) {
      const end = new Date(fin);
      end.setHours(23, 59, 59);
      return fechaItem <= end;
    }
    
    return true;
  };

  const itemsFiltrados = itemsPedidos.filter((item) => {
    const coincideEstado = estadoFiltro === "" ? true : item.estado?.toLowerCase() === estadoFiltro.toLowerCase();
    const coincideTrabajador = trabajadorFiltro === "" ? true : 
    item.marcaciones?.[0]?.trabajador?.id === parseInt(trabajadorFiltro);
    const coincideFecha = filtrarPorFecha(item, fechaInicio, fechaFin);
    
    // Búsqueda general en múltiples campos
    const coincideBusqueda = search === "" ? true : 
      item.producto?.toLowerCase().includes(search.toLowerCase()) ||
      item.pedido?.codigo?.toLowerCase().includes(search.toLowerCase()) ||
      item.marcaciones?.[0]?.trabajador?.name?.toLowerCase().includes(search.toLowerCase());
    
    return coincideEstado && coincideTrabajador && coincideFecha && coincideBusqueda;
  });

  console.log('📊 Items filtrados:', itemsFiltrados);

  const limpiarFiltros = () => {
    setEstadoFiltro('');
    setTrabajadorFiltro('');
    setFechaInicio('');
    setFechaFin('');
    setSearch('');
  };

  return (
    <AppLayoutBL breadcrumbs={breadcrumbs}>
      <Head title="Histórico de Productos" />
      <div className="w-full p-2 sm:p-6 ">
        


        <h1 className="text-lg font-semibold border-b border-gray-300 dark:border-gray-600 pb-2 mb-2 flex items-center gap-2">
          <BookText/> Registro de Marcado
        </h1>

        {/* Formulario */}
        <MarcacionForm 
          orderCustomer={orderCustomer} 
          buttonUser={buttonUser} 
          itemsPedidos={itemsPedidos}
        />
        
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow">
          {/* Header con filtros */}
          <div className="flex flex-col p-4 gap-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Lista de items ({itemsFiltrados.length} de {itemsPedidos.length})
              </h2>
              <button
                onClick={limpiarFiltros}
                className="px-3 py-1 text-sm text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Limpiar filtros
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Filtro por estado */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Estado:
                </label>
                <select
                  value={estadoFiltro}
                  onChange={(e) => setEstadoFiltro(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
                >
                  <option value="">Todos los estados</option>
                  <option value="pendiente">Pendiente</option>
                  <option value="en proceso">En proceso</option>
                  <option value="completado">Completado</option>
                </select>
              </div>

              {/* Filtro por trabajador */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Trabajador:
                </label>
                <select
                  value={trabajadorFiltro}
                  onChange={(e) => setTrabajadorFiltro(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
                >
                  <option value="">Todos los trabajadores</option>
                  {buttonUser.map((trabajador) => (
                    <option key={trabajador.id} value={trabajador.id}>
                      {trabajador.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filtro por fecha inicio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Fecha inicio:
                </label>
                <input
                  type="date"
                  value={fechaInicio}
                  onChange={(e) => setFechaInicio(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
              </div>

              {/* Filtro por fecha fin */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Fecha fin:
                </label>
                <input
                  type="date"
                  value={fechaFin}
                  onChange={(e) => setFechaFin(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
              </div>
            </div>

            {/* Búsqueda general */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M15.5 10.5a5 5 0 11-10 0 5 5 0 0110 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm text-gray-900 border border-gray-200 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                placeholder="Buscar en producto, pedido o trabajador..."
              />
            </div>

            {/* Info de filtros aplicados */}
            {(estadoFiltro || trabajadorFiltro || fechaInicio || fechaFin) && (
              <div className="text-sm text-gray-600 dark:text-gray-400 flex flex-wrap gap-2">
                Filtros aplicados: 
                {estadoFiltro && <span className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">Estado: {estadoFiltro}</span>}
                {trabajadorFiltro && <span className="bg-green-100 dark:bg-green-900 px-2 py-1 rounded">Trabajador: {buttonUser.find(t => t.id === parseInt(trabajadorFiltro))?.name}</span>}
                {fechaInicio && <span className="bg-yellow-100 dark:bg-yellow-900 px-2 py-1 rounded">Desde: {new Date(fechaInicio).toLocaleDateString()}</span>}
                {fechaFin && <span className="bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded">Hasta: {new Date(fechaFin).toLocaleDateString()}</span>}
              </div>
            )}
          </div>

          {/* Tabla con los datos filtrados */}
          <div className="overflow-x-auto">
            <TablaMarcacionBL 
              itemsPedidos={itemsFiltrados} 
              search={search} 
            />
          </div>
        </div>
        {toast.show && (
          <div className="fixed bottom-6 right-6 z-51">
          <Toast>
              <div
              className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                  toast.success ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"
              }`}
              >
              {toast.success ? <HiCheck className="h-5 w-5" /> : <HiX className="h-5 w-5" />}
              </div>
              <div className="ml-3 text-sm font-normal">{toast.message}</div>
          </Toast>
          </div>
        )}
      </div>
    </AppLayoutBL>
  );
}