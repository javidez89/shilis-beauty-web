# Integración preparada: reservas sin datos de contacto

Estado: código preparado y probado con dobles de Google. Copiado como borrador al proyecto de Apps Script; NO está autorizado, implementado ni activado. La web publicada sigue usando la reserva nativa de Google hasta completar la conexión.

## Resultado previsto

- El cliente escribe su nombre y servicio una sola vez en Agenda tu momento.
- El segundo paso muestra su nombre y solo pide día y hora disponibles.
- La cita se crea con el nombre del cliente como título. No se piden correo, teléfono ni apellidos separados; no se crean invitados ni se envían correos.
- La respuesta confirma la escritura real antes de habilitar el WhatsApp con la hora exacta. No se guarda una reserva local como si fuera real.
- Horarios de prueba: lunes a viernes, 09:00–17:00 Colombia, bloques de 60 minutos, hasta 30 días de anticipación. Una agenda de prueba; no hay agendas por profesional.

## Acceso solicitado a Google

Solo calendar.app.created: crear un calendario secundario y administrar los eventos de los calendarios creados por esta integración. No permite leer el calendario personal principal, Gmail, contactos ni Drive. El calendario será privado, llamado Shili’s · Reservas web, en la cuenta de Google elegida por el usuario.

La aplicación web se implementaría para ejecutarse como el propietario y aceptar reservas de visitantes sin inicio de sesión. Su interfaz pública solo devuelve horas libres y acepta reservas acotadas a esa agenda; no devuelve nombres de otras reservas, IDs de calendarios ni credenciales. Al ser pública puede recibir reservas no deseadas; tiene validación de datos, tokens temporales, límite de fechas, campo trampa, serialización de escrituras y reintentos sin duplicar eventos. No sustituye una protección antiautomatización para un despliegue de alto tráfico.

## Activación pendiente

1. Crear un proyecto independiente de Google Apps Script en la cuenta elegida. Copiar Code.gs y el manifiesto appsscript.json; habilitar el servicio avanzado de Google Calendar v3 indicado en el manifiesto.
2. Ejecutar setup desde el editor y conceder el alcance indicado cuando Google muestre la autorización. Este paso crea una sola agenda privada y guarda su identificador dentro del proyecto, no en el sitio público.
3. Implementar como aplicación web: ejecutar como propietario, acceso para cualquier visitante. Antes de completar este paso se necesita aprobación del propietario para habilitar la creación pública de reservas en la agenda dedicada.
4. Configurar la URL /exec en assets/js/agenda-config.js; probar CORS, registro real, bloqueo del horario y reintento idempotente desde el sitio. No activar la nueva interfaz hasta verificar esos puntos en Google.
5. Publicar el selector conectado y retirar la reserva nativa. La nueva agenda separada no bloquea eventos del calendario personal o de la agenda nativa anterior; revisar/migrar turnos existentes antes de usarla para atención real.

Solo setup crea calendarios. Las solicitudes públicas no pueden cambiar la agenda de destino ni invocar funciones de administración. No hay operaciones públicas para borrar o editar eventos.

La exclusión mutua cubre solicitudes simultáneas de esta aplicación. Google Calendar permite al propietario crear eventos manuales superpuestos; el propietario debe mantener ordenada la agenda dedicada.

Referencias: https://support.google.com/calendar/answer/10729749 | https://developers.google.com/workspace/calendar/api/auth | https://developers.google.com/apps-script/guides/web

Borrador preparado en Google: https://script.google.com/home/projects/1plnpqFpjYxou9NJnwvRR89QzAx00iCy6-2M4VmtNHUSHHsClZER59jkm/edit
