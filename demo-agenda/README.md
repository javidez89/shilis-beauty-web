# Agenda tu momento: Google Calendar y WhatsApp

Las cinco páginas públicas y /demo-agenda/ usan el mismo diálogo y assets/js/booking.js.

1. Nombre, servicio, fecha preferida opcional y detalle opcional. No se pide hora preferida. Los datos permanecen en memoria mientras se completan los pasos.
2. Selector propio alojado en Google, con el nombre del cliente como encabezado. Solo se selecciona día y hora. El usuario eligió exigir una cuenta de Google; si hace falta, Google pide iniciar sesión. El selector no solicita correo ni teléfono.
3. El servidor comprueba disponibilidad, crea el evento privado con el nombre del cliente como título y devuelve la confirmación real. Solo entonces se prepara el WhatsApp con la hora exacta. El cliente pulsa Enviar en WhatsApp.

La consulta directa por WhatsApp sigue disponible y no crea eventos.

Agenda privada dedicada: Shili’s · Reservas web. Una sola agenda de prueba, 60 minutos, lunes a viernes 09:00–17:00 America/Bogota, hasta 30 días de anticipación. No bloquea las agendas personales ni la anterior página nativa de Google; revisar turnos existentes antes de pasar a uso real. No incluye agendas por profesional.

Si el iframe no carga, el enlace Abrir selector en Google permite completar la reserva y abrir el mensaje en otra pestaña. Sin una respuesta real de Google no se muestra una reserva confirmada.

No hay secretos, ID privado de calendario, API de WhatsApp ni Supabase en el sitio público. Código y configuración: integrations/google-calendar/README.md. La página nativa anterior queda como código de reserva y el simulador anterior sigue en simulador.html, exclusivamente local.
