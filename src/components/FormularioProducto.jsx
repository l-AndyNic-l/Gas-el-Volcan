import { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import img from '../assets/img/abastible5.jpg'

const formularioVacio = {
    nombre: '',
    categoria: '',
    precio: '',
    descripcion: ''
};

function FormularioProducto({ productoEditar, onGuardar, onCancelar }) {

    const [datos, setDatos] = useState(formularioVacio);

  useEffect(() => {
    setDatos(
        productoEditar
            ? {
                nombre: productoEditar.nombre,
                categoria: productoEditar.categoria,
                precio: String(productoEditar.precio)
                    .replace(/[^\d]/g, ''),
                descripcion: productoEditar.descripcion
            }
            : {
                nombre: '',
                categoria: '',
                precio: '',
                descripcion: ''
            }
    );
}, [productoEditar]);

    const cambiarCampo = (e) => {
        const { name, value } = e.target;

        setDatos(actuales => ({
            ...actuales,
            [name]: value
        }));
    };

    const enviarFormulario = (e) => {
        e.preventDefault();

        if (
            !datos.nombre.trim() ||
            !datos.categoria.trim() ||
            !datos.descripcion.trim() ||
            !datos.precio.trim()
        ) {
            return;
        }

        onGuardar(datos);

        if (!productoEditar) {
            setDatos(formularioVacio);
        }
    };

    return (
        <Form onSubmit={enviarFormulario} className="formulario-admin">

            <h2 id='titulo-admin'>
                {productoEditar
                    ? 'Editar Producto'
                    : 'Registrar Producto'}
            </h2>

            <Form.Group className="mb-3">
                <Form.Label>Nombre del producto</Form.Label>
                <Form.Control
                    type="text"
                    name="nombre"
                    value={datos.nombre}
                    onChange={cambiarCampo}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Categoría</Form.Label>
                <Form.Control
                    type="text"
                    name="categoria"
                    value={datos.categoria}
                    onChange={cambiarCampo}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Precio (CLP)</Form.Label>
                <Form.Control
                    type="number"
                    name="precio"
                    min="1"
                    step="1"
                    value={datos.precio}
                    onChange={cambiarCampo}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    name="descripcion"
                    value={datos.descripcion}
                    onChange={cambiarCampo}
                    required
                />
            </Form.Group>

            <div className="botones-admin">
                <Button type="submit">
                    {productoEditar
                        ? 'Guardar Cambios'
                        : 'Agregar Producto'}
                </Button>

                {productoEditar && (
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onCancelar}
                    >
                        Cancelar
                    </Button>
                )}
            </div>

        </Form>
    );
}

export default FormularioProducto;
