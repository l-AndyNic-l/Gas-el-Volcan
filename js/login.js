let login = document.getElementById('inicioSesion');
let correo = document.getElementById('correo');
let contrasena = document.getElementById('contrasena');

login.addEventListener("submit", function(event) {
    event.preventDefault();

    if (!/^[^\s@]+(@gmail\.com)|(@duocuc\.cl)$/.test(correo.value)) {
        alert("¡Correo ingresado no es válido, debe ser del dominio de gmail.com o duocuc.cl!");
        correo.focus();
        return;
    };

    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$%^&*,._#-]).{8,}$/.test(contrasena.value)) {
        alert("¡Contraseña ingresada no es válida, debe tener un largo mínimo de 8 caracteres y entrer ellos una letra, número y carácter especial!")
        contrasena.focus();
        return;
    };

    alert("¡Inicio de sesión exitoso!");
    window.location.href = "index.html";

});