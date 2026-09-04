let login = document.getElementById('inicioSesion');
let usuario = document.getElementById('usuario');
let contrasena = document.getElementById('contrasena');

login.addEventListener("submit", function(event){
    event.preventDefault();

    let usuarioRegistrado = localStorage.getItem("usuarioGuardado");
    let correoRegistrado = localStorage.getItem("correoGuardado");
    let contrasenaRegistrada = localStorage.getItem("contrasenaGuardada");

    if (usuario.value !== usuarioRegistrado && correo.value !== correoRegistrado) {
        alert("Su usuario o correo electrónico no existe o está incorrecto.");
        usuario.focus();
        return;
    };

    if (contrasena.value !== contrasenaRegistrada) {
        alert("Su cuenta o contraseña no es correcta.");
        contrasena.focus();
        return;
    };

    alert("¡Inicio de sesión exitoso!");
    usuario.value = "";
    contrasena.value = "";
});