# Reserva desde el formulario principal

Las cinco páginas públicas y /demo-agenda/ usan el mismo diálogo Agenda tu momento y assets/js/booking.js.

1. Datos y preferencias en el formulario original. Solo permanecen en memoria en esa ventana; no se usan cookies, localStorage ni sessionStorage para este flujo.
2. Google Calendar se carga dentro del mismo diálogo. El cliente selecciona un horario disponible y completa la reserva nativa. Solo Google confirma y crea la cita. El formulario del sitio no tiene acceso al contenido o la confirmación del iframe de otro origen.
3. El cliente vuelve al aviso con los datos ya escritos, revisa la fecha y hora exactas confirmadas, marca que Google confirmó y abre el mensaje de WhatsApp. Debe pulsar Enviar para que llegue al salón. El aviso no crea, modifica ni cancela citas.

La opción Solo consultar por WhatsApp mantiene el comportamiento original: abre una solicitud de disponibilidad sin reservar en Google.

Configuración de prueba elegida por el usuario: citas de 60 minutos, lunes a viernes, 09:00 a 17:00 America/Bogota. Una sola agenda de prueba; no sustituye agendas separadas por profesional ni duraciones reales de servicios.

Enlace público obtenido de Compartir en Google: https://calendar.app.google/B7DNqffJtbve3NhH8

No hay claves, dirección privada de la cuenta, API de WhatsApp ni Supabase en este flujo. El simulador anterior sigue en simulador.html y es exclusivamente local.

## Actualización 2.4.1

El primer paso ya no pide hora preferida. Solo la confirmación final del aviso nativo pide la hora confirmada. El selector alternativo sin datos de contacto está preparado y desactivado (endpoint vacío en assets/js/agenda-config.js), pendiente de autorización de Google y prueba real. Código, permisos y activación en integrations/google-calendar/README.md. Hasta entonces, el formulario nativo conserva los campos obligatorios de Google; no es posible ocultarlos desde el sitio.
