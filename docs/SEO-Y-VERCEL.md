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

## Al confirmar la dirección de producción

1. Comprobar que inicio, servicios, galería, nosotras y contacto funcionan, así como WhatsApp, mapa y página 404.
2. Verificar que sitemap, canónicas y datos del salón usan exactamente la nueva dirección. No cambiar la canónica del sitio vigente antes de que la nueva web esté funcionando.
3. Configurar la migración de los enlaces antiguos de GitHub Pages a sus equivalentes. GitHub Pages no admite redirecciones HTTP permanentes propias; usar las alternativas documentadas por Google cuando no sea posible configurar el servidor. Mantener los enlaces y QR antiguos funcionando.
4. Dar de alta la URL de producción en Google Search Console, completar la verificación de propiedad y enviar `/sitemap.xml`. Solicitar revisión de las páginas principales. Estas acciones requieren acceso de la persona propietaria y no se dan por completadas con el despliegue.
5. Actualizar el Perfil de Empresa de Google existente con el nombre real del salón, teléfono, dirección, horario, enlace web y enlace para citas. Confirmar el pin exacto con la propietaria. Evitar crear una ficha duplicada.
6. Añadir fotografías reales del salón, mobiliario y trabajos con permiso. Solicitar reseñas honestas a clientas reales, sin inventarlas ni condicionar incentivos a valoraciones positivas.
7. Revisar mensualmente consultas, clics y páginas indexadas en Search Console; mantener información y contenido actualizados. La publicación no garantiza posiciones ni plazos de indexación.

La agenda privada futura usa Supabase y está desactivada en la versión pública actual. Cuando se active en el nuevo dominio, revisar también orígenes permitidos, retorno de inicio de sesión y configuración OAuth. No reactivar Google Calendar.

Referencias oficiales: [SEO de Google](https://developers.google.com/search/docs/fundamentals/seo-starter-guide), [negocios locales](https://developers.google.com/search/docs/appearance/structured-data/local-business), [migraciones](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes), [popups](https://developers.google.com/search/docs/appearance/avoid-intrusive-interstitials), [Vercel Hobby](https://vercel.com/docs/plans/hobby), [Vercel Pro](https://vercel.com/docs/plans/pro-plan).
