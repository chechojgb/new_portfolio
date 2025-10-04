import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useState, useMemo } from "react";
import { themeByProject } from "../utils/theme";
import { usePage } from "@inertiajs/react";
import AgentModalWrapper from '@/components/agentsModalWrapper';
import { ModalViewPedidosBL } from "./modalesBL";

export default function TablaPedidosBL({ search }) {
  const { props } = usePage();
  const proyecto = props?.auth?.user?.proyecto || "AZZU";
  const theme = themeByProject[proyecto];
  const [modalOpen, setModalOpen] = useState(false);
  const [pedidoId, setPedidoId] = useState(null);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);

  const openModal = (pedido) => {
    setPedidoSeleccionado(pedido);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setPedidoSeleccionado(null);
  };

  const estadosStyle = {
    pendiente: "text-yellow-800 bg-yellow-100",
    entregado: "text-green-800 bg-green-100",
    cancelado: "text-red-800 bg-red-100",
  };

  // 🚀 Datos de prueba
  const fakePedidos = Array.from({ length: 20 }, (_, i) => {
    const estados = ["pendiente", "entregado", "cancelado"];
    return {
      id: i + 1,
      usuario_creador: { name: `Usuario ${i + 1}` }, // Creado por
      cliente: {
        nombre: `Cliente ${i + 1}`, // Cliente
        contacto: `contacto${i + 1}@correo.com`, // Contacto
        telefono: `30012345${i + 10}`, // Teléfono
      },
      fecha_pedido: `2025-10-${(i % 30) + 1}`, // Fecha del pedido
      fecha_entrega: `2025-11-${(i % 30) + 1}`, // Fecha de entrega
      notas: i % 3 === 0 ? "Pedido urgente" : "Sin notas", // Notas del pedido
      estado: estados[Math.floor(Math.random() * estados.length)], // Estado
      items: [
        {
          id: `item-${i + 1}-1`,
          empaque: {
            producto: { descripcion: "Botón Azul" },
            codigo_unico: `AZ-${i + 1}-1`,
          },
          cantidad_empaques: Math.floor(Math.random() * 5) + 1,
          nota: i % 2 === 0 ? "Empaque dañado" : null,
        },
        {
          id: `item-${i + 1}-2`,
          empaque: {
            producto: { descripcion: "Botón Rojo" },
            codigo_unico: `RO-${i + 1}-2`,
          },
          cantidad_empaques: Math.floor(Math.random() * 5) + 1,
        },
      ],
    };
  });


  // Memoize de datos
  const data = useMemo(() => fakePedidos, []);

  // Columnas
  const columns = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "cliente",
      header: "Cliente",
      cell: ({ row }) => (
        <div>
          <div className="font-semibold">{row.original.cliente.nombre}</div>
          <div className="text-sm text-gray-500">{row.original.cliente.contacto}</div>
        </div>
      ),
    },
    {
      accessorKey: "items",
      header: "Productos",
      cell: ({ row }) => (
        <div className="space-y-1">
          {row.original.items.map((item, idx) => (
            <div key={idx}>
              {item.empaque.producto.descripcion}{" "}
              <span className="text-gray-500">x{item.cantidad_empaques}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      accessorKey: "fecha_entrega",
      header: "Fecha de entrega",
    },
    {
      accessorKey: "estado",
      header: "Estado",
      cell: ({ row }) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            estadosStyle[row.original.estado] || "text-gray-800 bg-gray-100"
          }`}
        >
          {row.original.estado}
        </span>
      ),
    },
    {
      id: "detalles",
      header: "Detalles",
      cell: ({ row }) => (
        <button
          className={`${theme.text} font-medium hover:underline cursor-pointer`}
          onClick={() => openModal(row.original)} // 👈 pasamos el pedido completo
        >
          Ver más
        </button>
      ),
    },
  ];


  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter: search,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: (row, columnId, value) => {
      const cellValue = String(row.getValue(columnId) ?? "").toLowerCase();
      return cellValue.includes(value.toLowerCase());
    },
  });

  // Render
  return (
    <>
      <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400 border">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 cursor-pointer select-none"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {{
                    asc: " 🔼",
                    desc: " 🔽",
                  }[header.column.getIsSorted()] ?? null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <tr
              key={row.id}
              className={`${
                index % 2 === 0
                  ? "bg-white dark:bg-gray-800"
                  : "bg-gray-50 dark:bg-gray-700"
              } hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors`}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {modalOpen && (
        <AgentModalWrapper closeModal={closeModal}>
          <ModalViewPedidosBL onClose={closeModal} pedido={pedidoSeleccionado} />
        </AgentModalWrapper>
      )}
    </>
  );
}
