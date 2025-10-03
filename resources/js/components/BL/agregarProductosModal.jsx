import { useState } from 'react';
import { TextInput, Select, Button, Label } from 'flowbite-react';
import { HiCheck } from 'react-icons/hi';
import TextScanner from './TextScanner';

export default function AgregarProductoModal({ onClose, onSave }) {
  const [showScanner, setShowScanner] = useState(false);

  // Colores estáticos
  const colores = [
    { id: 1, nombre: 'Rojo', codigo: 'R01' },
    { id: 2, nombre: 'Azul', codigo: 'B02' },
    { id: 3, nombre: 'Verde', codigo: 'G03' },
  ];

  const [formData, setFormData] = useState({
    tipo_producto: 'BT',
    codigo_unico: '',
    tamanio: '',
    color_id: '',
    cantidad_por_empaque: '',
    codigo_barras: '',
    descripcion: '',
  });

  const handleScan = (data) => {
    setFormData({
      ...formData,
      tipo_producto: data.tipo_producto || formData.tipo_producto,
      codigo_unico: data.codigo_unico || formData.codigo_unico,
      tamanio: data.tamanio || formData.tamanio,
      color_id: data.color_id || formData.color_id,
      cantidad_por_empaque: data.cantidad_por_empaque || formData.cantidad_por_empaque,
      codigo_barras: data.codigo_barras || formData.codigo_barras,
    });
    setShowScanner(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="space-y-6 max-w-xl relative">
      <h2 className="text-lg font-semibold">Agregar Nuevo Producto</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="tipo_producto" value="Tipo de Producto" />
            <Select
              id="tipo_producto"
              required
              value={formData.tipo_producto}
              onChange={(e) => setFormData({ ...formData, tipo_producto: e.target.value })}
            >
              <option value="BT">Botón (BT)</option>
              <option value="OJ">Ojillo (OJ)</option>
              <option value="BR">Broche (BR)</option>
            </Select>
          </div>

          <div>
            <Label htmlFor="codigo_unico" value="Código Interno" />
            <TextInput
              id="codigo_unico"
              required
              placeholder="Código interno"
              value={formData.codigo_unico}
              onChange={(e) => setFormData({ ...formData, codigo_unico: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="tamanio" value="Tamaño (MM)" />
            <TextInput
              id="tamanio"
              required
              placeholder="Ej: 20MM"
              value={formData.tamanio}
              onChange={(e) => setFormData({ ...formData, tamanio: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="color_id" value="Color" />
            <Select
              id="color_id"
              required
              value={formData.color_id}
              onChange={(e) => setFormData({ ...formData, color_id: e.target.value })}
            >
              <option value="">Seleccione...</option>
              {colores.map((color) => (
                <option key={color.id} value={color.id}>
                  {color.nombre} ({color.codigo})
                </option>
              ))}
            </Select>
          </div>

          <div>
            <Label htmlFor="cantidad_por_empaque" value="Unidades por Empaque" />
            <TextInput
              id="cantidad_por_empaque"
              type="number"
              required
              value={formData.cantidad_por_empaque}
              onChange={(e) => setFormData({ ...formData, cantidad_por_empaque: e.target.value })}
            />
          </div>
        </div>

        {/* Botones */}
        <div className="flex justify-between pt-4 border-t mt-6">
          <Button color="gray" type="button" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            <HiCheck className="mr-2" />
            Guardar Producto
          </Button>
        </div>
      </form>

      {/* Escáner QR */}
      {showScanner && (
        <TextScanner
          onScan={handleScan}
          onClose={() => setShowScanner(false)}
        />
      )}
    </div>
  );
}
