# Plan de Pruebas Unitarias

**Nombre de los Estudiantes:** Adrián López e Ignacia Vásquez
<br />

**Componente / Módulo Principal:** Registro, Login.
<br />

**Fecha:** 22-10-2026

| ID | Componente<br>*(describe)* | Caso de Prueba<br>*(it / test)* | Preparación<br>*(Arrange: props, mocks)* | Acción<br>*(Act: fireEvent, render)* | Resultado Esperado<br>*(Assert: expect)* | Estado<br>*(Pasa / Falla)* |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| PU-001 | Registro | Debe permitir al usuario escribir su nombre en el campo "Nombre:" | Renderizar el componente `Registro` dentro de `MemoryRouter` y buscar el campo con la etiqueta "Nombre" y simular la escritura | Ingresar el nombre "Esteban" con `fireEvent.change` | El valor del campo debe de quedar como "Esteban" | Pasado ✅ |
| PU-002 | Registro | Debe permitir al usuario escribir su apellido en el campo "Apellido:" | Renderizar el componente `Registro` dentro de `MemoryRouter` y buscar el campo con la etiqueta "Apellido" y simular la escritura | Ingresar el apellido "Gonzales" con `fireEvent.change` | El valor del campo debe de quedar como "Gonzales" | Pasado ✅ |
| PU-003 | Registro | Debe permitir al usuario escribir su rut en el campo "RUT:" | Renderizar el componente `Registro` dentro de `MemoryRouter` y buscar el campo con la etiqueta "RUT" y simular la escritura | Ingresar el RUT "19187874-4" con `fireEvent.change` | El valor del campo debe quedar como "19187874-4" | Pasado ✅ |
| PU-004 | Registro | Debe permitir al usuario escribir su número de teléfono en el campo "Número de Teléfono:" | Renderizar el componente `Registro` dentro de `MemoryRouter` y buscar el campo con la etiqueta "Número de Teléfono" y simular la escritura | Ingresar el teléfono "+56993139457" con `fireEvent.change` | El valor del campo debe quedar como "+56993139457" | Pasado ✅ |
| PU-005 | Registro | Debe permitir al usuario escribir su dirección en el campo "Dirección:" | Renderizar el componente `Registro` dentro de `MemoryRouter` y buscar el campo con la etiqueta "Dirección" y simular la escritura | Ingresar la dirección "Domingo Tocornal 781" con `fireEvent.change` | El valor del campo debe quedar como "Domingo Tocornal 781" | Pasado ✅ |
| PU-006 | Registro | Debe permitir al usuario escribir su correo en el campo "Correo:" | Renderizar el componente `Registro` dentro de `MemoryRouter` y buscar el campo con la etiqueta "Correo" y simular la escritura | Ingresar el correo "est.gonzales@duocuc.cl" con `fireEvent.change` | El valor del campo debe quedar como "est.gonzales@duocuc.cl" | Pasado ✅ |
| PU-007 | Registro | Debe permitir al usuario escribir su clave en el campo "Clave:" | Renderizar el componente `Registro` dentro de `MemoryRouter` y buscar el campo con la etiqueta "Clave" y simular la escritura | Ingresar la clave "Este12345Onzales*" con `fireEvent.change` | El valor del campo debe quedar como "Este12345Onzales*" | Pasado ✅ |
| PU-008 | Login | Debe permitir al usuario escribir su correo en el campo "Correo:" | Renderizar el componente `Login` dentro de `MemoryRouter` y buscar el campo con la etiqueta "Correo" y simular la escritura | Ingresar el correo "cliente@gaselvolcan.cl" con `fireEvent.change` | El valor del campo debe quedar como "cliente@gaselvolcan.cl" | Pasado ✅ |
| PU-009 | Login | Debe permitir al usuario escribir su clave en el campo "Clave:" | Renderizar el componente `Login` dentro de `MemoryRouter` y buscar el campo con la etiqueta "Clave" y simular la escritura | Ingresar la clave "Cliente1234" con `fireEvent.change` | El valor del campo debe quedar como "Cliente1234" | Pasado ✅ |
| PU-010 | Login | Debe permitir al admin iniciar sesión con su cuenta | Limpiar `localStorage`, renderizar `Login` dentro de `MemoryRouter` con rutas `/login` y `/admin`, y buscar los campos "Correo" y "Clave" | Ingresar correo "admin@gaselvolcan.cl", clave "Admin1234" con `fireEvent.change` y hacer clic en el botón "Iniciar Sesión" con `fireEvent.click` | Se debe mostrar el texto "Panel de Administración" en el documento | Pasado ✅ |