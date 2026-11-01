# Demo de agenda Shili’s

Esta ruta es una prueba estática pública, sin autenticación. No usar para datos reales. Los registros se guardan exclusivamente en localStorage del navegador, no en el repositorio ni en un servidor. No hay recepción de WhatsApp ni sincronización entre dispositivos.

## Prueba
0. Escribir la cuenta de Google en el formulario: se guarda solo en el navegador, no en el repositorio.
1. Preparar la solicitud A: reserva su horario en la demo y abre un borrador de Google Calendar.
2. Revisar la cuenta y el calendario destino. Solo pulsar Guardar si se desea crear un evento real de prueba.
3. Regresar y marcar explícitamente que se guardó. La demo no puede verificarlo.
4. Preparar B: detecta el cruce del mismo profesional. Ajustar la hora o el profesional antes de continuar.
5. Registrar otra solicitud con un teléfono propio si se quiere preparar una respuesta. WhatsApp no envía nada automáticamente.

Restablecer ejemplos o descartar solicitudes no elimina eventos de Google. Borrarlos manualmente en Calendar si se guardaron. Reabrir el borrador y volver a guardarlo puede duplicar el evento.

## Antes de producción
Requiere acceso autenticado para personal, base de datos compartida, autorización OAuth de Google, lectura real de ocupación y escritura de eventos, control transaccional de cruces y reglas de duración validadas. Para mensajes automáticos, integración autorizada con WhatsApp Business Platform. Nunca guardar secretos en archivos estáticos.
