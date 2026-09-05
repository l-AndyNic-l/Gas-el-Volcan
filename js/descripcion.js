/*----------------------------------------------------------------------------------------------------------*/
/*DATOS PRODUCTOS*/
const productosDB = {
    gasco: {
        nombre: "Gasco",
        imagen: "./img/gas-11gasco.webp",
        "5kg": {
            precio: "$11.000",
            sku: "SKU: GAS-5KG",
            descripcion: "Duración de 34hrs en uso de cocina (Fuego alto)"
        },
        "11kg": {
            precio: "$21.000",
            sku: "SKU: GAS-11KG",
            descripcion: "Duración de 75hrs en uso de cocina (Fuego alto)"
        },
        "15kg": {
            precio: "$23.000",
            sku: "SKU: GAS-15KG",
            descripcion: "Duración de 102hrs en uso de cocina (Fuego alto)"
        }
    },
    lipigas: {
        nombre: "Lipigas",
        imagen: "./img/lipigas15.png",
        "5kg": {
            precio: "$11.000",
            sku: "SKU: LIP-5KG",
            descripcion: "Duración de 34hrs en uso de cocina (Fuego alto)"
        },
        "11kg": {
            precio: "$21.000",
            sku: "SKU: LIP-11KG",
            descripcion: "Duración de 75hrs en uso de cocina (Fuego alto)"
        },
        "15kg": {
            precio: "$23.000",
            sku: "SKU: LIP-15KG",
            descripcion: "Duración de 102hrs en uso de cocina (Fuego alto)"
        }
    },
    abastible: {
        nombre: "Abastible",
        imagen: "./img/abastible11.webp",
        "5kg": {
            precio: "$11.000",
            sku: "SKU: ABA-5KG",
            descripcion: "Duración de 34hrs en uso de cocina (Fuego alto)"
        },
        "11kg": {
            precio: "$21.000",
            sku: "SKU: ABA-11KG",
            descripcion: "Duración de 75hrs en uso de cocina (Fuego alto)"
        },
        "15kg": {
            precio: "$23.000",
            sku: "SKU: ABA-15KG",
            descripcion: "Duración de 102hrs en uso de cocina (Fuego alto)"
        }
    }
};
/*----------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------*/
/*CAPTURAR VALORES DEL QUERY*/
let marcaSeleccionada = "";
let pesoSeleccionado = "";

try {

    const urlParams = new URLSearchParams(window.location.search);
    const m = urlParams.get('marca');
    const p = urlParams.get('peso');

    marcaSeleccionada = m;
    pesoSeleccionado = p;

} catch (e) {

    console.log("Cargando valores por defecto");

};
/*----------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------*/
/*ACTUALIZAR DETALLE PRODUCTO*/
function actualizarInterfaz() {

    const datosMarca = productosDB[marcaSeleccionada];
    const datosProducto = datosMarca[pesoSeleccionado];

    const txtMarca = document.getElementById('txt-marca');
    const txtTitulo = document.getElementById('txt-titulo');
    const txtBreadcrumb = document.getElementById('breadcrumb-producto');
    const txtPrecio = document.getElementById('txt-precio');
    const txtSku = document.getElementById('txt-sku');
    const txtDescripcion = document.getElementById('txt-descripcion');
    const imgPrincipal = document.getElementById('img-principal');
    const imgThumb1 = document.getElementById('img-thumb-1');
    const imgThumb2 = document.getElementById('img-thumb-2');

    txtMarca.innerText = datosMarca.nombre.toUpperCase();
    txtTitulo.innerText = `Cilindro de Gas ${pesoSeleccionado}`;
    txtBreadcrumb.innerText = `${datosMarca.nombre} - ${pesoSeleccionado}`;
    txtPrecio.innerText = datosProducto.precio;
    txtSku.innerText = datosProducto.sku;
    txtDescripcion.innerText = datosProducto.descripcion;

    imgPrincipal.src = datosMarca.imagen;
    imgThumb1.src = datosMarca.imagen;
    imgThumb2.src = datosMarca.imagen;


    const botonesMarca = document.querySelectorAll('.btn-marca');
    botonesMarca.forEach(btn => {

        const textoBtn = btn.innerText.toLowerCase();
        btn.classList.remove('activa-gasco', 'activa-lipigas', 'activa-abastible');

        if (textoBtn === marcaSeleccionada) {
            btn.classList.add(`activa-${marcaSeleccionada}`);
        };

    });

    const botonesFormato = document.querySelectorAll('.btn-variante');
    botonesFormato.forEach(btn => {

        const textoBtn = btn.innerText.toLowerCase();
        btn.classList.toggle('activa', textoBtn === pesoSeleccionado);
    });

};
/*----------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------*/
/*CAMBIAR MARCA*/
function cambiarMarca(nuevaMarca) {
    marcaSeleccionada = nuevaMarca.toLowerCase();
    actualizarInterfaz();
};
/*----------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------*/
/*CAMBIAR PESO*/
function cambiarFormato(nuevoPeso) {
    pesoSeleccionado = nuevoPeso;
    actualizarInterfaz();
};
/*----------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------*/
/*SUMAR O RESTAR CANTIDAD*/
function modificarCantidad(cantidad) {
    const input = document.getElementById('input-cantidad');

    let valor = parseInt(input.value);
    valor += cantidad;

    if (valor < 1) {
        valor = 1;
    };
        
    input.value = valor;
};
/*----------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------*/
/*AGREGAR AL CARRITO*/
function agregarAlCarrito() {
    
    const cantidad = document.getElementById('input-cantidad');
    const producto = {
        marca: productosDB[marcaSeleccionada].nombre,
        peso: pesoSeleccionado,
        precio: productosDB[marcaSeleccionada][pesoSeleccionado].precio,
        cantidad: cantidad.value
    };

    alert(`¡Añadido al carrito! (${producto.cantidad}x ${producto.marca} ${producto.peso})`);

};
/*----------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------*/
/*CARGAR INFORMACION AL INICIO*/
document.addEventListener('DOMContentLoaded', () => {
    actualizarInterfaz();
});
/*----------------------------------------------------------------------------------------------------------*/