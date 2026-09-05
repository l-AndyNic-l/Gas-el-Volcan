let registro = document.getElementById('registroUsuario');
let nombre = document.getElementById('nombre');
let usuario = document.getElementById('usuario');
let correo = document.getElementById('correo');
let telefono = document.getElementById('telefono');
let fechaNacimiento = document.getElementById('fechaNacimiento');
let contrasena = document.getElementById('contrasena');

registro.addEventListener("submit", function(event){
    event.preventDefault();

    if (!/^[a-zA-Z\s]{3,}$/.test(nombre.value)) {
        alert("¡Nombre completo ingresado no es válido, debe ser de un largo mínimo de 3 carácteres y entre ellos no se admiten carácteres especiales ni números!");
        nombre.focus();
        return;
    };

    if (!/^[a-zA-Z\d@$%^&*,._#-]{4,}$/.test(usuario.value)) {
        alert("¡Usuario ingresado no es válido, debe ser de un largo mínimo de 4 carácteres!");
        usuario.focus();
        return;
    };

    if (!/^[^\s@]+(@gmail\.com)|(@duocuc\.cl)$/.test(correo.value)) {
        alert("¡Correo ingresado no es válido, debe ser del dominio de gmail.com o duocuc.cl!");
        correo.focus();
        return;
    };

    if (!/^\+56[0-9]{9,11}$/.test(telefono.value)) {
        alert("¡Teléfono ingresado no es válido, debe ser formato +56 con 9 a 11 dígitos según localidad!");
        telefono.focus();
        return;
    };

    let fechaFormat = new Date(fechaNacimiento.value);
    let fechaActual = new Date();
    let edad = actual.getFullYear() - fechaNac.getFullYear();

    if (edad < 18) {
        alert("¡Fecha de nacimiento ingresada no válida, debes ser mayor de 18 años!");
        fechaNacimiento.focus();
        return;
    };

    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$%^&*,._#-]).{8,}$/.test(contrasena.value)) {
        alert("¡Contraseña ingresada no es válida, debe tener un largo mínimo de 8 carácteres y entre ellos una letra, número y carácter especial!")
        contrasena.focus();
        return;
    };

    alert("¡Registro exitoso!");
    window.location.href = "index.html";

});