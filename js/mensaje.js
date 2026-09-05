let mensaje = document.getElementById('mensaje');
let correo = document.getElementById('correo');
let texto = document.getElementById('texto');

mensaje.addEventListener("submit", function(event) {
    event.preventDefault();

    if (!/^[^\s@]+(@gmail\.com)|(@duocuc\.cl)$/.test(correo.value)) {
        alert("¡Correo ingresado no es válido, debe ser del dominio de gmail.com o duocuc.cl!");
        correo.focus();
        return;
    };

    if (texto.value.length < 10 ) {
        alert("¡Mensaje ingresado no es válido, debe de tener al menos 10 carácteres!");
        texto.focus();
        return;
    };

    alert("¡Mensaje enviado exitosamente! Gracias por tu mensaje, en breve nos pondremos en contacto contigo.");
    correo.value = "";
    texto.value = "";

});