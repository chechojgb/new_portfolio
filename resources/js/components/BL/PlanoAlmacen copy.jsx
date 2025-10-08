    const productosPorEstanteria = (codigoEstanteria) => {
        return productos.filter(p => {
            // PRIMERO: Buscar en el nuevo array estanterias_codigos
            if (p.estanterias_codigos && p.estanterias_codigos.length > 0) {
                return p.estanterias_codigos.includes(codigoEstanteria);
            }
            // SEGUNDO: Buscar en ubicaciones_detalladas
            if (p.ubicaciones_detalladas && p.ubicaciones_detalladas.length > 0) {
                return p.ubicaciones_detalladas.some(ubicacion => 
                    ubicacion.estanteria_codigo === codigoEstanteria
                );
            }
            // TERCERO: Fallback - buscar en la cadena de texto
            return p.estanteria.includes(codigoEstanteria);
        }).length;
    };

    // Función para obtener el nombre legible de la estantería
    const getNombreEstanteria = (codigo) => {
        const nombres = {
            'EST-01': 'Estantería 1',
            'EST-02': 'Estantería 2', 
            'EST-03': 'Estantería 3',
            'EST-04': 'Estantería 4',
            'EST-05': 'Estantería 5',
            'EST-06': 'Estantería 6',
            'EST-07': 'Estantería 7',
            'RACK-01': 'Rack 1',
            'RACK-02': 'Rack 2',
            'RACK-03': 'Rack 3',
            'RACK-04': 'Rack 4',
            'RACK-05': 'Rack 5',
            'RACK-06': 'Rack 6',
            'RACK-07': 'Rack 7',
            'RACK-08': 'Rack 8',
            'RACK-09': 'Rack 9',
            'RACK-10': 'Rack 10'
        };
        return nombres[codigo] || codigo;
    };