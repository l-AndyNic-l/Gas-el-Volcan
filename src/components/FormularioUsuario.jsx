import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import UsuarioService from '../api/UsuarioService';

function FormularioUsuario({ usuarioEditar, cargarUsuarios, onCancelar }) {
    const [error, setError] = useState('');

    const [tipoCliente, setTipoCliente] = useState('particular');
    const [tieneLocal, setTieneLocal] = useState('no');
    const [clave, setClave] = useState('');
    const [confirmarClave, setConfirmarClave] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [rut, setRut] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [correo, setCorreo] = useState('');
    const [tipoCompra, setTipoCompra] = useState('unidad');
    const [frecuenciaCompra, setFrecuenciaCompra] = useState('ocasional');
    const [nombreNegocio, setNombreNegocio] = useState('');
    const [rubroNegocio, setRubroNegocio] = useState('');
    const [rol, setRol] = useState('cliente');

    const limpiarFormulario = () => {
        setTipoCliente('particular');
        setTieneLocal('no');
        setClave('');
        setConfirmarClave('');
        setNombre('');
        setApellido('');
        setRut('');
        setTelefono('');
        setDireccion('');
        setCorreo('');
        setTipoCompra('unidad');
        setFrecuenciaCompra('ocasional');
        setNombreNegocio('');
        setRubroNegocio('');
        setRol('cliente');
        setError('');
    };

    useEffect(() => {
        if (usuarioEditar) {
            setNombre(usuarioEditar.nombre || '');
            setApellido(usuarioEditar.apellido || '');
            setRut(
                usuarioEditar.rut && usuarioEditar.dv_rut
                    ? `${usuarioEditar.rut}-${usuarioEditar.dv_rut}`
                    : ''
            );
            setTelefono(usuarioEditar.telefono || '');
            setDireccion(usuarioEditar.direccion || '');
            setCorreo(usuarioEditar.correo || '');
            setTipoCliente(usuarioEditar.tipo_cliente || 'particular');
            setTieneLocal(usuarioEditar.local_comercial || 'no');
            setTipoCompra(usuarioEditar.tipo_compra || 'unidad');
            setFrecuenciaCompra(usuarioEditar.frecuencia_compra || 'ocasional');
            setNombreNegocio(usuarioEditar.nombre_negocio || '');
            setRubroNegocio(usuarioEditar.rubro_negocio || '');
            setRol((usuarioEditar.tipo_usuario || 'Cliente').toLowerCase());
            setClave('');
            setConfirmarClave('');
            setError('');
        } else {
            limpiarFormulario();
        }
    }, [usuarioEditar]);

    const validarRut = (valor) => /^\d{7,8}-[\dkK]$/.test(valor);
    const validarTelefono = (valor) => /^\d{9}$/.test(valor);
    const validarCorreo = (valor) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
    const validarClave = (valor) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(valor);

    const registrar = async (e) => {
        e.preventDefault();
        setError('');

        if (nombre.trim().length < 3) {
            setError("El nombre debe tener al menos 3 caracteres");
            return;
        }

        if (apellido.trim().length < 3) {
            setError("El apellido debe tener al menos 3 caracteres");
            return;
        }

        if (!validarRut(rut.trim())) {
            setError("El RUT debe tener el formato 12345678-9");
            return;
        }

        if (!validarTelefono(telefono)) {
            setError("El teléfono debe contener exactamente 9 dígitos");
            return;
        }

        if (!direccion.trim()) {
            setError("La dirección es obligatoria");
            return;
        }

        if (!validarCorreo(correo)) {
            setError("Ingrese un correo válido");
            return;
        }

        if (!usuarioEditar) {
            if (!validarClave(clave)) {
                setError("La clave debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número");
                return;
            }

            if (clave !== confirmarClave) {
                setError("Las contraseñas no coinciden");
                return;
            }
        }

        const rutParse = rut.trim().split("-");

        const usuario = {
            rut: rutParse[0],
            dv_rut: rutParse[1].toUpperCase(),
            nombre: nombre.trim(),
            apellido: apellido.trim(),
            telefono,
            direccion: direccion.trim(),
            correo: correo.trim(),
            tipo_compra: tipoCompra,
            tipo_cliente: tipoCliente,
            frecuencia_compra: frecuenciaCompra,
            local_comercial: tieneLocal,
            nombre_negocio: nombreNegocio,
            rubro_negocio: rubroNegocio,
            tipo_usuario: rol === 'admin' ? 'Admin' : 'Cliente'
        };

        if (!usuarioEditar) {
            usuario.clave = clave;
        }

        try {
            if (usuarioEditar) {
                await UsuarioService.updateUsuario(usuarioEditar.id, usuario);
                cargarUsuarios();
                window.alert("¡Usuario Actualizado Exitosamente!");
                limpiarFormulario();       
                onCancelar?.();           
            } else {
                const resultado = await UsuarioService.createUsuario(usuario);
                if (resultado.data.correo === correo.trim()) {
                    cargarUsuarios();
                    window.alert("¡Usuario Creado Exitosamente!");
                    limpiarFormulario();  
                }
            }
        } catch (error) {
            console.error("Error del servidor:", error.response?.data);
            setError(
                error.response?.data ||
                "Problemas en el registro, intente más tarde."
            );
        }
    };

    const handleCancelar = () => {
        limpiarFormulario();
        onCancelar?.();
    };

    return (
        <Form onSubmit={registrar} className="mb-4">
            <h3>{usuarioEditar ? `Editar Usuario (ID: ${usuarioEditar.id})` : 'Registrar Usuario'}</h3>

            <Form.Group className="mb-3">
                <Form.Label htmlFor="nombre">Nombre:</Form.Label>
                <Form.Control
                    id="nombre"
                    type="text"
                    name="nombre"
                    placeholder="Ingrese su nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label htmlFor="apellido">Apellido:</Form.Label>
                <Form.Control
                    id="apellido"
                    type="text"
                    name="apellido"
                    placeholder="Ingrese su apellido"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label htmlFor="rut">RUT (Sin puntos):</Form.Label>
                <Form.Control
                    id="rut"
                    type="text"
                    name="rut"
                    placeholder="Ej: 12345678-9"
                    value={rut}
                    onChange={(e) => setRut(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label htmlFor="telefono">Número de Teléfono +56:</Form.Label>
                <Form.Control
                    id="telefono"
                    type="tel"
                    name="telefono"
                    placeholder="Ej: 912345678"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label htmlFor="direccion">Dirección:</Form.Label>
                <Form.Control
                    id="direccion"
                    type="text"
                    name="direccion"
                    placeholder="Ingrese su dirección"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label htmlFor="correo">Correo:</Form.Label>
                <Form.Control
                    id="correo"
                    type="email"
                    name="correo"
                    placeholder="Ingrese su correo"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Tipo de Cliente:</Form.Label>
                <Form.Select
                    value={tipoCliente}
                    onChange={(e) => setTipoCliente(e.target.value)}
                >
                    <option value="particular">Particular</option>
                    <option value="empresa">Empresa / Negocio</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>¿Tiene un local comercial?</Form.Label>
                <Form.Select
                    value={tieneLocal}
                    onChange={(e) => setTieneLocal(e.target.value)}
                >
                    <option value="no">No</option>
                    <option value="si">Sí</option>
                </Form.Select>
            </Form.Group>

            {(tieneLocal === 'si' || tipoCliente === 'empresa') && (
                <>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre del Negocio:</Form.Label>
                        <Form.Control
                            type="text"
                            name="negocio"
                            placeholder="Nombre de su negocio"
                            value={nombreNegocio}
                            onChange={(e) => setNombreNegocio(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Rubro del Negocio:</Form.Label>
                        <Form.Select
                            name="rubro"
                            value={rubroNegocio}
                            onChange={(e) => setRubroNegocio(e.target.value)}
                        >
                            <option value="">Seleccione un rubro</option>
                            <option value="almacen">Almacén</option>
                            <option value="restaurante">Restaurante</option>
                            <option value="panaderia">Panadería</option>
                            <option value="otro">Otro</option>
                        </Form.Select>
                    </Form.Group>
                </>
            )}

            <Form.Group className="mb-3">
                <Form.Label>Tipo de Compra:</Form.Label>
                <Form.Select
                    name="tipoCompra"
                    value={tipoCompra}
                    onChange={(e) => setTipoCompra(e.target.value)}
                >
                    <option value="unidad">Compra por unidad</option>
                    <option value="mayor">Compra por mayor</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Frecuencia de Compra:</Form.Label>
                <Form.Select
                    name="frecuencia"
                    value={frecuenciaCompra}
                    onChange={(e) => setFrecuenciaCompra(e.target.value)}
                >
                    <option value="ocasional">Ocasional</option>
                    <option value="semanal">Semanal</option>
                    <option value="quincenal">Quincenal</option>
                    <option value="mensual">Mensual</option>
                </Form.Select>
            </Form.Group>

            {!usuarioEditar && (
                <>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="clave">Clave:</Form.Label>
                        <Form.Control
                            id="clave"
                            type="password"
                            placeholder="Ingrese su clave"
                            value={clave}
                            onChange={(e) => setClave(e.target.value)}
                            minLength={8}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Confirmar Clave:</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirme su clave"
                            value={confirmarClave}
                            onChange={(e) => setConfirmarClave(e.target.value)}
                            required
                        />
                    </Form.Group>
                </>
            )}

            <Form.Group className="mb-3">
                <Form.Label>Rol</Form.Label>
                <Form.Select
                    value={rol}
                    onChange={(e) => setRol(e.target.value)}
                >
                    <option value="cliente">Cliente</option>
                    <option value="admin">Admin</option>
                </Form.Select>
            </Form.Group>

            {error && (
                <p className="text-danger">{error}</p>
            )}

            <div className="d-flex gap-2">
                <Button variant="primary" type="submit">
                    {usuarioEditar ? 'Actualizar Usuario' : 'Guardar Usuario'}
                </Button>
                
                {usuarioEditar && (
                    <Button variant="secondary" type="button" onClick={handleCancelar}>
                        Cancelar
                    </Button>
                )}
            </div>
        </Form>
    );
}

export default FormularioUsuario;