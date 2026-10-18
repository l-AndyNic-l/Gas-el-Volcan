import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function Formulario() {

    return(
        <>
            <Form>
                <Form.Group className='mb-4' controlId='formNombre'>
                    <Form.Label>Nombre: </Form.Label>
                    <Form.Control type='text' placeholder='Ingrese su nombre' />
                </Form.Group>

                <Form.Group className='mb-4' controlId='formCorreo'>
                    <Form.Label>Correo: </Form.Label>
                    <Form.Control type='email' placeholder='Ingrese su correo' />
                </Form.Group>
        
                <Form.Group className='mb-4' controlId='formMensaje'>
                    <Form.Label>Mensaje: </Form.Label>
                    <Form.Control as='textarea' rows={4} placeholder='Escriba el mensaje' />
                </Form.Group>

                <Button variant='success' type='submit' className='mb-4'>
                    Enviar Mensaje
                </Button>
            </Form>
        </>
    )
}

export default Formulario