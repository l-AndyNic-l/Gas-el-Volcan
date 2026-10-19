
function TablaProductos({ productos, onEditar, onEliminar }) {

    return (
        <div className="tabla-admin-contenedor">

            <h2>Productos Registrados</h2>

            <table className="tabla-admin">

                <thead>
                    <tr>
                        <th>Imagen</th>
                        <th>SKU</th>
                        <th>Producto</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {productos.map(producto => (
                        <tr key={producto.sku}>

                            <td>
                                <img
                                    src={producto.imagen}
                                    alt={producto.nombre}
                                />
                            </td>

                            <td>{producto.sku}</td>
                            <td>{producto.nombre}</td>
                            <td>{producto.categoria}</td>
                            <td>{producto.precio}</td>

                            <td>
                                <div className="acciones-tabla">

                                    <button
                                        type="button"
                                        className="btn-editar"
                                        onClick={() => onEditar(producto)}
                                    >
                                        Editar
                                    </button>

                                    <button
                                        type="button"
                                        className="btn-eliminar-admin"
                                        onClick={() => onEliminar(producto.sku)}
                                    >
                                        Eliminar
                                    </button>

                                </div>
                            </td>

                        </tr>
                    ))}
                </tbody>

            </table>

        </div>
    );
}

export default TablaProductos;
