// resources/js/Pages/BLInventario/index.jsx
import React from 'react';
import AppLayoutBL from '@/layouts/app-layoutBL';
import { Head } from '@inertiajs/react';
import ListaInventario from '@/components/BL/ListaInventario';
import PlanoAlmacen from '@/components/BL/PlanoAlmacen';
import { useDispositivo } from '@/components/BL/hooks/useDispositivo';
import { useFiltrosInventario } from '@/components/BL/hooks/useFiltrosInventario';
import { useState, useEffect } from 'react';

const breadcrumbs = [
    {
        title: 'Inventario',
        href: '/BLInventario',
    },
];

// 🔹 Hook personalizado para detectar tamaño de pantalla
const useTamañoPantalla = () => {
    const [anchoPantalla, setAnchoPantalla] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

    useEffect(() => {
        const handleResize = () => {
            setAnchoPantalla(window.innerWidth);
        };

        // Verificar al cargar
        handleResize();

        // Escuchar cambios de tamaño
        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return { anchoPantalla };
};

// 🔹 Componente de advertencia
const AdvertenciaPantallaPequena = ({ onCerrar }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
            <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 mb-4">
                    <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Pantalla muy pequeña
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                    Para una mejor visualización del plano:
                </p>
                <ul className="text-sm text-gray-500 mb-6 text-left space-y-2">
                    <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        Cierre el listado del inventario usando el botón inferior
                    </li>
                    <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        Aleje un poco la pantalla (Ctrl + -)
                    </li>
                    <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        Use el zoom del navegador para ajustar la vista
                    </li>
                    <li className="flex items-start strong">
                        <span className="text-blue-500 mr-2">•</span>
                        <strong>Si te encuentras en un dispositivo movil, porfavor dejarlo en modo vertical</strong>
                    </li>
                </ul>
                <button
                    onClick={onCerrar}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
                >
                    Entendido
                </button>
            </div>
        </div>
    </div>
);

// 🔹 Datos de prueba (mock) - se mantienen igual
const mockProductos = [
    // 🔹 EST-01
    { id: 1, descripcion: "Botón metálico dorado", tipo_producto: "Botón", color_nombre: "Dorado", tamanio: "12mm", stock_total: 500, estanteria: "EST-01", estanterias_codigos: ["EST-01"], tiene_ubicacion: true },
    { id: 2, descripcion: "Botón metálico negro", tipo_producto: "Botón", color_nombre: "Negro", tamanio: "15mm", stock_total: 200, estanteria: "EST-01", estanterias_codigos: ["EST-01"], tiene_ubicacion: true },

    // 🔹 EST-02
    { id: 3, descripcion: "Botón plástico rojo", tipo_producto: "Botón", color_nombre: "Rojo", tamanio: "10mm", stock_total: 300, estanteria: "EST-02", estanterias_codigos: ["EST-02"], tiene_ubicacion: true },
    { id: 4, descripcion: "Botón plástico azul", tipo_producto: "Botón", color_nombre: "Azul", tamanio: "9mm", stock_total: 150, estanteria: "EST-02", estanterias_codigos: ["EST-02"], tiene_ubicacion: true },

    // 🔹 EST-03
    { id: 5, descripcion: "Hilo de coser negro", tipo_producto: "Hilo", color_nombre: "Negro", tamanio: "100m", stock_total: 50, estanteria: "EST-03", estanterias_codigos: ["EST-03"], tiene_ubicacion: true },
    { id: 6, descripcion: "Hilo de coser blanco", tipo_producto: "Hilo", color_nombre: "Blanco", tamanio: "200m", stock_total: 0, estanteria: "EST-03", estanterias_codigos: ["EST-03"], tiene_ubicacion: true },

    // 🔹 EST-04
    { id: 7, descripcion: "Botón plástico verde", tipo_producto: "Botón", color_nombre: "Verde", tamanio: "9mm", stock_total: 100, estanteria: "EST-04", estanterias_codigos: ["EST-04"], tiene_ubicacion: true },
    { id: 8, descripcion: "Botón metálico plateado", tipo_producto: "Botón", color_nombre: "Plateado", tamanio: "11mm", stock_total: 250, estanteria: "EST-04", estanterias_codigos: ["EST-04"], tiene_ubicacion: true },

    // 🔹 EST-05
    { id: 9, descripcion: "Elástico ancho blanco", tipo_producto: "Elástico", color_nombre: "Blanco", tamanio: "30mm", stock_total: 40, estanteria: "EST-05", estanterias_codigos: ["EST-05"], tiene_ubicacion: true },
    { id: 10, descripcion: "Elástico delgado negro", tipo_producto: "Elástico", color_nombre: "Negro", tamanio: "10mm", stock_total: 70, estanteria: "EST-05", estanterias_codigos: ["EST-05"], tiene_ubicacion: true },

    // 🔹 EST-06
    { id: 11, descripcion: "Cremallera invisible negra", tipo_producto: "Cremallera", color_nombre: "Negro", tamanio: "18cm", stock_total: 80, estanteria: "EST-06", estanterias_codigos: ["EST-06"], tiene_ubicacion: true },
    { id: 12, descripcion: "Cremallera metálica dorada", tipo_producto: "Cremallera", color_nombre: "Dorado", tamanio: "22cm", stock_total: 95, estanteria: "EST-06", estanterias_codigos: ["EST-06"], tiene_ubicacion: true },

    // 🔹 EST-07
    { id: 13, descripcion: "Cremallera plástica azul", tipo_producto: "Cremallera", color_nombre: "Azul", tamanio: "15cm", stock_total: 200, estanteria: "EST-07", estanterias_codigos: ["EST-07"], tiene_ubicacion: true },
    { id: 14, descripcion: "Cremallera metálica plateada", tipo_producto: "Cremallera", color_nombre: "Plateado", tamanio: "20cm", stock_total: 120, estanteria: "EST-07", estanterias_codigos: ["EST-07"], tiene_ubicacion: true },

    // 🔹 RACK-01
    { id: 15, descripcion: "Cinta métrica flexible", tipo_producto: "Accesorio", color_nombre: "Amarillo", tamanio: "150cm", stock_total: 35, estanteria: "RACK-01", estanterias_codigos: ["RACK-01"], tiene_ubicacion: true },
    { id: 16, descripcion: "Agujas de coser finas", tipo_producto: "Accesorio", color_nombre: "Plateado", tamanio: "Pequeñas", stock_total: 80, estanteria: "RACK-01", estanterias_codigos: ["RACK-01"], tiene_ubicacion: true },

    // 🔹 RACK-02
    { id: 17, descripcion: "Botón metálico azul", tipo_producto: "Botón", color_nombre: "Azul", tamanio: "10mm", stock_total: 150, estanteria: "RACK-02", estanterias_codigos: ["RACK-02"], tiene_ubicacion: true },
    { id: 18, descripcion: "Botón plástico blanco", tipo_producto: "Botón", color_nombre: "Blanco", tamanio: "12mm", stock_total: 90, estanteria: "RACK-02", estanterias_codigos: ["RACK-02"], tiene_ubicacion: true },

    // 🔹 RACK-03
    { id: 19, descripcion: "Elástico rojo fuerte", tipo_producto: "Elástico", color_nombre: "Rojo", tamanio: "25mm", stock_total: 55, estanteria: "RACK-03", estanterias_codigos: ["RACK-03"], tiene_ubicacion: true },
    { id: 20, descripcion: "Elástico azul marino", tipo_producto: "Elástico", color_nombre: "Azul", tamanio: "15mm", stock_total: 60, estanteria: "RACK-03", estanterias_codigos: ["RACK-03"], tiene_ubicacion: true },

    // 🔹 RACK-04
    { id: 21, descripcion: "Botón metálico grande", tipo_producto: "Botón", color_nombre: "Plateado", tamanio: "20mm", stock_total: 300, estanteria: "RACK-04", estanterias_codigos: ["RACK-04"], tiene_ubicacion: true },
    { id: 22, descripcion: "Botón transparente mediano", tipo_producto: "Botón", color_nombre: "Transparente", tamanio: "14mm", stock_total: 180, estanteria: "RACK-04", estanterias_codigos: ["RACK-04"], tiene_ubicacion: true },

    // 🔹 RACK-05
    { id: 23, descripcion: "Hilo de coser verde", tipo_producto: "Hilo", color_nombre: "Verde", tamanio: "150m", stock_total: 120, estanteria: "RACK-05", estanterias_codigos: ["RACK-05"], tiene_ubicacion: true },
    { id: 24, descripcion: "Hilo de coser gris", tipo_producto: "Hilo", color_nombre: "Gris", tamanio: "80m", stock_total: 70, estanteria: "RACK-05", estanterias_codigos: ["RACK-05"], tiene_ubicacion: true },

    // 🔹 RACK-06
    { id: 25, descripcion: "Cremallera roja", tipo_producto: "Cremallera", color_nombre: "Rojo", tamanio: "20cm", stock_total: 110, estanteria: "RACK-06", estanterias_codigos: ["RACK-06"], tiene_ubicacion: true },
    { id: 26, descripcion: "Cremallera azul cielo", tipo_producto: "Cremallera", color_nombre: "Azul", tamanio: "25cm", stock_total: 85, estanteria: "RACK-06", estanterias_codigos: ["RACK-06"], tiene_ubicacion: true },

    // 🔹 RACK-07
    { id: 27, descripcion: "Botón negro mate", tipo_producto: "Botón", color_nombre: "Negro", tamanio: "13mm", stock_total: 210, estanteria: "RACK-07", estanterias_codigos: ["RACK-07"], tiene_ubicacion: true },
    { id: 28, descripcion: "Botón verde oscuro", tipo_producto: "Botón", color_nombre: "Verde", tamanio: "11mm", stock_total: 95, estanteria: "RACK-07", estanterias_codigos: ["RACK-07"], tiene_ubicacion: true },

    // 🔹 RACK-08
    { id: 29, descripcion: "Accesorio broches metálicos", tipo_producto: "Accesorio", color_nombre: "Plateado", tamanio: "Pequeños", stock_total: 60, estanteria: "RACK-08", estanterias_codigos: ["RACK-08"], tiene_ubicacion: true },
    { id: 30, descripcion: "Accesorio alfileres grandes", tipo_producto: "Accesorio", color_nombre: "Plateado", tamanio: "Grandes", stock_total: 45, estanteria: "RACK-08", estanterias_codigos: ["RACK-08"], tiene_ubicacion: true },

    // 🔹 RACK-09
    { id: 31, descripcion: "Elástico gris claro", tipo_producto: "Elástico", color_nombre: "Gris", tamanio: "12mm", stock_total: 50, estanteria: "RACK-09", estanterias_codigos: ["RACK-09"], tiene_ubicacion: true },
    { id: 32, descripcion: "Elástico marrón", tipo_producto: "Elástico", color_nombre: "Marrón", tamanio: "18mm", stock_total: 70, estanteria: "RACK-09", estanterias_codigos: ["RACK-09"], tiene_ubicacion: true },

    // 🔹 RACK-10
    { id: 33, descripcion: "Cremallera gris oscuro", tipo_producto: "Cremallera", color_nombre: "Gris", tamanio: "30cm", stock_total: 130, estanteria: "RACK-10", estanterias_codigos: ["RACK-10"], tiene_ubicacion: true },
    { id: 34, descripcion: "Cremallera blanca", tipo_producto: "Cremallera", color_nombre: "Blanco", tamanio: "25cm", stock_total: 95, estanteria: "RACK-10", estanterias_codigos: ["RACK-10"], tiene_ubicacion: true },

    // 🔹 Productos sin ubicación
    { id: 35, descripcion: "Botón transparente pequeño", tipo_producto: "Botón", color_nombre: "Transparente", tamanio: "8mm", stock_total: 0, estanteria: "Sin ubicación", estanterias_codigos: [], tiene_ubicacion: false },
    { id: 36, descripcion: "Hilo azul sin clasificar", tipo_producto: "Hilo", color_nombre: "Azul", tamanio: "120m", stock_total: 40, estanteria: "Sin ubicación", estanterias_codigos: [], tiene_ubicacion: false },
];


const mockEstanterias = [
    { id: 1, nombre: "Estantería A", niveles: ["Nivel 1", "Nivel 2", "Nivel 3"] },
    { id: 2, nombre: "Estantería B", niveles: ["Nivel 1", "Nivel 2", "Nivel 3"] },
    { id: 3, nombre: "Estantería C", niveles: ["Nivel 1", "Nivel 2", "Nivel 3"] },
];

export default function PlanoInventario() {
    const productos = mockProductos;
    const estanterias = mockEstanterias;

    const { isMobile } = useDispositivo();
    const { anchoPantalla } = useTamañoPantalla();
    const [mostrarLista, setMostrarLista] = useState(true);
    const [advertenciaVisible, setAdvertenciaVisible] = useState(false);
    const [cerrarLista, setCerrarLista] = useState(false);

    const {
        filtro,
        setFiltro,
        busqueda,
        setBusqueda,
        categoriaFiltro,
        setCategoriaFiltro,
        productosFiltrados,
        categorias,
        limpiarFiltros
    } = useFiltrosInventario(productos);

    const handleEstanteriaClick = (estanteria) => {
        setFiltro(filtro === estanteria ? null : estanteria);
    };

    // Mostrar advertencia cuando la pantalla sea pequeña
    useEffect(() => {
        if (anchoPantalla < 1700 && !advertenciaVisible) {
            setAdvertenciaVisible(true);
        }
    }, [anchoPantalla, advertenciaVisible]);

    useEffect(() => {
        if (anchoPantalla < 1450 && !cerrarLista) {
            setCerrarLista(true);
        } else if (anchoPantalla >= 1450 && cerrarLista) {
            setCerrarLista(false);
        }
    }, [anchoPantalla, cerrarLista]);

    // console.log('tamaño:',cerrarLista );
    
    

    const cerrarAdvertencia = () => {
        setAdvertenciaVisible(false);
    };

    const toggleLista = () => {
        setMostrarLista(!mostrarLista);
    };

    // Para pantallas móviles
    if (isMobile) {
        return (
            <AppLayoutBL breadcrumbs={breadcrumbs}>
                <Head title="Inventario Buttons Lovers" />
                <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
                    <ListaInventario
                        productos={productos}
                        productosFiltrados={productosFiltrados}
                        filtro={filtro}
                        busqueda={busqueda}
                        categoriaFiltro={categoriaFiltro}
                        categorias={categorias}
                        onFiltroChange={setFiltro}
                        onBusquedaChange={setBusqueda}
                        onCategoriaChange={setCategoriaFiltro}
                        onLimpiarFiltros={limpiarFiltros}
                        onEstanteriaClick={handleEstanteriaClick}
                        estanterias={estanterias}
                    />
                </div>
            </AppLayoutBL>
        );
    }

    // Para pantallas menores a 1700px
    if (anchoPantalla < 1000 && !isMobile) {
        return (
            <AppLayoutBL breadcrumbs={breadcrumbs}>
                <Head title="Inventario Buttons Lovers" />
                
                {/* Advertencia para pantallas pequeñas */}
                {advertenciaVisible && (
                    <AdvertenciaPantallaPequena onCerrar={cerrarAdvertencia} />
                )}

                <div className="flex h-screen dark:bg-black p-6 gap-6 relative">
                    {/* Plano del almacén - Ocupa todo el espacio cuando la lista está oculta */}
                    <div className={`${mostrarLista ? 'flex-1' : 'w-full'}`}>
                        <PlanoAlmacen 
                            onEstanteriaClick={handleEstanteriaClick}
                            productos={productos}
                        />
                    </div>
                    
                    {/* Lista de inventario - Condicional */}
                    {mostrarLista && (
                        <div className="w-96 flex-shrink-0">
                            <ListaInventario 
                                productos={productos}
                                productosFiltrados={productosFiltrados}
                                filtro={filtro}
                                busqueda={busqueda}
                                categoriaFiltro={categoriaFiltro}
                                categorias={categorias}
                                onFiltroChange={setFiltro}
                                onBusquedaChange={setBusqueda}
                                onCategoriaChange={setCategoriaFiltro}
                                onLimpiarFiltros={limpiarFiltros}
                                onEstanteriaClick={handleEstanteriaClick}
                                estanterias={estanterias}
                              
                            />
                        </div>
                    )}

                    {/* Botón flotante para mostrar/ocultar lista */}
                    <button
                        onClick={toggleLista}
                        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg z-40 transition duration-200"
                        title={mostrarLista ? 'Ocultar listado' : 'Mostrar listado'}
                    >
                        {mostrarLista ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </AppLayoutBL>
        );
    }

    // Para pantallas mayores o iguales a 1700px - ESTILOS ORIGINALES
    return (
        
        <AppLayoutBL breadcrumbs={breadcrumbs}>
            <Head title="Inventario Buttons Lovers" />
            
            <div className="flex h-screen dark:bg-black p-6 gap-6">
                {/* Plano del almacén */}
                <PlanoAlmacen 
                    onEstanteriaClick={handleEstanteriaClick}
                    productos={productos}
                />
                
                {/* Lista de inventario */}
                <ListaInventario 
                    productos={productos}
                    productosFiltrados={productosFiltrados}
                    filtro={filtro}
                    busqueda={busqueda}
                    categoriaFiltro={categoriaFiltro}
                    categorias={categorias}
                    onFiltroChange={setFiltro}
                    onBusquedaChange={setBusqueda}
                    onCategoriaChange={setCategoriaFiltro}
                    onLimpiarFiltros={limpiarFiltros}
                    onEstanteriaClick={handleEstanteriaClick}
                    estanterias={estanterias}
                    cerrarLista={cerrarLista}
                />
            </div>
        </AppLayoutBL>
    );
}