const ItemsTable = ({ 
  itemsDisponibles, 
  seleccionados, 
  setSeleccionados, 
  nuevo, 
  precios, 
  setPrecios 
}) => {
  // Asegurarse de que itemsDisponibles sea siempre un array
  const items = Array.isArray(itemsDisponibles) ? itemsDisponibles : [];
  console.log(items);
  

  const toggleSeleccion = (id, checked) => {
    if (checked) {
      setSeleccionados([...seleccionados, id]);
    } else {
      setSeleccionados(seleccionados.filter(itemId => itemId !== id));
    }
  };
  
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 overflow-x-auto">
      <h3 className="font-medium mb-2">Items del Pedido</h3>
      <table className="w-full text-sm border rounded-lg bg-white dark:bg-gray-900/50">
        <thead className="bg-gray-100 dark:bg-gray-900">
          <tr>
            <th className="px-2 py-1 text-center">Referencia</th>
            <th className="px-2 py-1 text-center">Cantidad</th>
            <th className="px-2 py-1 text-center">Nota</th>
            {nuevo.proyecto === "Button LoversMN" && (
              <th className="px-2 py-1 text-center">💲 Precio Unitario</th>
            )}
            <th className="px-2 py-1 text-center">Acción</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const trabajador = item.marcaciones?.at(-1)?.trabajador?.name || "—";
            const esMarcado = item.estado === "completado";
            const esProceso = item.estado === "en_proceso";

            return (
              <tr
                key={item.id}
                className={`border-t ${
                  esMarcado 
                    ? "bg-green-50 dark:bg-gray-900/50"
                    : esProceso
                    ? "bg-yellow-50 dark:bg-gray-900/30"
                    : ""
                }`}
              >
                <td className="px-2 py-1 text-center align-middle">{item.pedido?.codigo}</td>
                <td className="px-2 py-1 text-center align-middle">{item.cantidad_empaques}</td>
                <td className="px-2 py-1 text-center align-middle">{item.nota || "—"}</td>

                {/* Precios solo para Button LoversMN */}
                {nuevo.proyecto === "Button LoversMN" && (
                  <td className="px-2 py-1 text-center align-middle">
                    <input
                      type="number"
                      value={precios[item.id] || ""}
                      onChange={(e) =>
                        setPrecios({
                          ...precios,
                          [item.id]: e.target.value,
                        })
                      }
                      readOnly={esMarcado || esProceso}
                      className={`border rounded p-1 w-20 mx-auto block ${
                        (esMarcado || esProceso) ? "bg-gray-100 dark:bg-gray-700 text-gray-400" : ""
                      }`}
                    />
                  </td>
                )}

                {/* Acción */}
                <td className="px-2 py-1 text-center align-middle">
                  {esMarcado ? (
                    <span className="dark:text-green-100/60 font-semibold text-center block">
                      Marcado por: {trabajador}
                    </span>
                  ) : esProceso ? (
                    <span className="dark:text-yellow-100/70 font-semibold text-center block">
                      En proceso por: {trabajador}
                    </span>
                  ) : (
                    <div className="flex justify-center">
                      <input
                        type="checkbox"
                        checked={seleccionados.includes(item.id)}
                        onChange={(e) => toggleSeleccion(item.id, e.target.checked)}
                        className="mx-auto"
                      />
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ItemsTable;