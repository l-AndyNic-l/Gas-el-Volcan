import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import UsuarioService from '../api/UsuarioService';
import { iniciarSesion } from '../utils/Auth';

const Registro = () => {

    const navigate = useNavigate()
    const [tipoCliente, setTipoCliente] = useState("particular");
    const [tieneLocal, setTieneLocal] = useState("no");
    const [clave, setClave] = useState("");
    const [confirmarClave, setConfirmarClave] = useState("");
    const [error, setError] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [rut, setRut] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");
    const [correo, setCorreo] = useState("");
    const [tipoCompra, setTipoCompra] = useState("unidad");
    const [frecuenciaCompra, setFrecuenciaCompra] = useState("ocasional");
    const [nombreNegocio, setNombreNegocio] = useState("");
    const [rubroNegocio, setRubroNegocio] = useState("");

    const validarRut = (rut) => {
        return /^\d{7,8}-[\dkK]$/.test(rut);
    };

    const validarTelefono = (telefono) => {
        return /^\d{9}$/.test(telefono);
    };

    const validarCorreo = (correo) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
    };

    const validarClave = (clave) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(clave);
    };


    const registrar = async (e) => {
        e.preventDefault();

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

        if (!validarClave(clave)) {
            setError("La clave debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número");
            return;
        }

        if (clave !== confirmarClave) {
            setError("Las contraseñas no coinciden");
            return;
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
            clave,
            tipo_compra: tipoCompra,
            tipo_cliente: tipoCliente,
            frecuencia_compra: frecuenciaCompra,
            local_comercial: tieneLocal,
            nombre_negocio: nombreNegocio,
            rubro_negocio: rubroNegocio,
            tipo_usuario: "Cliente"
        };

        try {
            const resultado = await UsuarioService.createUsuario(usuario);

            if (resultado.data.correo === correo.trim()) {
                setError("");
                await iniciarSesion(correo, clave);
                navigate("/");
            } else {
                setError("Error en el registro.");
            }

        } catch (error) {
            console.error("Error del servidor:", error.response?.data);

            setError(
                error.response?.data ||
                "Problemas en el registro, intente más tarde."
            );
        }
    };


    return (
        <section className="registro">
            <div className="contenedor-registro">
                <Form onSubmit={registrar}>
                    <fieldset>
                        <legend>Crear Cuenta</legend>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor='nombre'>Nombre:</Form.Label>
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
                            <Form.Label htmlFor='apellido'>Apellido:</Form.Label>
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
                            <Form.Label htmlFor='rut'>RUT (Sin puntos):</Form.Label>
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
                            <Form.Label htmlFor='telefono'>
                                Número de Teléfono +56:
                            </Form.Label>
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
                            <Form.Label htmlFor='direccion'>Dirección:</Form.Label>
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
                            <Form.Label htmlFor='correo'>Correo:</Form.Label>
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
                            <Form.Label>
                                Tipo de Cliente:
                            </Form.Label>

                            <Form.Select
                                value={tipoCliente}
                                onChange={(e) =>
                                    setTipoCliente(e.target.value)
                                }
                            >
                                <option value="particular">
                                    Particular
                                </option>
                                <option value="empresa">
                                    Empresa / Negocio
                                </option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>
                                ¿Tiene un local comercial?
                            </Form.Label>

                            <Form.Select
                                value={tieneLocal}
                                onChange={(e) =>
                                    setTieneLocal(e.target.value)
                                }
                            >
                                <option value="no">No</option>
                                <option value="si">Sí</option>
                            </Form.Select>
                        </Form.Group>

                        {(tieneLocal === "si" ||
                          tipoCliente === "empresa") && (
                            <>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Nombre del Negocio:
                                    </Form.Label>
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
                                    <Form.Label>
                                        Rubro del Negocio:
                                    </Form.Label>

                                    <Form.Select 
                                        name="rubro"
                                        value={rubroNegocio}
                                        onChange={(e) => setRubroNegocio(e.target.value)}
                                    >
                                        <option value="">
                                            Seleccione un rubro
                                        </option>
                                        <option value="almacen">
                                            Almacén
                                        </option>
                                        <option value="restaurante">
                                            Restaurante
                                        </option>
                                        <option value="panaderia">
                                            Panadería
                                        </option>
                                        <option value="otro">
                                            Otro
                                        </option>
                                    </Form.Select>
                                </Form.Group>
                            </>
                        )}

                        <Form.Group className="mb-3">
                            <Form.Label>
                                Tipo de Compra:
                            </Form.Label>

                            <Form.Select 
                                name="tipoCompra"
                                value={tipoCompra}
                                onChange={(e) => setTipoCompra(e.target.value)}
                            >
                                <option value="unidad">
                                    Compra por unidad
                                </option>
                                <option value="mayor">
                                    Compra por mayor
                                </option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>
                                Frecuencia de Compra:
                            </Form.Label>

                            <Form.Select 
                                name="frecuencia"
                                value={frecuenciaCompra}
                                onChange={(e) => setFrecuenciaCompra(e.target.value)}
                            >
                                <option value="ocasional">
                                    Ocasional
                                </option>
                                <option value="semanal">
                                    Semanal
                                </option>
                                <option value="quincenal">
                                    Quincenal
                                </option>
                                <option value="mensual">
                                    Mensual
                                </option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor='clave'>Clave:</Form.Label>
                            <Form.Control
                                id="clave"
                                type="password"
                                placeholder="Ingrese su clave"
                                value={clave}
                                onChange={(e) =>
                                    setClave(e.target.value)
                                }
                                minLength={8}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>
                                Confirmar Clave:
                            </Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirme su clave"
                                value={confirmarClave}
                                onChange={(e) =>
                                    setConfirmarClave(e.target.value)
                                }
                                required
                            />
                        </Form.Group>

                        {error && (
                            <p className="text-danger">
                                {error}
                            </p>
                        )}

                        <Button type="submit">
                            Registrarse
                        </Button>

                        <div className="volver">
                            <span>
                                ¿Ya tienes una cuenta?{' '}
                                <Link to="/login">
                                    Inicia Sesión
                                </Link>
                            </span>
                        </div>

                    </fieldset>
                </Form>
            </div>
        </section>
    );
};

export default Registro;
