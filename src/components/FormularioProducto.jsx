import { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import ProductoService from '../api/ProductoService';

function FormularioProducto({ productoEditar, cargarProductos, onCancelar }) {

    const [error, setError] = useState('');

    const [sku, setSku] = useState('');
    const [nombre, setNombre] = useState('');
    const [categoria, setCategoria] = useState('');
    const [marca, setMarca] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [stock, setStock] = useState('');
    const [despacho, setDespacho] = useState('');
    const [formato, setFormato] = useState('');
    const [informacionAdicional, setInformacionAdicional] = useState('');
    const [img, setImg] = useState('');

    const limpiarFormulario = () => {
        setSku('');
        setNombre('');
        setCategoria('');
        setMarca('');
        setDescripcion('');
        setPrecio('');
        setStock('');
        setDespacho('');
        setFormato('');
        setInformacionAdicional('');
        setImg('')
    };

    useEffect(() => {
        if (productoEditar) {
            setSku(productoEditar.sku || '');
            setNombre(productoEditar.nombre || '');
            setCategoria(productoEditar.categoria || '');
            setMarca(productoEditar.marca || '');
            setDescripcion(productoEditar.descripcion || '');
            setPrecio(
                productoEditar.precio !== undefined && productoEditar.precio !== null
                    ? String(productoEditar.precio)
                    : ''
            );
            setStock(
                productoEditar.stock !== undefined && productoEditar.stock !== null
                    ? String(productoEditar.stock)
                    : ''
            );
            setDespacho(productoEditar.despacho || '');
            setFormato(productoEditar.formato || '');
            setInformacionAdicional(productoEditar.informacion_adicional || '');
            setImg(productoEditar.img || '');
            setError('');

        } else {
            limpiarFormulario();
        }
    }, [productoEditar]);

    const validarSku = (valor) => /^[A-Z0-9-]{4,20}$/.test(valor.trim());

    const validarPrecio = (valor) => {
        const n = Number(valor);

        return !isNaN(n) && n > 0;
    };

    const validarStock = (valor) => {
        const n = Number(valor);

        return Number.isInteger(n) && n >= 0;
    };

    const registrar = async (e) => {
        e.preventDefault();
        setError('');

        if (!validarSku(sku)) {
            setError("El SKU debe tener entre 4 y 20 caracteres (letras mayúsculas, números y guiones). Ej: PROD-001");
            return;
        }

        if (nombre.trim().length < 3) {
            setError("El nombre del producto debe tener al menos 3 caracteres");
            return;
        }

        if (!marca.trim()) {
            setError("La marca es obligatoria");
            return;
        }

        if (descripcion.trim().length < 10) {
            setError("La descripción debe tener al menos 10 caracteres");
            return;
        }

        if (img.trim().length < 15) {
            setError("La imagen es obligatoria");
            return;
        }

        if (!validarPrecio(precio)) {
            setError("El precio debe ser un número mayor a 0");
            return;
        }

        if (!validarStock(stock)) {
            setError("El stock debe ser un número entero mayor o igual a 0");
            return;
        }

        if (!formato.trim()) {
            setError("El formato es obligatorio (ej: 1kg, 500ml, unidad)");
            return;
        }

        const producto = {
            sku: sku.trim().toUpperCase(),
            nombre: nombre.trim(),
            categoria,
            marca: marca.trim(),
            descripcion: descripcion.trim(),
            precio: Number(precio),
            stock: Number(stock),
            despacho,
            formato: formato.trim(),
            informacion_adicional: informacionAdicional.trim(),
            img: img.trim()
        };

        try {
            if (productoEditar) {
                await ProductoService.updateProducto(productoEditar.id, producto);
                cargarProductos();

                window.alert("¡Producto Actualizado Exitosamente!");

                limpiarFormulario();
                onCancelar?.();

            } else {
                await ProductoService.createProducto(producto);
                cargarProductos();

                window.alert("¡Producto Creado Exitosamente!");
                limpiarFormulario();
            }

        } catch (error) {
            console.error("Error del servidor:", error.response?.data);
            setError(
                error.response?.data ||
                "Problemas al guardar el producto, intente más tarde."
            );
        }
    };

    const handleCancelar = () => {
        limpiarFormulario();
        onCancelar?.();
    };

    return (
        <Form onSubmit={registrar} className="mb-4">

            <h2 id='titulo-admin'>
                {productoEditar
                    ? 'Editar Producto'
                    : 'Registrar Producto'}
            </h2>

            <Form.Group className="mb-3">
                <Form.Label>Imagen (Link):</Form.Label>
                <Form.Control
                    type="text"
                    name="sku"
                    placeholder="Ej: https:..."
                    value={img}
                    onChange={(e) => setImg(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>SKU:</Form.Label>
                <Form.Control
                    type="text"
                    name="sku"
                    placeholder="Ej: PROD-001"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Nombre del producto:</Form.Label>
                <Form.Control
                    type="text"
                    name="nombre"
                    placeholder='Ingrese el nombre'
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Categoría:</Form.Label>
                <Form.Select
                    name="categoria"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    required
                >
                    <option value="">Seleccione una categoría</option>
                    <option value="Gas">Gas</option>
                    <option value="Accesorios">Accesorios</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Marca:</Form.Label>
                <Form.Select
                    name="marca"
                    value={marca}
                    onChange={(e) => setMarca(e.target.value)}
                    required
                >
                    <option value="">Seleccione una marca</option>
                    <option value="abastible">Abastible</option>
                    <option value="gasco">Gasco</option>
                    <option value="lipigas">Lipigas</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Precio (CLP):</Form.Label>
                <Form.Control
                    type="number"
                    name="precio"
                    placeholder='Ingrese el precio'
                    min="1"
                    step="1"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Stock:</Form.Label>
                <Form.Control
                    type="number"
                    name="stock"
                    placeholder='Ingrese el stock'
                    min="0"
                    step="1"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Descripción:</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    name="descripcion"
                    placeholder='Ingrese la descripción'
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Formato:</Form.Label>
                <Form.Select
                    name="formato"
                    value={formato}
                    onChange={(e) => setFormato(e.target.value)}
                    required
                >
                    <option value="">Seleccione un formato</option>
                    <option value="sin-formato">Sin formato</option>
                    <option value="5kg">5kg</option>
                    <option value="11kg">11kg</option>
                    <option value="15kg">15kg</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Despacho:</Form.Label>
                <Form.Control
                    type="text"
                    name="despacho"
                    placeholder="Ingrese el tipo de despacho"
                    value={despacho}
                    onChange={(e) => setDespacho(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Información adicional:</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={2}
                    name="informacion_adicional"
                    placeholder="Opcional"
                    value={informacionAdicional}
                    onChange={(e) => setInformacionAdicional(e.target.value)}
                />
            </Form.Group>

            {error && (
                <p className="text-danger">{error}</p>
            )}

            <div className="d-flex gap-2">
                <Button variant="primary" type="submit">
                    {productoEditar ? 'Actualizar Producto' : 'Guardar Producto'}
                </Button>

                {productoEditar && (
                    <Button variant="secondary" type="button" onClick={handleCancelar}>
                        Cancelar
                    </Button>
                )}
            </div>

        </Form>
    );
}

export default FormularioProducto;
