# v2.4.1 / 2026-11-01

- Se elimina Hora preferida del primer paso; se elige la hora únicamente al reservar.
- La consulta directa por WhatsApp ya no exige hora. El aviso confirmado conserva la hora real.
- Selector sin datos de contacto e integración dedicada con Google preparados, desactivados hasta autorizar y verificar su conexión.
- El modo preparado crea eventos privados con el nombre del cliente, bloquea turnos ocupados y evita duplicados en reintentos.
- El formulario nativo de Google sigue siendo la conexión activa mientras se autoriza el reemplazo.

# v2.4.0 / 2026-11-01

- El formulario Agenda tu momento sigue siendo la entrada principal en las cinco páginas y la demo.
- El mismo diálogo guía los datos, la reserva nativa en Google y el aviso por WhatsApp.
- Se reutilizan nombre, servicio, preferencias y detalles sin volver a escribirlos.
- Antes del aviso se exige revisar fecha y hora confirmadas y marcar la confirmación de Google.
- Se mantiene la consulta directa por WhatsApp como alternativa sin crear eventos.
- Una sola agenda de prueba, con horarios y duraciones de prueba visibles.

# v2.3.1 / 2026-11-01

- Se mantiene la reserva automática en Google Calendar.
- Se añade un segundo paso para preparar el aviso por WhatsApp al salón.
- Se requiere confirmación explícita del cliente de que Google confirmó su cita.
- El mensaje se envía solo cuando el cliente pulsa Enviar en WhatsApp.

# v2.3.0 / 2026-11-01

- La demo integra una página real de reservas de Google Calendar.
- Configuración de prueba aprobada: citas de 60 minutos, lunes a viernes 9:00-17:00 Colombia.
- Registro automático y disponibilidad administrados por Google.
- Simulador local anterior conservado por separado; no se modifican las reservas de la web principal.

# v2.2.0 / 2026-11-01

- Demo independiente de agenda en /demo-agenda/.
- Solicitudes locales, control de cruces por profesional y borrador de Google Calendar.
- Cuenta de apertura configurada por el usuario; sin autorización API ni sincronización real.
- No cambia el proceso actual de reservas ni publica solicitudes reales.

# v2.1.2 / 2026-11-01

- Se eliminan los encabezados introductorios visibles de Servicios, Galería, Nosotras y Contacto.
- Se conserva un título accesible por página.

# v2.1.1 / 2026-11-01

- El bloque de ubicación del inicio muestra solo Cómo llegar y un mapa interactivo.
- Coordenadas tomadas del enlace de ubicación previamente compartido por el salón.
- Mapa al lado en escritorio y debajo en móvil.

# v2.1.0 / 2026-11-01

- Una sola hoja de estilos para toda la web.
- Se unifican Inicio, Servicios, Galería, Nosotras, Contacto, manual y página 404.
- Se conserva el carrusel sin franjas negras y la consulta por WhatsApp.

# v2.0.1 / 2026-11-01

- Las imágenes del carrusel llenan su espacio sin franjas de fondo laterales.

# v2.0.0 / 2026-11-01

- Identidad negro, plata y fucsia profundo, con superficies claras.
- Logo actual adaptado a plata, conservando su diseño.
- Estilo consistente en las cinco páginas y el formulario de consulta.
- Manual de marca actualizado. Se conservan servicios, carrusel y reservas.

# Historial de cambios

## v1.8.0

- Slider automático en Inicio con los catorce servicios, imágenes y reserva con servicio seleccionado.
- Flechas, indicadores, pausa y desplazamiento táctil; respeta la preferencia de movimiento reducido.
- Rotación detenida con interacción de teclado, cursor, pestaña oculta o reserva abierta.

## v1.7.1

- Los nueve servicios nuevos se integran en la lista principal de Servicios de belleza con la misma estructura visual que los cinco anteriores.
- Cada servicio conserva su imagen, descripción y botón de consulta; se elimina la sección separada.

## v1.7.0

- Cada uno de los nueve servicios adicionales cuenta con una imagen representativa propia.
- Tarjetas con imagen y distribución compacta de tres columnas en escritorio y horizontal en móvil.
- Imágenes generadas con estilo fucsia y dorado, optimizadas en WebP y con textos alternativos.

## v1.6.0

- Añadidos depilación de piernas y bikini, mechas, rollitos, cejas en henna, pestañas punto a punto, peinados para ocasiones especiales, peinados para niñas y corte.
- Servicios disponibles en los cinco popups, con selección automática desde las tarjetas nuevas.
- Imagen de inspiración generada para los servicios adicionales, en estilo fucsia y dorado.

## v1.5.0

- «Agenda tu momento» abre en un popup desde los botones de reserva en las cinco páginas.
- Formulario retirado del contenido fijo de Contacto; conserva validación y mensaje de WhatsApp.
- Cierre con botón, Escape o fondo, control de foco y desplazamiento interno en móvil.

## v1.4.1

- Los botones de reserva abren el bloque «Agenda tu momento» desde su encabezado, con margen para la navegación fija.

## v1.4.0

- Seis nuevas imágenes suministradas con fondos fucsia y dorado integrados, optimizadas en WebP.
- Portada, servicios y galería actualizados; encuadres ajustados para las nuevas composiciones.
- Retirado el fondo de salón añadido por CSS en las imágenes actuales.

## v1.3.0

- Nombre completo y hora preferida obligatorios en el formulario de cita, incluidos en el mensaje de WhatsApp.
- Botones principales de reserva dirigidos al formulario.
- Fondo ilustrativo de salón profesional detrás de las imágenes de referencia.
- Eliminado el botón flotante duplicado en contacto para evitar que cubra el formulario.

## v1.2.0

- Escala de títulos y espacios más compacta en las cinco páginas.
- Inicio sin el bloque que repetía el retrato de portada; servicios y galería compactos en móvil.
- Títulos y descripciones únicos orientados al servicio y ubicación, con metadatos sociales coherentes.
- Identificador, URL y logo del salón incluidos en los datos estructurados.
- Verificación visual en 320, 375, 600, 768, 1024 y 1440 píxeles.

## v1.1.0

- Logo original de mayor resolución en cabecera y pie de todas las páginas.
- Nuevas imágenes de inspiración optimizadas en WebP con transparencia.
- Portada, servicios y galería adaptados para móvil y escritorio.
- Textos de galería y metadatos sociales actualizados.

Este proyecto utiliza [Semantic Versioning](https://semver.org/lang/es/).

## [1.0.0] - 2026-10-25

### Añadido
- Sitio web responsive con cinco páginas HTML independientes y navegación compartida.
- Identidad moderna negro/fucsia/rosa y logotipo recortado del afiche original.
- Catálogo de servicios, galería de imágenes de referencia y enlace a Google Maps.
- Formulario no persistente que genera una solicitud de cita en WhatsApp.
- Metadatos por página, datos estructurados `BeautySalon`, Open Graph y favicon.
- Manual de identidad de marca en HTML y PDF.
- Pruebas de humo automatizadas, despliegue por GitHub Actions y generación SEO.

### Pendiente
- Aprobación final de la marca y material visual por el salón.
- Fotografías propias, horarios, precios y portafolio real.
- Creación y publicación del repositorio GitHub por quien tenga permisos adecuados.
