import { useEffect, useState } from "react";
import { Medal } from "lucide-react";

const coloresRanking = ["text-yellow-500", "text-gray-400", "text-orange-700"];

export default function RankingBotonesVendidosBL() {
  const [pedidos, setPedidos] = useState([
    { id: 1, nombre: "Botón Rojo", cantidad: 120 },
    { id: 2, nombre: "Botón Azul", cantidad: 90 },
    { id: 3, nombre: "Botón Verde", cantidad: 75 },
    { id: 4, nombre: "Botón Negro", cantidad: 60 },
    { id: 5, nombre: "Botón Blanco", cantidad: 50 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPedidos((prev) =>
        prev.map((p) => ({
          ...p,
          // Generamos una cantidad random para alternar valores
          cantidad: Math.floor(Math.random() * 150) + 20,
        }))
        // Ordenamos de mayor a menor para simular ranking
        .sort((a, b) => b.cantidad - a.cantidad)
      );
    }, 3000); // cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative p-4 h-full">
      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
        Ranking de botones más vendidos
      </h3>

      <div className="overflow-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
            <tr>
              <th className="py-2 pr-4 font-medium">#</th>
              <th className="py-2 pr-4 font-medium">Producto</th>
              <th className="py-2 text-right font-medium">Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((boton, index) => (
              <tr
                key={boton.id}
                className={`${
                  index % 2 === 0
                    ? "bg-gray-50 dark:bg-gray-800"
                    : "bg-white dark:bg-gray-900"
                } border-l-4 ${
                  index < 3
                    ? `border-l-${coloresRanking[index].split("-")[1]}-400`
                    : "border-transparent"
                }`}
              >
                <td className="py-2 pr-4 pl-2">
                  {index < 3 ? (
                    <Medal
                      size={16}
                      className={`${coloresRanking[index]} inline-block mr-1`}
                    />
                  ) : (
                    <span className="text-gray-400">{index + 1}</span>
                  )}
                </td>
                <td className="py-2 pr-4 text-gray-800 dark:text-gray-100">
                  {boton.nombre}
                </td>
                <td className="py-2 text-right text-gray-700 dark:text-gray-300">
                  {boton.cantidad} u
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
