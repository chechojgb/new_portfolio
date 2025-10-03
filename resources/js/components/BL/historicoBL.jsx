import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, ArrowUp, PackageCheck } from "lucide-react";
import { format } from "date-fns";

// Datos de prueba
const nombres = ["Sergio", "Ana", "Luis", "Carla", "Pedro"];
const productos = ["Botón rojo", "Ojillo azul", "Broche verde", "Botón amarillo"];
const motivos = ["Cambio de estado a en proceso", "Cambio de estado a completado"];

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Generadores de datos de prueba
const generarEntradas = () =>
  Array.from({ length: 5 }, (_, i) => ({
    id: i,
    tipo: "entrada",
    updated_at: new Date(),
    usuario: { name: getRandom(nombres) },
    movible: {
      producto: { descripcion: getRandom(productos) },
      cantidad_por_empaque: getRandomNumber(1, 20),
    },
  }));

const generarMarcaciones = () =>
  Array.from({ length: 6 }, (_, i) => ({
    id: i,
    tipo: "pedido",
    motivo: getRandom(motivos),
    updated_at: new Date(),
    cantidad: getRandomNumber(1, 15),
    usuario: { name: getRandom(nombres) },
  }));

const generarEntregas = () =>
  Array.from({ length: 4 }, (_, i) => ({
    id: i,
    estado: "entregado",
    tipo: "pedido",
    updated_at: new Date(),
    cliente: { nombre: getRandom(nombres) },
  }));

// COMPONENTE ENTRADAS
export default function EntradaBL() {
  const [entradas, setEntradas] = useState(generarEntradas()); // Datos iniciales

  useEffect(() => {
    const interval = setInterval(() => {
      setEntradas(generarEntradas());
    }, 4000); // se actualiza cada 4s
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="h-[350px] overflow-hidden shadow-md border">
      <CardContent className="p-4 flex flex-col gap-4 h-full">
        <div className="flex items-center gap-3">
          <div className="bg-green-100 p-2 rounded-full black:bg-green-200">
            <ArrowDown className="w-5 h-5 text-green-600 black:text-green-700" />
          </div>
          <h2 className="text-lg font-bold text-green-700 tracking-tight">
            Entrada de productos
          </h2>
        </div>

        <div className="overflow-y-auto pr-2 h-full space-y-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {entradas.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-start border p-3 rounded-lg transition hover:shadow-md"
            >
              <div className="space-y-1">
                <p className="font-semibold">{item.movible.producto.descripcion}</p>
                <p className="text-xs">
                  {format(new Date(item.updated_at), "dd-MM-yyyy HH:mm")} — {item.tipo} —{" "}
                  <span className="font-medium">{item.usuario.name}</span>
                </p>
              </div>
              <Badge variant="outline" className="text-sm border-green-300 text-green-600">
                {item.movible.cantidad_por_empaque} und
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// COMPONENTE MARCACIONES
export function MarcacionBL() {
  const [marcaciones, setMarcaciones] = useState(generarMarcaciones());

  useEffect(() => {
    const interval = setInterval(() => {
      setMarcaciones(generarMarcaciones());
    }, 5000); // se actualiza cada 5s
    return () => clearInterval(interval);
  }, []);

  const enProceso = marcaciones.filter((item) => item.motivo.includes("en proceso"));
  const completados = marcaciones.filter((item) => item.motivo.includes("completado"));

  return (
    <Card className="h-[350px] overflow-hidden shadow-md border">
      <CardContent className="p-4 flex flex-col gap-4 h-full">
        <div className="flex items-center gap-3">
          <div className="bg-yellow-50 p-2 rounded-full dark:bg-yellow-200">
            <ArrowUp className="w-5 h-5 text-yellow-400 dark:text-yellow-700" />
          </div>
          <h2 className="text-lg font-bold text-yellow-700 tracking-tight">Items en marcación</h2>
        </div>

        <div className="overflow-y-auto pr-2 h-full space-y-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          <div>
            <h3 className="text-sm font-semibold text-blue-600 mb-2">En proceso</h3>
            {enProceso.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-start border p-3 rounded-lg transition hover:shadow-md"
              >
                <div className="space-y-1">
                  <p className="font-semibold">{item.motivo}</p>
                  <p className="text-xs">
                    {format(new Date(item.updated_at), "dd-MM-yyyy HH:mm")} — {item.tipo} —{" "}
                    <span className="font-medium">{item.usuario.name}</span>
                  </p>
                </div>
                <Badge variant="outline" className="text-sm border-blue-300 text-blue-600">
                  {item.cantidad} und
                </Badge>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-sm font-semibold text-green-600 mb-2">Completados</h3>
            {completados.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-start border p-3 rounded-lg transition hover:shadow-md"
              >
                <div className="space-y-1">
                  <p className="font-semibold">{item.motivo}</p>
                  <p className="text-xs">
                    {format(new Date(item.updated_at), "dd-MM-yyyy HH:mm")} — {item.tipo} —{" "}
                    <span className="font-medium">{item.usuario.name}</span>
                  </p>
                </div>
                <Badge variant="outline" className="text-sm border-green-300 text-green-600">
                  {item.cantidad} und
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// COMPONENTE ENTREGAS
export function EntregaBL() {
  const [entregas, setEntregas] = useState(generarEntregas());

  useEffect(() => {
    const interval = setInterval(() => {
      setEntregas(generarEntregas());
    }, 6000); // se actualiza cada 6s
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="h-[350px] overflow-hidden shadow-md border">
      <CardContent className="p-4 flex flex-col gap-4 h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-blue-50 p-2 rounded-full dark:bg-blue-200">
            <PackageCheck className="w-5 h-5 text-blue-400 dark:text-blue-700" />
          </div>
          <h2 className="text-lg font-bold text-blue-700 tracking-tight">Pedidos entregados</h2>
        </div>

        <div className="overflow-y-auto pr-2 h-full space-y-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {entregas.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-start border p-3 rounded-lg transition hover:shadow-md"
            >
              <div className="space-y-1">
                <p className="font-semibold">PED #{item.id}</p>
                <p className="text-xs">
                  fecha entrega: {format(new Date(item.updated_at), "dd-MM-yyyy HH:mm")} —{" "}
                  {item.tipo} — <span className="font-medium">{item.cliente.nombre}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
