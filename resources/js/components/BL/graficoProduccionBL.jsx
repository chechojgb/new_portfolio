import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { useState, useEffect } from 'react';

// Función para generar números aleatorios en un rango
const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export default function GraficoProduccionBL() {
  const [tipo, setTipo] = useState('semanal');

  // Estados para los datos de cada gráfico
  const [semanal, setSemanal] = useState([]);
  const [mensual, setMensual] = useState([]);
  const [trimestral, setTrimestral] = useState([]);

  // Funciones para generar datos aleatorios
  const generarDatosSemanal = () => {
    const dias = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    return dias.map(dia => ({ dia, produccion: randomNumber(50, 150) }));
  };

  const generarDatosMensual = () => {
    const dias = Array.from({ length: 30 }, (_, i) => i + 1);
    return dias.map(dia => ({ dia: `D${dia}`, produccion: randomNumber(200, 400) }));
  };

  const generarDatosTrimestral = () => {
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return meses.map(mes => ({ mes, produccion: randomNumber(600, 1200) }));
  };

  // useEffect para inicializar datos y actualizar cada cierto tiempo
  useEffect(() => {
    setSemanal(generarDatosSemanal());
    setMensual(generarDatosMensual());
    setTrimestral(generarDatosTrimestral());

    const interval = setInterval(() => {
      setSemanal(generarDatosSemanal());
      setMensual(generarDatosMensual());
      setTrimestral(generarDatosTrimestral());
    }, 3000); // actualizar cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  const renderGrafico = () => {
    if (tipo === 'semanal') {
      return (
        <LineChart data={semanal} margin={{ top: 10, right: 20, left: -10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
          <XAxis dataKey="dia" stroke="#888888" />
          <YAxis stroke="#888888" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="produccion"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            animationDuration={800}
          />
        </LineChart>
      );
    }

    if (tipo === 'mensual') {
      return (
        <BarChart data={mensual} margin={{ top: 10, right: 20, left: -10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
          <XAxis dataKey="dia" stroke="#888888" />
          <YAxis stroke="#888888" />
          <Tooltip />
          <Bar dataKey="produccion" fill="#3b82f6" barSize={30} />
        </BarChart>
      );
    }

    if (tipo === 'trimestral') {
      return (
        <AreaChart data={trimestral} margin={{ top: 10, right: 20, left: -10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
          <XAxis dataKey="mes" stroke="#888888" />
          <YAxis stroke="#888888" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="produccion"
            stroke="#3b82f6"
            fill="#4e90f9ff"
            fillOpacity={0.4}
          />
        </AreaChart>
      );
    }
  };

  return (
    <div className="p-5 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Producción
        </h3>
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="rounded-lg border px-2 py-1 text-sm dark:bg-gray-800 dark:text-white"
        >
          <option value="semanal">Semanal</option>
          <option value="mensual">Mensual</option>
          <option value="trimestral">Trimestral</option>
        </select>
      </div>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          {renderGrafico()}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
