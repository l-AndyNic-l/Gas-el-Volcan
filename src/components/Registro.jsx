import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Registro = () => {

    const navigate = useNavigate()
    const [tipoCliente, setTipoCliente] = useState("particular");
    const [tieneLocal, setTieneLocal] = useState("no");
    const [clave, setClave] = useState("");
    const [confirmarClave, setConfirmarClave] = useState("");
    const [error, setError] = useState("");

    const registrar = (e) => {
        e.preventDefault();

        if (clave !== confirmarClave) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        setError("");

        // Aquí irá la conexión con el backend
        // para registrar al usuario.

        navigate("/");
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
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor='rut'>RUT:</Form.Label>
                            <Form.Control
                                id="rut"
                                type="text"
                                name="rut"
                                placeholder="Ej: 12.345.678-9"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor='telefono'>
                                Número de Teléfono:
                            </Form.Label>
                            <Form.Control
                                id="telefono"
                                type="tel"
                                name="telefono"
                                placeholder="Ej: +56 9 1234 5678"
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
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Rubro del Negocio:
                                    </Form.Label>

                                    <Form.Select name="rubro">
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

                            <Form.Select name="tipoCompra">
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

                            <Form.Select name="frecuencia">
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
