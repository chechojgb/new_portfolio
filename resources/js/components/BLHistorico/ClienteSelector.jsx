const ClienteSelector = ({ 
  nuevo, 
  handleChange, 
  sugerencias, 
  seleccionarCliente,
  clientesDisponibles = [] // Agregamos esta prop para tener la lista completa
}) => {
  
  const handleSelectChange = (e) => {
    const selectedId = e.target.value;
    
    if (selectedId === "") {
      // Si se selecciona "Seleccionar cliente", limpiar la selección
      seleccionarCliente(null);
    } else {
      // Buscar el cliente seleccionado
      const clienteSeleccionado = clientesDisponibles.find(c => c.id.toString() === selectedId);
      if (clienteSeleccionado) {
        seleccionarCliente(clienteSeleccionado);
      }
    }
  };

  return (
    <div className="relative">
      <select
        name="clienteId"
        value={nuevo.clienteId || ""}
        onChange={handleSelectChange}
        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">Seleccionar cliente</option>
        {clientesDisponibles.map((cliente) => (
          <option 
            key={cliente.id} 
            value={cliente.id}
            className="text-gray-900 dark:text-white"
          >
            {cliente.nombre} {cliente.nit ? `(${cliente.nit})` : ''}
          </option>
        ))}
      </select>
      
      {/* Mostrar el nombre del cliente seleccionado como información adicional */}
      {nuevo.clienteId && (
        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Cliente seleccionado: <strong>{nuevo.cliente}</strong>
        </div>
      )}
    </div>
  );
};

export default ClienteSelector;