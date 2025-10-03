import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const colores = ["#4ade80", "#60a5fa", "#facc15", "#fb923c", "#f87171"];

// Productos ficticios
const productosIniciales = [
  { descripcion: "Botón rojo", stock_total: 120 },
  { descripcion: "Botón azul", stock_total: 80 },
  { descripcion: "Botón verde", stock_total: 150 },
  { descripcion: "Botón amarillo", stock_total: 60 },
  { descripcion: "Botón negro", stock_total: 100 },
];

export default function StockActualProductosBL() {
  const [productosStock, setProductosStock] = useState(productosIniciales);

  useEffect(() => {
    const interval = setInterval(() => {
      // Generar nuevos valores aleatorios
      const nuevos = productosIniciales.map((p) => ({
        ...p,
        stock_total: Math.floor(Math.random() * 200) + 20, // entre 20 y 220
      }));
      setProductosStock(nuevos);
    }, 4000); // cada 4 segundos cambia

    return () => clearInterval(interval);
  }, []);

  const data = {
    labels: productosStock.map((p) => p.descripcion),
    datasets: [
      {
        data: productosStock.map((p) => p.stock_total),
        backgroundColor: colores,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 12,
          font: { size: 10 },
          color: "#374151",
        },
      },
    },
  };

  return (
    <div className="relative flex flex-col h-full p-4">
      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
        Stock actual de productos
      </h3>

      <div className="flex-1 flex items-center justify-center">
        <div className="w-70 h-70">
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
