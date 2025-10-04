import { useState, useEffect } from 'react';
import {
  TextInput,
  Select,
  Button,
  Label,
  Textarea,
} from 'flowbite-react';
import { XMarkIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";

export default function ModalPedidosBL({ onClose, onSave }) {
  // 🔹 Datos de prueba
  const clientes = [
    { id: 1, nombre: "Cliente A" },
    { id: 2, nombre: "Cliente B" },
  ];

  const productos = [
    { id: 1, descripcion: "Botón rojo", stock_total: 100 },
    { id: 2, descripcion: "Botón azul", stock_total: 50 },
  ];

  const [formData, setFormData] = useState({
    cliente_id: "",
    fecha_acordada: "",
    nota: "",
    productos: [{ producto_id: "", cantidad: 1 }],
  });

  const handleProductoChange = (index, field, value) => {
    const nuevos = [...formData.productos];
    nuevos[index][field] = value;
    setFormData({ ...formData, productos: nuevos });
  };

  const agregarProducto = () => {
    setFormData({
      ...formData,
      productos: [...formData.productos, { producto_id: "", cantidad: 1 }],
    });
  };

  const eliminarProducto = (index) => {
    const nuevos = [...formData.productos];
    nuevos.splice(index, 1);
    setFormData({ ...formData, productos: nuevos });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // 👈 ejecuta tu callback con los datos
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl p-6 relative animate-fadeIn border border-gray-200 dark:border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Encabezado */}
        <header className="border-b border-gray-200 dark:border-gray-700 pb-3">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Nuevo Pedido (Prueba)
          </h2>
        </header>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-6">
          {/* Cliente */}
          <div>
            <label className="block text-sm font-medium">Cliente *</label>
            <select
              value={formData.cliente_id}
              onChange={(e) =>
                setFormData({ ...formData, cliente_id: e.target.value })
              }
              required
              className="w-full border px-2 py-1 rounded bg-white dark:bg-gray-800"
            >
              <option value="">Seleccione un cliente</option>
              {clientes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Fecha */}
          <div>
            <label className="block text-sm font-medium">Fecha de entrega *</label>
            <input
              type="date"
              value={formData.fecha_acordada}
              onChange={(e) =>
                setFormData({ ...formData, fecha_acordada: e.target.value })
              }
              required
              className="w-full border px-2 py-1 rounded bg-white dark:bg-gray-800"
            />
          </div>

          {/* Notas */}
          <div>
            <label className="block text-sm font-medium">Notas</label>
            <textarea
              rows={2}
              value={formData.nota}
              onChange={(e) =>
                setFormData({ ...formData, nota: e.target.value })
              }
              className="w-full border px-2 py-1 rounded bg-white dark:bg-gray-800"
            />
          </div>

          {/* Productos */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Productos</h3>
              <button
                type="button"
                onClick={agregarProducto}
                className="px-2 py-1 bg-blue-600 text-white text-sm rounded "
              >
                + Añadir
              </button>
            </div>
            {formData.productos.map((item, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <select
                  value={item.producto_id}
                  onChange={(e) =>
                    handleProductoChange(index, "producto_id", e.target.value)
                  }
                  className="flex-1 border px-2 py-1 rounded bg-white dark:bg-gray-800" 
                  required
                >
                  <option value="">Producto</option>
                  {productos.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.descripcion}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  min="1"
                  value={item.cantidad}
                  onChange={(e) =>
                    handleProductoChange(index, "cantidad", e.target.value)
                  }
                  className="w-20 border px-2 py-1 rounded"
                  required
                />
                {formData.productos.length > 1 && (
                  <button
                    type="button"
                    onClick={() => eliminarProducto(index)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    X
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-3 border-t pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Guardar Pedido
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}



export function ModalAddClientesBL({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    nombre: '',
    contacto: '',
    telefono: '',
    email: '',
    ciudad: '',
    nit: '',
    direccion: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="max-w-2xl w-full  rounded shadow-lg flex flex-col">
      <form
        onSubmit={handleSubmit}
        className="overflow-y-auto max-h-[75vh] p-6 space-y-6"
      >
        <h2 className="text-xl font-bold">Agregar Nuevo Cliente</h2>

        {/* Nombre */}
        <div>
          <Label htmlFor="nombre" value="Nombre del Cliente" />
          <TextInput
            id="nombre"
            name="nombre"
            required
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Nombre del Cliente"
          />
        </div>

        {/* Contacto y Teléfono */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="contacto" value="Nombre del contacto" />
            <TextInput
              id="contacto"
              name="contacto"
              value={formData.contacto}
              onChange={handleChange}
              placeholder="contacto Ej: Juan Pérez"
            />
          </div>
          <div>
            <Label htmlFor="telefono" value="Teléfono" />
            <TextInput
              id="telefono"
              name="telefono"
              type="tel"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="Teléfono Ej: 3001234567"
            />
          </div>
        </div>

        {/* Email y Ciudad */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email" value="Correo Electrónico" />
            <TextInput
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Correo Electrónico"
            />
          </div>
          <div>
            <Label htmlFor="ciudad" value="Ciudad" />
            <Select
              id="ciudad"
              name="ciudad"
              required
              value={formData.ciudad}
              onChange={handleChange}
            >
              <option value="">Seleccione una ciudad</option>
              <option value="Bogotá">Bogotá</option>
              <option value="Medellín">Medellín</option>
              <option value="Cali">Cali</option>
              <option value="Barranquilla">Barranquilla</option>
            </Select>
          </div>
        </div>

        {/* NIT */}
        <div>
          <Label htmlFor="nit" value="NIT" />
          <TextInput
            id="nit"
            name="nit"
            value={formData.nit}
            onChange={handleChange}
            placeholder="NIT Ej: 123456789-0"
          />
        </div>

        {/* Dirección */}
        <div>
          <Label htmlFor="direccion" value="Dirección" />
          <Textarea
            id="direccion"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            rows={2}
            placeholder="Dirección Ej: Calle 123 #45-67, Local 5"
          />
        </div>
      <div className="flex justify-between p-4 border-t pt-6 sticky bottom-0">
        <Button color="gray" type="button" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit" gradientmonochrome="blue" onClick={handleSubmit}>
          Guardar Cliente
        </Button>
      </div>
      </form>

      {/* Botones */}
    </div>
  );
}


export function ModalViewPedidosBL({ onClose, pedido }) {
  function InfoRow({ label, value }) {
    return (
      <div className="flex justify-between items-start gap-4 py-1">
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          {label}
        </span>
        <span className="text-sm text-gray-800 dark:text-gray-100 break-words">
          {value ?? <span className="text-gray-400">—</span>}
        </span>
      </div>
    );
  }

  InfoRow.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.number]),
  };
  console.log(pedido);
  
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm "
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg p-6 relative animate-fadeIn border border-gray-200 dark:border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        {/* Título */}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-3">
          Detalles del Pedido
        </h2>

        {/* Información general */}
        <div className="mt-4 grid gap-3">
          <InfoRow label="ID" value={pedido.id} />
          <InfoRow label="Creado por" value={pedido?.usuario_creador?.name} />
          <InfoRow label="Cliente" value={pedido.cliente?.nombre} />
          <InfoRow label="Contacto" value={pedido.cliente?.contacto} />
          <InfoRow label="Teléfono" value={pedido.cliente?.telefono} />
          <InfoRow label="Fecha de entrega" value={pedido.fecha_pedido} />
          <InfoRow label="Notas del pedido" value={pedido.notas || "Sin notas"} />

          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-700 dark:text-gray-300">Estado:</span>
            <span
              className={`px-3 py-1 text-sm font-medium rounded-full capitalize ${
                pedido.estado === "entregado"
                  ? "bg-green-100 text-green-700 dark:bg-green-700/20 dark:text-green-400"
                  : pedido.estado === "pendiente"
                  ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-700/20 dark:text-yellow-400"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-700/20 dark:text-gray-400"
              }`}
            >
              {pedido.estado}
            </span>
          </div>
        </div>

        {/* Lista de productos */}
        {pedido.items && pedido.items.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
              Productos
            </h3>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {pedido.items.map((item) => (
                <li
                  key={item.id}
                  className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm"
                >
                  <div>
                    <p className="font-medium">
                      {item.empaque?.producto?.descripcion || "Producto sin nombre"}
                    </p>
                    <p className="text-xs text-gray-500">
                      Código: {item.empaque?.codigo_unico}
                    </p>
                    {item?.nota && (
                      <p className="text-xs text-gray-400 italic">{item.nota}</p>
                    )}
                  </div>
                  <span className="text-gray-500 mt-1 sm:mt-0">
                    x{item.cantidad_empaques}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Botón Cerrar inferior */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>

  );
}


