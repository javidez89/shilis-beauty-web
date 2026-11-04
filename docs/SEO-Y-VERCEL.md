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

Logo con versiones WebP adaptadas a cada pantalla y favicon pequeño. Afiche WebP de carga diferida, con PNG original disponible. El visitante puede abrir el popup desde un aviso discreto y desde el pie de página; el contenido principal permanece visible al entrar. Se conserva el formulario de solicitud por WhatsApp y la confirmación directa del salón.

## Publicación preparada

`vercel.json` ejecuta `node scripts/build_vercel.mjs` y publica únicamente `dist`. No se incluyen scripts de desarrollo, pruebas, información de Git ni el sistema de agenda privada que aún está en preparación.

El generador toma la URL estable de `VERCEL_PROJECT_PRODUCTION_URL`, nunca la dirección temporal de cada despliegue. Si se configura `SITE_URL`, debe ser la dirección principal HTTPS confirmada. Actualiza canónicas, redes sociales, datos estructurados, sitemap y robots juntos. Las vistas previas llevan `noindex`.

La configuración de Vercel queda preparada para un traslado futuro, si el usuario lo decide. El plan Hobby se limita a uso personal no comercial; la cotización revisada para Pro fue US$20 al mes más impuestos y posibles consumos. El usuario rechazó ese costo y mantiene el alojamiento actual. No se ha contratado ni cobrado un plan de Vercel.

## Registro en Google · 3 de noviembre de 2026

La propiedad de prefijo `https://javidez89.github.io/shilis-beauty-web/` quedó verificada en Google Search Console con la cuenta autorizada. Se publicó la etiqueta de verificación en la página principal y debe conservarse.

Después de registrar el dominio propio, se verificó también `shilispeluqueria.com` mediante DNS, se envió su sitemap y Google aceptó la solicitud de indexación de su página principal. La web ya se sirve por HTTPS en https://shilispeluqueria.com/ y las direcciones anteriores de GitHub redirigen con HTTP 301. El detalle del cambio y las comprobaciones están en `DOMINIO-SHILIS.md`.

El sitemap se envió correctamente. El informe mostró inicialmente «No se ha podido obtener». Se revisaron la URL, la respuesta HTTP 200, el tipo XML y el archivo robots; una prueba en tiempo real de Search Console confirmó «Se permite el rastreo: Sí» y «Obtención de página: Correcto» para el sitemap. El envío no significa que Google ya haya procesado sus cinco páginas ni que estas estén indexadas. La página principal ya figuraba indexada y Google aceptó la solicitud de nueva indexación tras los cambios.

En el administrador de Perfil de Negocio de la cuenta no apareció Shili’s. El usuario autorizó expresamente crear la ficha y aceptar sus condiciones. Se ingresaron nombre, categoría Peluquería y dirección confirmada. El alta está en curso: Google propuso un marcador aproximado de El Colegio, que debe ajustar la persona responsable del local antes de continuar. No se da por creada, publicada ni verificada la ficha. Después del marcador, completar teléfono, web, atención diaria 09:00–19:00, descripción, logo y el método de verificación que Google habilite. No afirmar que la dirección quedó verificada a partir de la marca aproximada del mapa.

Descripción preparada para la ficha:

> Shili’s Alta Peluquería y Belleza es un salón en Mesitas del Colegio, Cundinamarca. Ofrecemos cortes, cepillados, mechas, queratinas y peinados para diferentes ocasiones, además de manicure, pedicure, cejas, cejas en henna, pestañas punto a punto y depilación. Un espacio para cuidar tu cabello, tus manos y tu mirada, con el lema «Tu estilo, tu momento». Las citas y la disponibilidad se confirman directamente con el equipo del salón.

## Siguientes pasos y posible traslado futuro

1. Comprobar que inicio, servicios, galería, nosotras y contacto funcionan, así como WhatsApp, mapa y página 404.
2. Verificar que sitemap, canónicas y datos del salón usan exactamente la nueva dirección. No cambiar la canónica del sitio vigente antes de que la nueva web esté funcionando.
3. Configurar la migración de los enlaces antiguos de GitHub Pages a sus equivalentes. GitHub Pages no admite redirecciones HTTP permanentes propias; usar las alternativas documentadas por Google cuando no sea posible configurar el servidor. Mantener los enlaces y QR antiguos funcionando.
4. La dirección actual ya está verificada en Search Console y el sitemap está enviado. Si se traslada la web en el futuro, registrar también la nueva dirección y su sitemap. La inspección confirmó que la página principal actual ya está indexada; esto no demuestra que Google haya actualizado todavía su versión almacenada con los cambios de hoy.
5. Actualizar el Perfil de Empresa de Google existente con el nombre real del salón, teléfono, dirección, horario, enlace web y enlace para citas. Confirmar el pin exacto con la propietaria. Evitar crear una ficha duplicada.
6. Añadir fotografías reales del salón, mobiliario y trabajos con permiso. Solicitar reseñas honestas a clientas reales, sin inventarlas ni condicionar incentivos a valoraciones positivas.
7. Revisar mensualmente consultas, clics y páginas indexadas en Search Console; mantener información y contenido actualizados. La publicación no garantiza posiciones ni plazos de indexación.

La agenda privada futura usa Supabase y está desactivada en la versión pública actual. Cuando se active en el nuevo dominio, revisar también orígenes permitidos, retorno de inicio de sesión y configuración OAuth. No reactivar Google Calendar.

Referencias oficiales: [SEO de Google](https://developers.google.com/search/docs/fundamentals/seo-starter-guide), [negocios locales](https://developers.google.com/search/docs/appearance/structured-data/local-business), [migraciones](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes), [popups](https://developers.google.com/search/docs/appearance/avoid-intrusive-interstitials), [Vercel Hobby](https://vercel.com/docs/plans/hobby), [Vercel Pro](https://vercel.com/docs/plans/pro-plan).

## Revisión del afiche y rendimiento · versión 2.10.0

Por solicitud expresa del propietario, el afiche vuelve a abrirse automáticamente al cargar el inicio, incluso después de haberlo cerrado en una visita anterior. Las páginas interiores no lo abren automáticamente; conservan la opción manual. Los enlaces directos `#agenda-tu-momento` abren primero las citas y no superponen el anuncio. El cierre funciona con el botón, Escape o el fondo. La ausencia de almacenamiento de sesión no impide abrirlo.

Esta elección conserva un compromiso: Google recomienda evitar anuncios promocionales que cubran el contenido al entrar. No se aplican excepciones por navegador, robot o procedencia. Una puntuación de SEO técnico no elimina este compromiso ni garantiza posiciones.

La medición inicial de PageSpeed móvil mostró 77 de rendimiento, 96 de accesibilidad, 100 de recomendaciones y 100 de SEO técnico (LCP 6,1 s, CLS 0; laboratorio, sin datos reales suficientes). Se añadieron variantes WebP adaptables para las 16 imágenes de contenido, sin cambiar las ilustraciones ni sus originales. Las variantes mayores suman 1.697.474 bytes frente a 2.400.076 de los archivos anteriores. El navegador elige variantes menores cuando corresponde. La imagen secundaria de portada carga de forma diferida; el afiche del inicio tiene prioridad de carga.

Se corrigieron los roles incompatibles de las diapositivas y se ampliaron las áreas táctiles del carrusel a 28 × 32 px, con desplazamiento horizontal dentro del control en pantallas pequeñas. El mapa mantiene su previsualización: se carga al acercarse a su sección y dispone de alternativa sin JavaScript. Se añadió una prueba funcional del afiche, cierre, reapertura, almacenamiento bloqueado y prioridad del formulario de WhatsApp.

Search Console ya informó estado «Correcto» para el sitemap del nuevo dominio y cinco páginas descubiertas. Descubrir páginas no equivale a tenerlas indexadas ni posicionadas. La ficha de Maps sigue pendiente del marcador exacto y la verificación del negocio; no se inventan coordenadas ni reseñas.
