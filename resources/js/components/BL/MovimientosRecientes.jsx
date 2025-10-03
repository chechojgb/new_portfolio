import { useEffect, useState } from "react";
import { ArrowDownCircle, ArrowUpCircle, Users, Package, ClipboardList } from "lucide-react";

// Datos falsos para simular movimientos
const movimientosFalsos = [
  {
    tipo: "entrada",
    motivo: "Ingreso de botones",
    created_at: new Date().toISOString(),
  },
  {
    tipo: "salida",
    motivo: "Salida hacia cliente",
    created_at: new Date().toISOString(),
  },
  {
    tipo: "pedido",
    motivo: "Pedido #245",
    created_at: new Date().toISOString(),
  },
  {
    tipo: "marcacion",
    motivo: "Marcación de lote A12",
    created_at: new Date().toISOString(),
  },
  {
    tipo: "cliente",
    motivo: "Nuevo cliente agregado",
    created_at: new Date().toISOString(),
  },
];

export default function MovimientosRecientesBL() {
  const [movimientos, setMovimientos] = useState([]);

  useEffect(() => {
    // Cada 3 segundos se agrega un movimiento "nuevo"
    const interval = setInterval(() => {
      const nuevoMov = {
        ...movimientosFalsos[Math.floor(Math.random() * movimientosFalsos.length)],
        created_at: new Date().toISOString(),
      };

      setMovimientos((prev) => {
        const actualizados = [nuevoMov, ...prev];
        return actualizados.slice(0, 6); // máximo 6 elementos en la lista
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col h-full p-5">
      {/* Header */}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Movimientos recientes
      </h3>

      {/* Lista scrollable */}
      <div className="flex-1 overflow-y-auto pr-1">
        <ul className="space-y-4 text-sm text-gray-800 dark:text-gray-300">
          {movimientos.map((mov, i) => {
            // Icono según tipo de movimiento
            let icono;
            switch (mov.tipo) {
              case "entrada":
                icono = <ArrowDownCircle className="text-green-600 w-5 h-5" />;
                break;
              case "salida":
                icono = <ArrowUpCircle className="text-red-600 w-5 h-5" />;
                break;
              case "pedido":
                icono = <ClipboardList className="text-blue-600 w-5 h-5" />;
                break;
              case "marcacion":
                icono = <Package className="text-yellow-600 w-5 h-5" />;
                break;
              case "cliente":
                icono = <Users className="text-purple-600 w-5 h-5" />;
                break;
              default:
                icono = <Package className="text-gray-400 w-5 h-5" />;
            }

            return (
              <li key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full">
                    {icono}
                  </div>
                  <div>
                    <p className="font-medium">
                      {mov.tipo.toUpperCase()}: {mov.motivo}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Fecha: {new Date(mov.created_at).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
