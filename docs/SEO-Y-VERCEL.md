# Shili’s · SEO local y publicación en Vercel

Datos confirmados por la propietaria del sitio el 3 de noviembre de 2026:

- Marca: Shili’s Alta Peluquería y Belleza.
- Dirección: Avenida Medina 8 # 7-29, Mesitas del Colegio, Cundinamarca, Colombia.
- Referencia: junto al restaurante Yolis.
- Teléfono y WhatsApp: +57 318 786 2277.
- Atención presencial: todos los días, 09:00–19:00, hora de Colombia.
- Dominio propio registrado y asociado a GitHub Pages: https://shilispeluqueria.com/ . El usuario decidió mantener GitHub Pages el 3 de noviembre de 2026, sin contratar Vercel Pro. La dirección anterior es https://javidez89.github.io/shilis-beauty-web/ . Ver los detalles de conexión en `DOMINIO-SHILIS.md`.

## Implementado en la web

Cinco páginas con títulos y descripciones propios, encabezados visibles, enlaces entre servicios, datos del salón coherentes y catálogo estructurado de los 14 servicios existentes. Marcado `BeautySalon`, `WebSite`, páginas y rutas de navegación. Sin precios, reseñas, coordenadas ni sucursales inventadas. Las imágenes de inspiración conservan esa identificación.

Contenido útil para residentes de Mesitas y visitantes desde La Mesa, Anapoima, Tena y Viotá. La atención se realiza en Mesitas; no se anuncian sedes en otros municipios.

Logo con versiones WebP adaptadas a cada pantalla y favicon pequeño. El afiche se abre automáticamente en el inicio por solicitud del propietario; también puede abrirse desde el aviso y el pie de página. Se conserva el formulario de solicitud por WhatsApp y la confirmación directa del salón. El compromiso del anuncio automático con las recomendaciones de Google se documenta más abajo.

## Publicación preparada

`vercel.json` ejecuta `node scripts/build_vercel.mjs` y publica únicamente `dist`. GitHub Pages usa el mismo generador. No se incluyen scripts de desarrollo, pruebas, información de Git ni el sistema de agenda privada descartado por el propietario.

El generador toma la URL estable de `VERCEL_PROJECT_PRODUCTION_URL`, nunca la dirección temporal de cada despliegue. Si se configura `SITE_URL`, debe ser la dirección principal HTTPS confirmada. Actualiza canónicas, redes sociales, datos estructurados, sitemap y robots juntos. Las vistas previas llevan `noindex`.

La configuración de Vercel queda preparada para un traslado futuro, si el usuario lo decide. El plan Hobby se limita a uso personal no comercial; la cotización revisada para Pro fue US$20 al mes más impuestos y posibles consumos. El usuario rechazó ese costo y mantiene el alojamiento actual. No se ha contratado ni cobrado un plan de Vercel.

## Registro en Google · 3 de noviembre de 2026

La propiedad de prefijo `https://javidez89.github.io/shilis-beauty-web/` quedó verificada en Google Search Console con la cuenta autorizada. Se publicó la etiqueta de verificación en la página principal y debe conservarse.

Después de registrar el dominio propio, se verificó también `shilispeluqueria.com` mediante DNS, se envió su sitemap y Google aceptó la solicitud de indexación de su página principal. La web ya se sirve por HTTPS en https://shilispeluqueria.com/ y las direcciones anteriores de GitHub redirigen con HTTP 301. El detalle del cambio y las comprobaciones están en `DOMINIO-SHILIS.md`.

El sitemap se envió correctamente y su informe pasó del error inicial a «Correcto», con cinco páginas descubiertas. Esto no equivale a tener cinco páginas indexadas. La web anterior de GitHub había figurado indexada. En la revisión posterior del dominio propio, Search Console informó para su inicio «Duplicada: Google ha elegido una versión canónica diferente a la del usuario», con último rastreo el 3 de noviembre de 2026 a las 16:07:02. La versión escogida por Google figura N/D: no afirmar cuál eligió. Las redirecciones 301 desde HTTP, www y el proyecto anterior funcionan; las etiquetas canónicas y el sitemap ya usan el dominio propio.

El usuario autorizó crear el Perfil de Negocio y aceptar sus condiciones. La ficha de Shili’s ya fue creada y configurada con nombre, categoría Peluquería, dirección, teléfono, web, WhatsApp, descripción, horario diario 09:00–19:00 y los catorce servicios de la web. Se cargó el logo como foto del negocio. El usuario confirmó que se atiende únicamente en el salón. El marcador se ajustó usando su enlace de Street View y la fachada que confirmó. Google exige una grabación continua real del local para verificarla; el usuario se encargará del video. La ficha aún no es públicamente visible. No crear otra ficha ni afirmar que está verificada.

Descripción preparada para la ficha:

> Shili’s Alta Peluquería y Belleza es un salón en Mesitas del Colegio, Cundinamarca. Ofrecemos cortes, cepillados, mechas, queratinas y peinados para diferentes ocasiones, además de manicure, pedicure, cejas, cejas en henna, pestañas punto a punto y depilación. Un espacio para cuidar tu cabello, tus manos y tu mirada, con el lema «Tu estilo, tu momento». Las citas y la disponibilidad se confirman directamente con el equipo del salón.

## Siguientes pasos y posible traslado futuro

1. Mantener funcionando las cinco páginas, WhatsApp, mapa y página 404. Las verificaciones actuales responden correctamente.
2. Mantener alineados sitemap, canónicas, enlaces de inicio y datos del salón con el dominio propio. Los enlaces principales de inicio se unificaron con la URL canónica; no se eliminó la compatibilidad de las rutas antiguas.
3. Conservar las redirecciones 301 que GitHub Pages ya aplica desde el proyecto anterior y los enlaces y QR existentes.
4. Seguir la indexación del dominio propio y su versión canónica en Search Console. No presentar una solicitud aceptada ni una prueba en vivo válida como confirmación de indexación.
5. Completar la verificación por video de la ficha ya creada y revisar su aprobación antes de difundir un enlace público de Maps o reseñas.
6. Añadir fotografías reales del salón, mobiliario y trabajos con permiso. Solicitar reseñas honestas a clientas reales, sin inventarlas ni condicionar incentivos a valoraciones positivas.
7. Revisar mensualmente consultas, clics y páginas indexadas en Search Console; mantener información y contenido actualizados. La publicación no garantiza posiciones ni plazos de indexación.

La agenda de Nora y Jenny fue descartada expresamente por el propietario. No activarla ni retomar su acceso con Google o su base de reservas. Las citas siguen como consultas por WhatsApp y se confirman directamente con el salón. No reactivar Google Calendar.

Referencias oficiales: [SEO de Google](https://developers.google.com/search/docs/fundamentals/seo-starter-guide), [negocios locales](https://developers.google.com/search/docs/appearance/structured-data/local-business), [migraciones](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes), [popups](https://developers.google.com/search/docs/appearance/avoid-intrusive-interstitials), [Vercel Hobby](https://vercel.com/docs/plans/hobby), [Vercel Pro](https://vercel.com/docs/plans/pro-plan).

## Revisión del afiche y rendimiento · versión 2.10.0

Por solicitud expresa del propietario, el afiche vuelve a abrirse automáticamente al cargar el inicio, incluso después de haberlo cerrado en una visita anterior. Las páginas interiores no lo abren automáticamente; conservan la opción manual. Los enlaces directos `#agenda-tu-momento` abren primero las citas y no superponen el anuncio. El cierre funciona con el botón, Escape o el fondo. La ausencia de almacenamiento de sesión no impide abrirlo.

Esta elección conserva un compromiso: Google recomienda evitar anuncios promocionales que cubran el contenido al entrar. No se aplican excepciones por navegador, robot o procedencia. Una puntuación de SEO técnico no elimina este compromiso ni garantiza posiciones.

La medición inicial de PageSpeed móvil mostró 77 de rendimiento, 96 de accesibilidad, 100 de recomendaciones y 100 de SEO técnico (LCP 6,1 s, CLS 0; laboratorio, sin datos reales suficientes). Se añadieron variantes WebP adaptables para las 16 imágenes de contenido, sin cambiar las ilustraciones ni sus originales. Las variantes mayores suman 1.697.474 bytes frente a 2.400.076 de los archivos anteriores. El navegador elige variantes menores cuando corresponde. La imagen secundaria de portada carga de forma diferida; el afiche del inicio tiene prioridad de carga.

Se corrigieron los roles incompatibles de las diapositivas y se ampliaron las áreas táctiles del carrusel a 28 × 32 px, con desplazamiento horizontal dentro del control en pantallas pequeñas. El mapa mantiene su previsualización: se carga al acercarse a su sección y dispone de alternativa sin JavaScript. Se añadió una prueba funcional del afiche, cierre, reapertura, almacenamiento bloqueado y prioridad del formulario de WhatsApp.

Search Console ya informó estado «Correcto» para el sitemap del nuevo dominio y cinco páginas descubiertas. Descubrir páginas no equivale a tenerlas indexadas ni posicionadas. La ficha de Maps está creada y pendiente de verificación por video; no se inventan reseñas ni se presenta la ficha como visible.

## Validación de posicionamiento y difusión

Las cinco páginas publicadas responden 200, permiten indexación y contienen una canónica, descripción y título principal propios. Las imágenes tienen texto alternativo y las tarjetas sociales apuntan al logo oficial disponible. Los enlaces internos a servicios funcionan. No se encontraron perfiles de redes enlazados y el usuario confirmó que no tiene redes sociales: no añadir enlaces supuestos ni crear cuentas por inferencia.

Se actualizan mapa y enlaces de ubicación con el punto de referencia que el propietario proporcionó: 4.5826933, -74.4458986, frente al local confirmado en Street View. Es una referencia de llegada; no se añade como coordenada de un edificio verificado en los datos estructurados.

El plan de difusión debe medir búsquedas locales, clics y consultas reales por WhatsApp. Crear perfiles sociales requerirá un encargo explícito y la aceptación de sus condiciones cuando corresponda. Las propuestas de contenidos o frecuencia son recomendaciones editoriales; no prueban demanda de búsqueda ni aseguran viralidad. El rendimiento y el SEO técnico de Lighthouse no equivalen a posicionamiento orgánico.
