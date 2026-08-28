let registro = document.getElementById('registroUsuario');
let nombre = document.getElementById('nombre');
let usuario = document.getElementById('usuario');
let correo = document.getElementById('correo');
let telefono = document.getElementById('telefono');
let fechaNacimiento = document.getElementById('fechaNacimiento');
let contrasena = document.getElementById('contrasena');

registro.addEventListener("submit", function(event){
    event.preventDefault();

    let usuarioValido =/^[a-zA-Z0-9_.,]{4,15}$/.test(usuario.value)
    let correoValido = /^[^\s@]+@((gmail|outlook)\.(com|cl)|duocuc\.cl)$/.test(usuario.value)

    if(!usuarioValido && !correoValido){
        alert("Usuario o correo electrónico inválido");
        usuario.focus();
        return;
    }

    let contrasenaValida = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(contrasena.value);
    if(!contrasenaValida){
        alert("Contraseña invalida!");
        contrasena.focus();
        return;
    }
    
   if (!/^\+569[0-9]{8}$/.test(telefono.value)) {
        alert("El telefono debe tener formato +569xxxxxxxx");
        telefono.focus();
        return
    }

       if(!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre.value)){
        alert("El nombre debe contener solo letras");
        nombre.focus();
        return
    }

    let fechaNac = new Date(document.getElementById("fechaNacimiento").value);
    let actual = new Date();
    let edad = actual.getFullYear() - fechaNac.getFullYear();

    if (edad < 18) {
        alert("Debes ser mayor de edad para registrarte");
        fechaNacimiento.focus();
        return;
    };

    localStorage.setItem("usuarioGuardado", usuario.value);
    localStorage.setItem("correoGuardado", correo.value);
    localStorage.setItem("contrasenaGuardada", contrasena.value);

    alert("Registro exitoso!");
    nombre.value = "";
    usuario.value = "";
    correo.value = "";
    telefono.value = "";
    fechaNacimiento.value = "";
    contrasena.value = "";

});