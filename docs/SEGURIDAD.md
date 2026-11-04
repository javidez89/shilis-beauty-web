# Seguridad de la web de Shili’s

Revisión y refuerzos del 3 de noviembre de 2026. Alcance: versión pública del sitio, código actual de publicación, certificado, cabeceras y rutas concretas de archivos. No es una prueba de penetración exhaustiva ni una auditoría de contraseñas, historial Git, sesiones o servicios externos.

## Resultado de la revisión

- El certificado de shilispeluqueria.com y www es válido. La conexión probada negoció TLS 1.3; el certificado observado vence el 1 de febrero de 2027. Esta comprobación no demuestra por sí sola qué otros protocolos acepta el servidor.
- HTTP redirige a HTTPS. No se encontraron recursos activos HTTP en los documentos revisados.
- Diez rutas concretas de archivos de configuración, desarrollo y administración devolvieron 404, incluidas .env, .git/HEAD, el esquema de base de datos y la configuración de la agenda descartada. No se hizo enumeración masiva.
- La búsqueda limitada de patrones de claves privadas y tokens en el código actual no reportó coincidencias. No sustituye el análisis del historial ni de las cuentas.
- Los enlaces que abren otra pestaña tienen noopener y noreferrer. El enlace dinámico de WhatsApp mantiene un destinatario fijo y codifica el texto del cliente.
- La versión activa no guarda reservas en una base de datos. Solo prepara la consulta de WhatsApp, que el visitante revisa y envía. La agenda de Nora y Jenny está descartada.

## Refuerzos aplicados

Los nueve documentos HTML públicos tienen una Content Security Policy mediante meta y una política explícita de referencia. Se permite JavaScript y CSS locales, imágenes propias, las imágenes data necesarias y el iframe de Google Maps. Se bloquean conexiones de aplicación con fetch/XHR, objetos incrustados y el envío nativo de formularios. No se habilitan unsafe-inline ni unsafe-eval. El JSON-LD de SEO conserva hashes calculados a partir del documento final.

Los estilos en atributos se trasladaron al CSS local. El mapa envía como máximo el origen de referencia a otro origen. El botón de envío nace deshabilitado y booking.js lo habilita después de instalar la interceptación del formulario, para que un fallo de JavaScript no convierta el formulario en una petición GET con nombre y detalles en la URL. La CSP proporciona una segunda barrera frente al envío nativo. El flujo legítimo de WhatsApp conserva su funcionamiento.

La publicación de assets usa una lista permitida: los dos scripts públicos, la hoja de estilos y los formatos de imagen esperados. Excluye archivos ocultos, documentación de trabajo, mapas de código fuente y la configuración de agenda. Rechaza enlaces simbólicos.

La validación de GitHub Actions tiene permiso de solo lectura. Solo el trabajo de despliegue recibe los permisos necesarios de Pages y OIDC. Checkout no conserva credenciales para los scripts del repositorio. Las acciones se fijaron a los commits que resolvían sus etiquetas oficiales al revisarlas; deben actualizarse de forma deliberada cuando se revisen nuevas versiones.

## Límites que siguen pendientes

Las respuestas HTTP del alojamiento actual no incluyen HSTS, X-Content-Type-Options, X-Frame-Options, CSP en cabecera ni Permissions-Policy. Los tipos MIME observados de HTML, CSS y JavaScript son correctos. La meta CSP no equivale a una cabecera HTTP: no puede imponer frame-ancestors, proteger respuestas no HTML ni sustituir HSTS o nosniff. No se agregan metas ignoradas que aparenten proporcionar esas protecciones. El vercel.json del repositorio no configura las respuestas de GitHub Pages.

Para controlar esas cabeceras se necesita una configuración HTTP del alojamiento o una capa que permita añadirlas. Esta revisión no cambia el alojamiento, DNS ni suscripciones. No se detectó explotación de su ausencia; se conserva como límite de endurecimiento del alojamiento.

No se comprobó si las cuentas propietarias de GitHub, Google y el registrador tienen verificación en dos pasos. Confirmar esa protección y la recuperación de acceso es una tarea de la persona responsable de las cuentas, sin compartir contraseñas o códigos en el chat.

## Mantenimiento y pruebas

El generador SEO vuelve a calcular las protecciones de sus páginas después de regenerar los datos estructurados. El build protege también 404, manual y rutas antiguas. No editar manualmente los hashes. Los scripts nuevos deben añadirse deliberadamente a la lista pública, y los estilos deben seguir en la hoja local.

Pruebas: tests/test_security.mjs, tests/test_site.py, tests/test_launch.cjs, tests/test_whatsapp_notice.cjs y tests/test_seo_build.mjs. La prueba de envío usa una ventana simulada y no envía mensajes ni crea citas. La comprobación de navegador verifica afiche, carrusel, formulario, enlace antiguo de citas, vista móvil, mapa y colores de marca sin errores de JavaScript detectados en esas vistas.

Referencias: [CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP), [Referrer-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Referrer-Policy), [HTTPS en GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https).
