# Reservas de hora con cuenta de Google

Proyecto: https://script.google.com/home/projects/1plnpqFpjYxou9NJnwvRR89QzAx00iCy6-2M4VmtNHUSHHsClZER59jkm/edit

Aplicación: https://script.google.com/macros/s/AKfycbz9NP96A_vFbo5lTbaxwCPl4ZKOY8B8UUwwIAmYrjvtbLCTZ_vM2awcmFI36Mxt49_E7g/exec

## Comportamiento

El sitio transmite nombre, servicio, preferencias y detalles al selector mediante el fragmento de URL (no en parámetros enviados al servidor). El nombre y servicio se reutilizan sin volver a escribirlos. La pantalla de Google solo muestra día y horas libres. Usa google.script.run para consultar disponibilidad y registrar; no emplea solicitudes de credenciales entre orígenes.

El usuario eligió exigir una cuenta de Google. La implementación se ejecuta como el propietario, con acceso Cualquier persona que tenga una Cuenta de Google. No permite visitantes anónimos. Google controla el inicio de sesión; la aplicación no pide correo, teléfono ni apellidos separados, ni intenta leer el correo de la cuenta del visitante.

Solo el permiso calendar.app.created: permite crear un calendario secundario y administrar eventos en los calendarios creados por esta integración. No permite leer el calendario personal principal, Gmail, contactos ni Drive. La agenda privada se llama Shili’s · Reservas web. El ID solo está en las propiedades del proyecto de Google.

Cada cita tiene el nombre del cliente como título y el servicio como descripción. No se guardan datos de contacto, no se agregan invitados y no se envían correos. El detalle opcional del primer paso queda para el mensaje de WhatsApp; no se copia al evento.

El horario solo se confirma después de que Google registra el evento. Una exclusión mutua y una segunda comprobación de disponibilidad dentro del bloqueo evitan que dos reservas de esta aplicación ocupen la misma hora. El ID por intento evita duplicar eventos al reintentar una respuesta perdida. No se devuelven nombres o detalles de otros eventos.

Desde el sitio publicado se recibe la confirmación mediante postMessage, validando origen de Google, un valor aleatorio por ventana y nombre/servicio esperados. Se mantienen inmutables los datos confirmados al preparar el WhatsApp. Si Google no carga en el iframe, el enlace abre el mismo selector en otra pestaña, donde se puede reservar y preparar el aviso por WhatsApp.

## Configuración de prueba

Una sola agenda. Citas de 60 minutos, lunes a viernes, 09:00–17:00 Colombia, hasta 30 días de anticipación. No hay agendas separadas por profesional. La agenda dedicada no bloquea citas del calendario personal o de la página nativa anterior; antes de usarla para atención real deben revisarse los turnos existentes.

El propietario puede agregar eventos manuales a la agenda dedicada y serán respetados al consultar disponibilidad. La exclusión mutua protege las solicitudes de esta aplicación; Google permite al propietario crear superposiciones manuales. Las cuentas de Google no eliminan el riesgo de reservas no deseadas.

## Mantenimiento

Code.gs contiene el registro, disponibilidad y entrada HTML. Picker.html contiene la pantalla mínima y las llamadas a Google. appsscript.json habilita Calendar v3 con el único alcance declarado. setup es idempotente: solo crea una agenda si aún no está configurada.

Para actualizar, guardar ambos archivos en el proyecto y crear una nueva versión en Administrar implementaciones, conservando el acceso restringido a cuentas de Google. Mantener la URL /exec en assets/js/agenda-config.js. No volver a cambiar el acceso a Cualquiera sin autorización explícita.

Referencia: https://developers.google.com/apps-script/guides/html/reference/url | https://developers.google.com/workspace/calendar/api/auth | https://developers.google.com/apps-script/guides/web
