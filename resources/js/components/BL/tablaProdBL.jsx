import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table';
import { useState, useEffect, useMemo } from 'react';
import { themeByProject } from '../utils/theme';
import { usePage } from '@inertiajs/react';
import AgentModalWrapper from '../agentsModalWrapper';
import EditarProductForm from './EditProductModal';
import { Toast } from "flowbite-react";
import { HiCheck, HiX } from "react-icons/hi";

export default function TablaProductosBL({ search }) {
  const { props } = usePage();
  const proyecto = props?.auth?.user?.proyecto || 'AZZU';
  const theme = themeByProject[proyecto];

  const [toast, setToast] = useState({ show: false, success: false, message: '' });
  const [modalOpenProductEdit, setModalOpenProductEdit] = useState(false);
  const [productDetail, setProductDetail] = useState(null);

  // ===== Datos de prueba =====
  const productos = useMemo(() => [
    { id: 1, tipo_producto: "Botón", tamanio: "Pequeño", color_nombre: "Rojo", stock_total: 120, descripcion: "Botón clásico" },
    { id: 2, tipo_producto: "Botón", tamanio: "Mediano", color_nombre: "Azul", stock_total: 80, descripcion: "Botón resistente" },
    { id: 3, tipo_producto: "Hebilla", tamanio: "Grande", color_nombre: "Negro", stock_total: 50, descripcion: "Hebilla metálica" },
    { id: 4, tipo_producto: "Etiqueta", tamanio: "Pequeño", color_nombre: "Blanco", stock_total: 200, descripcion: "Etiqueta textil" },
    { id: 5, tipo_producto: "Botón", tamanio: "Grande", color_nombre: "Verde", stock_total: 30, descripcion: "Botón decorativo" },
  ], []);

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => setToast({ show: false, success: false, message: '' }), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const openModalEditProduct = (id) => {
    const producto = productos.find(p => p.id === id);
    setProductDetail(producto);
    setModalOpenProductEdit(true);
  };

  const closeModal = () => setModalOpenProductEdit(false);

  const handleEditarProducto = (productData) => {
    console.log("➡️ Producto editado:", productData);
    setToast({ show: true, success: true, message: "Producto editado correctamente" });
    closeModal();
  };

  const columns = useMemo(() => [
    { accessorKey: 'tipo_producto', header: 'Tipo de producto' },
    { accessorKey: 'tamanio', header: 'Tamaño' },
    { accessorKey: 'color_nombre', header: 'Colores' },
    { accessorKey: 'stock_total', header: 'Cantidades' },
    { accessorKey: 'descripcion', header: 'Descripción' },
  ], [theme.text]);

  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data: productos,
    columns,
    state: { sorting, globalFilter: search },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: useMemo(() => (row, columnIds, filterValue) => {
      if (!filterValue) return true;
      const searchText = filterValue.toLowerCase();
      return row.getVisibleCells().some(cell =>
        String(cell.getValue() ?? '').toLowerCase().includes(searchText)
      );
    }, []),
  });

  return (
    <>
      <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="px-6 py-3 cursor-pointer select-none"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {{
                    asc: ' 🔼',
                    desc: ' 🔽',
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
                index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'
              } hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors`}
            >
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de edición */}
      {modalOpenProductEdit && (
        <AgentModalWrapper closeModal={closeModal}>
          <EditarProductForm
            producto={productDetail}
            onClose={closeModal}
            onSave={handleEditarProducto}
          />
        </AgentModalWrapper>
      )}

      {/* Toast */}
      {toast.show && (
        <div className="fixed bottom-6 right-6 z-50">
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
    </>
  );
}
