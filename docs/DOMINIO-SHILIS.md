# Conexión de shilispeluqueria.com

Destino acordado: https://shilispeluqueria.com/ . Mantener el alojamiento existente en GitHub Pages. El usuario rechazó contratar Vercel Pro; no activar servicios adicionales de pago.

## Estado revisado el 3 de noviembre de 2026

El registro público de Verisign confirma la inscripción del dominio el 3 de noviembre de 2026 y los servidores `ns1.latinoamericahosting.com` y `ns2.latinoamericahosting.com`. No se observó un estado de suspensión. En la consulta inicial, Google Public DNS devolvió SERVFAIL y señaló que los servidores rechazaban la consulta. Revisar o activar la zona DNS del proveedor antes de atribuirlo únicamente a propagación.

La documentación del proveedor actualizada el 26 de octubre de 2026 indica que, si el dominio no tiene hosting contratado, la administración DNS del área de clientes necesita los servidores `latinoamericahosting.earth.orderbox-dns.com`, `latinoamericahosting.mars.orderbox-dns.com`, `latinoamericahosting.mercury.orderbox-dns.com` y `latinoamericahosting.venus.orderbox-dns.com`. Si sí tiene hosting, se mantiene la delegación del hosting y los registros se administran desde cPanel. Comprobar cuál caso corresponde en la cuenta antes de cambiar los servidores; conservar primero los registros de cualquier otro servicio.

La versión del sitio para el nuevo dominio se generó y se comprobó sin cambiar la publicación actual: las cinco páginas, las canónicas, los datos estructurados, las imágenes para compartir, sitemap, robots, página 404 y WhatsApp apuntan correctamente al destino preparado.

Las sesiones de Latinoamérica Hosting y GitHub no estaban abiertas en el navegador del chat; se dejaron ambas pantallas de acceso preparadas. No se solicitaron contraseñas ni códigos por el chat. No se modificaron registros DNS, servidores de nombres ni la dirección publicada en GitHub.

## Registros previstos

Antes de cambiarlos, revisar la zona existente y conservar los registros de correo y de otros servicios. Los registros siguientes corresponden únicamente a la web y a su verificación en Google.

| Tipo | Nombre | Destino o valor |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | javidez89.github.io |
| TXT | @ | google-site-verification=hhfhZ6P_CBT7mZBUCMy5mBpCDLKlwxWVznf6MGP9nlA |

En los destinos DNS no escribir `https://` ni `/shilis-beauty-web/`. El nombre `@` puede representarse como el dominio completo según el panel. No crear un CNAME en la raíz ni registros comodín. Usar el TTL predeterminado del proveedor, o 300 segundos si permite configurarlo.

Antes de apuntar los registros web, verificar el dominio en los ajustes personales de Pages de GitHub y asociar `shilispeluqueria.com` al repositorio `javidez89/shilis-beauty-web`. GitHub genera un TXT adicional de verificación que aún no se ha obtenido porque falta iniciar sesión. Conservarlo una vez añadido. La web usa GitHub Actions, por lo que GitHub no requiere un archivo CNAME en el artefacto.

## Orden para activar

1. Abrir el dominio en el proveedor y comprobar si usa administración DNS de dominio o un servicio de hosting ya contratado. Activar la zona correspondiente si no existe. No contratar un plan para este paso sin consultar el costo.
2. Obtener y publicar el TXT de verificación de GitHub; verificarlo en la cuenta propietaria. Añadir también el TXT de Google indicado arriba.
3. Coordinar la asociación del dominio al repositorio con los registros A y www para completar el cambio. No dejar el sitio anterior redirigiendo a un dominio que no funciona durante un período prolongado.
4. El flujo de publicación toma `SITE_URL` de `actions/configure-pages` mediante `base_url`: cuando GitHub tenga asociado el dominio, el siguiente despliegue usará automáticamente esa dirección en el SEO. Volver a ejecutar la publicación después de guardar el dominio si GitHub no dispara un despliegue.
5. Comprobar resolución de raíz y www, certificado válido y las cinco páginas. Activar Enforce HTTPS cuando GitHub lo habilite. Comprobar que los enlaces anteriores de GitHub llevan a las páginas equivalentes del dominio nuevo.
6. Completar la propiedad de dominio de Google Search Console, preparada pero todavía sin verificar. Enviar https://shilispeluqueria.com/sitemap.xml y solicitar actualización de la página principal. La propiedad anterior de GitHub debe conservarse.
7. Usar el nuevo dominio en la ficha de Google Maps cuando se complete su alta; sigue pendiente que el usuario ajuste el marcador exacto del local. No cambiar los permisos de la agenda privada futura ni activar Google Calendar.

Referencias: [dominios en GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site), [verificación de GitHub](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages), [DNS en Latinoamérica Hosting](https://soporte.latinoamericahosting.com/es/category/area-de-clientes-1v7w59e/).
