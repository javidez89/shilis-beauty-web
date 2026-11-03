# Shili’s · SEO local y publicación en Vercel

Datos confirmados por la propietaria del sitio el 3 de noviembre de 2026:

- Marca: Shili’s Alta Peluquería y Belleza.
- Dirección: Avenida Medina 8 # 7-29, Mesitas del Colegio, Cundinamarca, Colombia.
- Referencia: junto al restaurante Yolis.
- Teléfono y WhatsApp: +57 318 786 2277.
- Atención presencial: todos los días, 09:00–19:00, hora de Colombia.
- Dirección web vigente: https://javidez89.github.io/shilis-beauty-web/ . El usuario decidió mantener GitHub Pages el 3 de noviembre de 2026, sin contratar Vercel Pro. Dominio propio pendiente.

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
