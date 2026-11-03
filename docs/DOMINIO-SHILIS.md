# Conexión de shilispeluqueria.com

Destino acordado: https://shilispeluqueria.com/ . Mantener el alojamiento existente en GitHub Pages. El usuario rechazó contratar Vercel Pro; no activar servicios adicionales de pago.

## Estado revisado el 3 de noviembre de 2026

El registro público de Verisign confirma la inscripción del dominio el 3 de noviembre de 2026 y los servidores `ns1.latinoamericahosting.com` y `ns2.latinoamericahosting.com`. No se observó un estado de suspensión. En la consulta inicial, Google Public DNS devolvió SERVFAIL y señaló que los servidores rechazaban la consulta. Revisar o activar la zona DNS del proveedor antes de atribuirlo únicamente a propagación.

La documentación del proveedor actualizada el 26 de octubre de 2026 indica que, si el dominio no tiene hosting contratado, la administración DNS del área de clientes necesita los servidores `latinoamericahosting.earth.orderbox-dns.com`, `latinoamericahosting.mars.orderbox-dns.com`, `latinoamericahosting.mercury.orderbox-dns.com` y `latinoamericahosting.venus.orderbox-dns.com`. Si sí tiene hosting, se mantiene la delegación del hosting y los registros se administran desde cPanel. Comprobar cuál caso corresponde en la cuenta antes de cambiar los servidores; conservar primero los registros de cualquier otro servicio.

La versión del sitio para el nuevo dominio se generó y se comprobó sin cambiar la publicación actual: las cinco páginas, las canónicas, los datos estructurados, las imágenes para compartir, sitemap, robots, página 404 y WhatsApp apuntan correctamente al destino preparado.

Después de que el usuario inició sesión, se habilitó la gestión DNS por $0,00/año. Se comprobó que la zona solo tenía sus registros NS, sin correo ni otros registros configurados. Se publicaron los registros de abajo y se cambió la delegación a los cuatro servidores Orderbox del proveedor. Google Public DNS devolvió las cuatro IP de GitHub y los dos TXT correctos. GitHub confirmó la propiedad del dominio y lo asoció a `javidez89/shilis-beauty-web`. Google Search Console verificó automáticamente la propiedad de dominio mediante DNS.

La publicación `81895b0` pasó la validación y el despliegue de GitHub Actions. Las cinco páginas responden HTTP 200 con HTTPS válido, su canónica correcta y el enlace a WhatsApp. Se activó Enforce HTTPS. Se verificaron redirecciones HTTP 301 desde HTTP, www y las direcciones anteriores de GitHub a las páginas equivalentes del dominio principal. Una ruta inexistente devuelve HTTP 404 con el diseño del salón. El formulario de citas abre correctamente desde la nueva dirección.

El sitemap nuevo responde HTTP 200 y contiene cinco páginas. Google confirmó su envío y aceptó la solicitud de indexación de https://shilispeluqueria.com/ . El informe inicial del sitemap mostró «No se ha podido obtener»; no se da por finalizada su lectura ni la indexación. La inspección de la página principal ya la identificó como descubierta mediante ese sitemap, y su solicitud posterior de indexación fue aceptada. Conservar la propiedad anterior de GitHub para seguimiento.

## Registros publicados

Los registros siguientes corresponden a la web y a las verificaciones de propiedad. No fue necesario eliminar registros existentes.

| Tipo | Nombre | Destino o valor |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | javidez89.github.io |
| TXT | @ | google-site-verification=hhfhZ6P_CBT7mZBUCMy5mBpCDLKlwxWVznf6MGP9nlA |
| TXT | _github-pages-challenge-javidez89 | bb7e5934ad70cd8ce9127154e6573e |

En los destinos DNS no escribir `https://` ni `/shilis-beauty-web/`. El nombre `@` puede representarse como el dominio completo según el panel. No crear un CNAME en la raíz ni registros comodín. El proveedor exige un TTL mínimo de 14400 segundos; se usó ese valor para A, CNAME y TXT.

GitHub confirmó la verificación en los ajustes personales de Pages de la cuenta propietaria. Mantener los TXT de GitHub y Google para conservar ambas verificaciones. La web usa GitHub Actions, por lo que GitHub no requiere un archivo CNAME en el artefacto.

## Orden para activar

1. Gestión DNS activada en el dominio, sin contratar hosting adicional.
2. Registros A, www y TXT publicados; verificaciones de GitHub y Google completadas.
3. Dominio asociado al repositorio; contenido desplegado y enlaces anteriores comprobados.
4. El flujo de publicación toma `SITE_URL` de `actions/configure-pages` mediante `base_url`: cuando GitHub tenga asociado el dominio, el siguiente despliegue usará automáticamente esa dirección en el SEO. Volver a ejecutar la publicación después de guardar el dominio si GitHub no dispara un despliegue.
5. Resolución de raíz y www, certificado válido, cinco páginas y Enforce HTTPS comprobados.
6. Propiedad de dominio de Google Search Console verificada; sitemap enviado y solicitud de indexación aceptada. La propiedad anterior de GitHub debe conservarse. El procesamiento de Google continúa.
7. Usar el nuevo dominio en la ficha de Google Maps cuando se complete su alta; sigue pendiente que el usuario ajuste el marcador exacto del local. No cambiar los permisos de la agenda privada futura ni activar Google Calendar.

Referencias: [dominios en GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site), [verificación de GitHub](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages), [DNS en Latinoamérica Hosting](https://soporte.latinoamericahosting.com/es/category/area-de-clientes-1v7w59e/).
