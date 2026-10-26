# Guía de publicación en GitHub Pages

## Preparación

1. Inicia sesión en GitHub con la cuenta propietaria del proyecto.
2. Crea un repositorio **público** llamado `shilis-beauty-web`, sin marcar la creación automática de README, LICENSE ni .gitignore (ya se incluyen).
3. Desde una terminal, entra a la carpeta extraída del ZIP.

```bash
git init -b main
git add .
git commit -m "feat: launch Shilis multi-page website v1.0.0"
git tag v1.0.0
git remote add origin https://github.com/javidez89/shilis-beauty-web.git
git push -u origin main
git push origin v1.0.0
```

Si el propietario o nombre del repositorio cambian, actualiza la URL del remoto en el comando anterior.

## Habilitar publicación

En GitHub ve a `Settings` → `Pages` → `Build and deployment` → `Source: GitHub Actions`.

El workflow ubicado en `.github/workflows/deploy.yml` valida la web, genera `robots.txt` y `sitemap.xml` con el dominio del repositorio y publica automáticamente cuando hay cambios en `main`.

La URL esperada **solo si el propietario es `javidez89` y el repositorio mantiene ese nombre** es:

`https://javidez89.github.io/shilis-beauty-web/`

**Esa dirección no debe presentarse como activa hasta comprobar que GitHub Pages terminó el despliegue y sirve el contenido.**

## Verificación final

- `Actions`: jobs `validate` y `deploy` en verde.
- URL pública devuelve contenido en HTTPS y muestra el diseño.
- Navegar Inicio / Servicios / Galería / Nosotras / Contacto.
- Revisar navegación en móvil y escritorio y menú hamburguesa.
- Abrir enlace Maps; comprobar que corresponde al salón.
- Probar el botón de WhatsApp desde teléfono real.
- Abrir `sitemap.xml` y `robots.txt` en la URL pública.
- Solicitar indexación de las URLs mediante Google Search Console.

Para dominios personalizados, actualizar generador de SEO y registrar el dominio en Pages con DNS y HTTPS.
