
function FiltroProductos({
    filtros,
    filtroActivo,
    cambiarFiltro
}) {
    return (
        <aside className="filtros-categorias">
            <h2>Categorías</h2>

            <ul>
                {filtros.map((filtro) => (
                    <li key={filtro.id}>
                        <button
                            type="button"
                            className={
                                filtroActivo === filtro.id
                                    ? "activo_filtro"
                                    : ""
                            }
                            onClick={() => cambiarFiltro(filtro.id)}
                        >
                            {filtro.nombre}
                        </button>
                    </li>
                ))}
            </ul>
        </aside>
    );
}

export default FiltroProductos;
