function filtrar(categoria) {
    let idElemento = "filter-" + categoria.toLowerCase();
    
    if (categoria === "Todo") idElemento = "filter-todo";

    const filtroBtn = document.getElementById(idElemento);

    document.querySelectorAll('.filtros-categorias li').forEach(el => {
        el.classList.remove("activo_filtro");
    });

    if (filtroBtn) {
        filtroBtn.classList.add("activo_filtro");
    }

    const productos = document.querySelectorAll('.producto');

    productos.forEach(el => {
        const marcaProducto = (el.getAttribute('data-marca') || '').toLowerCase();
        const pesoProducto = (el.getAttribute('data-peso') || '').toLowerCase();
        const busqueda = categoria.toLowerCase();

        if (categoria === "Todo") {
            el.style.display = 'flex';
        } else if (marcaProducto === busqueda || pesoProducto === busqueda) {
            el.style.display = 'flex';
        } else {
            el.style.display = 'none';
        }
    });
}