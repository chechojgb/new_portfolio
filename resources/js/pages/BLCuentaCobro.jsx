// resources/js/Pages/BLCuentaCobro/index.jsx

import AppLayoutBL from '@/layouts/app-layoutBL';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs = [
    {
        title: 'Cuentas de cobro',
        href: '/BLCuentaCobro',
    },
];

// Datos de prueba
const datosPrueba = [
    {
        id: 1,
        numero: "CC-001-2023",
        cliente: "Empresa ABC S.A.S.",
        fecha_emision: "2023-10-15",
        fecha_vencimiento: "2023-11-15",
        monto: 2500000,
        estado: "pendiente",
        descripcion: "Servicios de consultoría Q3 2023",
        telefono: "+57 300 123 4567",
        email: "contacto@empresaabc.com",
        dias_vencimiento: 5,
        items: [
            { descripcion: "Consultoría estratégica", cantidad: 40, precio: 50000 },
            { descripcion: "Análisis de mercado", cantidad: 1, precio: 500000 }
        ]
    },
    {
        id: 2,
        numero: "CC-002-2023",
        cliente: "Comercial XYZ Ltda",
        fecha_emision: "2023-10-10",
        fecha_vencimiento: "2023-10-25",
        monto: 1800000,
        estado: "pagado",
        descripcion: "Desarrollo software personalizado",
        telefono: "+57 310 987 6543",
        email: "compras@comercialxyz.com",
        fecha_pago: "2023-10-20",
        items: [
            { descripcion: "Desarrollo módulo principal", cantidad: 1, precio: 1200000 },
            { descripcion: "Capacitación equipo", cantidad: 2, precio: 300000 }
        ]
    },
    {
        id: 3,
        numero: "CC-003-2023",
        cliente: "Distribuidora Norte S.A.",
        fecha_emision: "2023-09-20",
        fecha_vencimiento: "2023-10-20",
        monto: 3200000,
        estado: "vencido",
        descripcion: "Suministro de materiales",
        telefono: "+57 315 555 8888",
        email: "finanzas@distribuidoranorte.com",
        dias_vencimiento: -12,
        items: [
            { descripcion: "Materiales de construcción", cantidad: 100, precio: 25000 },
            { descripcion: "Transporte y logística", cantidad: 1, precio: 700000 }
        ]
    },
    {
        id: 4,
        numero: "CC-004-2023",
        cliente: "Alimentos Saludables Ltda",
        fecha_emision: "2023-10-18",
        fecha_vencimiento: "2023-11-18",
        monto: 1500000,
        estado: "pendiente",
        descripcion: "Servicios de marketing digital",
        telefono: "+57 320 444 3333",
        email: "mercadeo@alimentossaludables.com",
        dias_vencimiento: 28,
        items: [
            { descripcion: "Campaña redes sociales", cantidad: 1, precio: 800000 },
            { descripcion: "Content marketing", cantidad: 1, precio: 700000 }
        ]
    }
];

export default function CuentasCobroPage() {
    const [filtroEstado, setFiltroEstado] = useState('todos');
    const [busqueda, setBusqueda] = useState('');
    const [orden, setOrden] = useState('fecha_reciente');
    const [vista, setVista] = useState('grid'); // grid o list

    // Función para calcular días restantes
    const calcularDiasRestantes = (fechaVencimiento) => {
        const hoy = new Date();
        const vencimiento = new Date(fechaVencimiento);
        const diffTime = vencimiento - hoy;
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    // Enriquecer datos
    const cuentasEnriquecidas = datosPrueba.map(cuenta => ({
        ...cuenta,
        dias_restantes: calcularDiasRestantes(cuenta.fecha_vencimiento)
    }));

    // Filtrar y ordenar
    const cuentasFiltradas = cuentasEnriquecidas
        .filter(cuenta => {
            const coincideEstado = filtroEstado === 'todos' || cuenta.estado === filtroEstado;
            const coincideBusqueda = cuenta.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
                                   cuenta.numero.toString().includes(busqueda) ||
                                   cuenta.descripcion.toLowerCase().includes(busqueda.toLowerCase());
            return coincideEstado && coincideBusqueda;
        })
        .sort((a, b) => {
            switch(orden) {
                case 'monto_alto': return b.monto - a.monto;
                case 'monto_bajo': return a.monto - b.monto;
                case 'fecha_reciente': return new Date(b.fecha_emision) - new Date(a.fecha_emision);
                case 'fecha_antigua': return new Date(a.fecha_emision) - new Date(b.fecha_emision);
                case 'vencimiento_cercano': return a.dias_restantes - b.dias_restantes;
                default: return 0;
            }
        });

    const getEstadoColor = (estado) => {
        switch(estado) {
            case 'pagado': return 'border-l-green-500 bg-green-50';
            case 'pendiente': return 'border-l-yellow-500 bg-yellow-50';
            case 'vencido': return 'border-l-red-500 bg-red-50';
            default: return 'border-l-gray-500 bg-gray-50';
        }
    };

    const getEstadoBadge = (estado) => {
        switch(estado) {
            case 'pagado': return 'bg-green-100 text-green-800';
            case 'pendiente': return 'bg-yellow-100 text-yellow-800';
            case 'vencido': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getIconoEstado = (estado) => {
        switch(estado) {
            case 'pagado': return '✅';
            case 'pendiente': return '⏳';
            case 'vencido': return '⚠️';
            default: return '📄';
        }
    };

    return (
        <AppLayoutBL breadcrumbs={breadcrumbs}>
            <Head title="Cuentas de Cobro" />

            <div className="container mx-auto px-4 py-6">
                <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                    Cuentas de Cobro
                </h1>

                {/* Listado de tarjetas */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {cuentasFiltradas.map((cuenta) => (
                    <div
                        key={cuenta.id}
                        className={`rounded-xl shadow-lg border-l-4 ${getEstadoColor(
                        cuenta.estado
                        )} bg-white dark:bg-gray-800`}
                    >
                        <div className="p-6">
                        {/* Encabezado */}
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center space-x-3">
                            <div className="text-2xl">{getIconoEstado(cuenta.estado)}</div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                #{cuenta.numero}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                {cuenta.cliente}
                                </p>
                            </div>
                            </div>
                            <span
                            className={`px-3 py-1 text-xs font-semibold rounded-full ${getEstadoBadge(
                                cuenta.estado
                            )}`}
                            >
                            {cuenta.estado}
                            </span>
                        </div>

                        {/* Descripción */}
                        <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
                            {cuenta.descripcion}
                        </p>

                        {/* Fechas */}
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                            <span>Emisión:</span>
                            <span>{new Date(cuenta.fecha_emision).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                            <span>Vencimiento:</span>
                            <span>{new Date(cuenta.fecha_vencimiento).toLocaleDateString()}</span>
                        </div>

                        {/* Ítems */}
                        <div className="mt-4">
                            <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                            Ítems:
                            </h4>
                            <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                            {cuenta.items.map((item, idx) => (
                                <li
                                key={idx}
                                className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-1"
                                >
                                <span>
                                    {item.descripcion}{" "}
                                    <span className="text-gray-500 dark:text-gray-400">
                                    x{item.cantidad}
                                    </span>
                                </span>
                                <span>${(item.cantidad * item.precio).toLocaleString()}</span>
                                </li>
                            ))}
                            </ul>
                        </div>

                        {/* Total */}
                        <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-gray-100 mt-4">
                            <span>Total:</span>
                            <span>${cuenta.monto.toLocaleString()}</span>
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>


        </AppLayoutBL>
    );
}
