# Podcast HTML

HTML landing page template designed by Cruip.

This HTML template is shipped with the (Tailwind CLI tool)[https://tailwindcss.com/docs/installation].

* [Getting started](#getting-started)
* [Deployment](#deployment)

## Getting started

* First, ensure that node.js & npm are both installed. If not, choose your OS and installation method from [this page](https://nodejs.org/en/download/package-manager/) and follow the instructions.
* Next, use your command line to enter your project directory.
* This template comes with a ready-to-use package file called `package.json`. You just need to run `npm install` to install all of the dependencies into your project.
* When `npm` has finished with the install, run `npm run build` to recompile the `style.css` file in the root directory.

You're ready to go! The most useful task for rapid development is `npm run dev`, which rebuild the CSS every time you make a change in the HML or JS files.

## Deployment

Este proyecto está configurado para desplegarse automáticamente a AWS S3 usando GitHub Actions cuando se hace push a la rama `main` o `master`.

### Configuración de GitHub Secrets

Para que el despliegue funcione, necesitas configurar los siguientes secrets en tu repositorio de GitHub:

1. Ve a **Settings** → **Secrets and variables** → **Actions** en tu repositorio de GitHub
2. Agrega los siguientes secrets:

   - `AWS_ACCESS_KEY_ID`: Tu Access Key ID de AWS
   - `AWS_SECRET_ACCESS_KEY`: Tu Secret Access Key de AWS
   - `AWS_S3_BUCKET`: El nombre de tu bucket S3 (ej: `mi-sitio-web`)
   - `AWS_REGION`: La región de tu bucket S3 (opcional, por defecto `us-east-1`)

### Configuración del Bucket S3

Asegúrate de que tu bucket S3 tenga:

1. **Static website hosting** habilitado:
   - Ve a las propiedades del bucket → **Static website hosting**
   - Habilita el hosting estático
   - Configura `index.html` como documento índice

2. **Permisos públicos** para lectura:
   - Ve a **Permissions** → **Bucket policy**
   - Agrega una política que permita lectura pública de los archivos

3. **CORS** configurado (si es necesario):
   - Ve a **Permissions** → **Cross-origin resource sharing (CORS)**
   - Configura según tus necesidades

### Despliegue Automático

Una vez configurados los secrets, cada vez que hagas push a la rama `main` o `master`, GitHub Actions:

1. Sincronizará todos los archivos estáticos al bucket S3
2. Configurará headers apropiados para cada tipo de archivo:
   - HTML: Sin cache para permitir actualizaciones inmediatas
   - CSS, JS, imágenes, fuentes: Cache largo (1 año) para optimización
   - JSON (data): Cache corto (1 hora) para permitir actualizaciones frecuentes

El workflow está ubicado en `.github/workflows/deploy.yml`.
