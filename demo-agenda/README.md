# Reserva automática conectada a Google Calendar

La ruta principal /demo-agenda/ integra la página nativa de reservas de Google Calendar. Ya no guarda la reserva en localStorage ni abre borradores de eventos. El cliente completa el formulario de Google; Google confirma y crea el evento.

Configuración de prueba elegida por el usuario: 60 minutos, lunes a viernes, 09:00 a 17:00 America/Bogota. Una sola agenda de prueba; no sustituye las agendas separadas por profesional ni las duraciones reales de cada servicio.

Enlace público obtenido del diálogo Compartir de Google: https://calendar.app.google/B7DNqffJtbve3NhH8

El simulador anterior se conserva en simulador.html y sigue siendo exclusivamente local. Ninguna credencial ni dirección privada de la cuenta está guardada en los archivos del sitio.

La web principal conserva su proceso existente hasta validar esta prueba. Después de confirmar en Google, el cliente puede completar el aviso para abrir un mensaje en WhatsApp al salón. El cliente debe pulsar Enviar en WhatsApp; no hay envío automático ni acceso a conversaciones. El aviso no altera la cita. No hay proyecto Supabase en este alcance.
