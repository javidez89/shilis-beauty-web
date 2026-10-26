# Shili's Alta Peluquería y Belleza ✦

Sitio estático **responsive y multipágina**, preparado para desplegar con **GitHub Pages**. Contenido en español de Colombia. Proyecto `v1.0.0`.

## Páginas

- `index.html` — inicio y propuesta visual
- `servicios.html` — servicios y consultas específicas
- `galeria.html` — imágenes de referencia del afiche; **no son portafolio de trabajos comprobados**
- `nosotros.html` — identidad y presentación
- `contacto.html` — información, formulario de consulta hacia WhatsApp y ubicación
- `docs/manual-marca.html` + `docs/manual-marca.pdf` — manual de identidad visual

## Datos verificados en el afiche y proporcionados por el usuario

- Nombre: **Shili's Alta Peluquería y Belleza**
- WhatsApp: **318 786 2277** (`https://wa.me/573187862277`)
- Ubicación: Mesitas del Colegio, Cundinamarca, junto al restaurante Yolis
- Google Maps: <https://maps.app.goo.gl/U5dkvPXNxGehfEHY7>
- Servicios: cepillados, manicure, pedicure, queratinas, cejas y otros por consultar

**No se inventaron tarifas, horarios, dirección exacta, personal, reseñas ni resultados de clientes.**

## Ejecutar localmente

Puedes abrir directamente `index.html` con Chrome/Edge (los enlaces son relativos). Para simular servidor web local:

```bash
python -m http.server 8000
```

Abre `http://localhost:8000`.

## Pruebas automatizadas

```bash
python tests/test_site.py
```

Comprobar manualmente: resolución 320, 375, 768, 1024, 1440 y 1920 px; menú móvil; navegación con teclado; orden de tabulación; link de WhatsApp; Google Maps; envío de formulario que abre WhatsApp; contraste y legibilidad.

## Desplegar en GitHub Pages

1. Crear repositorio público `shilis-beauty-web` en la cuenta GitHub preferida.
2. Subir el contenido **completo**, incluida la carpeta `.github` y el archivo `.nojekyll`, a `main`.
3. En el repositorio: **Settings → Pages → Build and deployment → Source → GitHub Actions**.
4. Ir a **Actions → Deploy Shilis to GitHub Pages**; el push a `main` ejecuta las pruebas y el despliegue.
5. Revisar el enlace público informado por el job `deploy` y probar las cinco páginas en móvil y escritorio.

El workflow genera `sitemap.xml`, `robots.txt` y enlaces canonical según el nombre real del repositorio. Para un dominio propio, hay que adaptar `scripts/build_seo.py`, configurar DNS y comprobar HTTPS.

> **Importante:** Un ZIP local no significa que el repositorio se haya creado ni que GitHub Pages esté publicado. La publicación debe comprobarse en GitHub y en la URL pública.

## Estructura

```text
shilis-beauty-web/
├── index.html, servicios.html, galeria.html, nosotros.html, contacto.html
├── assets/
│   ├── css/styles.css
│   ├── js/main.js
│   └── img/ (logo recortado, imágenes de referencia, favicon)
├── docs/manual-marca.html, docs/manual-marca.pdf
├── scripts/build_seo.py
├── tests/test_site.py
├── .github/workflows/deploy.yml
├── .nojekyll, 404.html, README.md, CHANGELOG.md, LICENSE
└── robots.txt, sitemap.xml (generados por build_seo.py)
```

## Identidad y derechos

El logotipo (`logo-original.webp`) es un **recorte fiel del afiche de referencia**. No se trata de un vector original y su calidad es limitada. Las demás imágenes recortadas también provienen de la pieza proporcionada; sustituirlas por originales autorizados antes de presentarlas como portafolio real. La marca y el material gráfico pertenecen a sus titulares respectivos; el repositorio no confiere derechos de uso a terceros.

## Recomendaciones para producción

- Confirmar con el salón el nombre comercial, derechos del logo, fotos, horarios, precios y el vínculo de Maps.
- Registrar y validar Google Search Console y Google Business Profile.
- Añadir fotografías originales optimizadas y su autorización de publicación.
- Comprobar Lighthouse, Core Web Vitals, WCAG 2.2 AA y calidad de código antes de nuevos lanzamientos.
- Activar HTTPS y evaluar un dominio propio.

## Versionamiento

`MAJOR.MINOR.PATCH`. Trabajar con ramas `feature/*`, mensajes de commit claros, PR y revisión antes de fusionar a `main`. El despliegue automático se activa únicamente desde `main`.
