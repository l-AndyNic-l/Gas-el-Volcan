const productosDB = {
  gasco: {
    nombre: "Gasco",
    imagen: "./img/gas-11gasco.webp",
    "5kg": { precio: "$11.000", sku: "SKU: GAS-5KG" },
    "11kg": { precio: "$18.000", sku: "SKU: GAS-11KG" },
    "15kg": { precio: "$26.000", sku: "SKU: GAS-15KG" }
  },
  lipigas: {
    nombre: "Lipigas",
    imagen: "./img/gas-11.webp",
    "5kg": { precio: "$11.000", sku: "SKU: LIP-5KG" },
    "11kg": { precio: "$19.000", sku: "SKU: LIP-11KG" },
    "15kg": { precio: "$26.000", sku: "SKU: LIP-15KG" }
  },
  abastible: {
    nombre: "Abastible",
    imagen: "./img/Cilindro_15.png",
    "5kg": { precio: "$11.000", sku: "SKU: ABA-5KG" },
    "11kg": { precio: "$21.000", sku: "SKU: ABA-11KG" },
    "15kg": { precio: "$23.000", sku: "SKU: ABA-15KG" }
  }
};

let marcaSeleccionada = 'gasco';
let pesoSeleccionado = '5kg';

try {
  const urlParams = new URLSearchParams(window.location.search);
  const m = urlParams.get('marca');
  const p = urlParams.get('peso');

  if (m && productosDB[m.toLowerCase()]) {
    marcaSeleccionada = m.toLowerCase();
  }
  if (p && ['5kg', '11kg', '15kg'].includes(p.toLowerCase())) {
    pesoSeleccionado = p.toLowerCase();
  }
} catch (e) {
  console.log("Cargando valores por defecto");
}

function actualizarInterfaz() {
  const datosMarca = productosDB[marcaSeleccionada] || productosDB.gasco;
  const datosProducto = datosMarca[pesoSeleccionado] || datosMarca['5kg'];

  const txtMarca = document.getElementById('txt-marca');
  const txtTitulo = document.getElementById('txt-titulo');
  const txtBreadcrumb = document.getElementById('breadcrumb-producto');
  const txtPrecio = document.getElementById('txt-precio');
  const txtSku = document.getElementById('txt-sku');
  const imgPrincipal = document.getElementById('img-principal');
  const imgThumb1 = document.getElementById('img-thumb-1');
  const imgThumb2 = document.getElementById('img-thumb-2');

  if (txtMarca) txtMarca.innerText = datosMarca.nombre.toUpperCase();
  if (txtTitulo) txtTitulo.innerText = `Cilindro de Gas ${pesoSeleccionado}`;
  if (txtBreadcrumb) txtBreadcrumb.innerText = `${datosMarca.nombre} - ${pesoSeleccionado}`;
  if (txtPrecio) txtPrecio.innerText = datosProducto.precio;
  if (txtSku) txtSku.innerText = datosProducto.sku;

  if (imgPrincipal) imgPrincipal.src = datosMarca.imagen;
  if (imgThumb1) imgThumb1.src = datosMarca.imagen;
  if (imgThumb2) imgThumb2.src = datosMarca.imagen;

  const botonesMarca = document.querySelectorAll('.btn-marca');
  botonesMarca.forEach(btn => {
    const textoBtn = btn.innerText.trim().toLowerCase();
    btn.classList.remove('activa', 'activa-gasco', 'activa-lipigas', 'activa-abastible');

    if (textoBtn === marcaSeleccionada) {
      btn.classList.add(`activa-${marcaSeleccionada}`);
    }
  });

  const botonesFormato = document.querySelectorAll('.btn-variante');
  botonesFormato.forEach(btn => {
    const textoBtn = btn.innerText.trim().toLowerCase();
    btn.classList.toggle('activa', textoBtn === pesoSeleccionado);
  });
}

window.cambiarMarca = function(nuevaMarca) {
  marcaSeleccionada = nuevaMarca.toLowerCase();
  actualizarInterfaz();
};

window.cambiarFormato = function(nuevoPeso) {
  pesoSeleccionado = nuevoPeso.toLowerCase();
  actualizarInterfaz();
};

window.modificarCantidad = function(delta) {
  const input = document.getElementById('input-cantidad');
  if (input) {
    let valor = parseInt(input.value) || 1;
    valor += delta;
    if (valor < 1) valor = 1;
    input.value = valor;
  }
};

window.agregarAlCarrito = function() {
  const input = document.getElementById('input-cantidad');
  const cantidad = input ? parseInt(input.value) || 1 : 1;
  const producto = {
    marca: productosDB[marcaSeleccionada].nombre,
    peso: pesoSeleccionado,
    precio: productosDB[marcaSeleccionada][pesoSeleccionado].precio,
    cantidad: cantidad
  };

  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito.push(producto);
  localStorage.setItem('carrito', JSON.stringify(carrito));

  alert(`¡Añadido al carrito! (${cantidad}x ${producto.marca} ${producto.peso})`);
};

document.addEventListener('DOMContentLoaded', () => {
  actualizarInterfaz();

  const btnCarrito = document.querySelector('.btn-anadir-carrito');
  if (btnCarrito) {
    btnCarrito.onclick = window.agregarAlCarrito;
  }
});