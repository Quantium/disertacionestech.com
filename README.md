# Disertaciones Tecnológicas

🎙️ **Un análisis profundo sobre cómo la tecnología moldea nuestro presente y futuro. Conversaciones que van más allá del código.**

[![Website](https://img.shields.io/badge/Website-disertacionestecnologicas.com-blue)](https://www.disertacionestecnologicas.com/)
[![Spotify](https://img.shields.io/badge/Spotify-Listen-green)](https://open.spotify.com/show/7F1w1lRwF8Og2IAUVxC9DX)
[![Apple Podcasts](https://img.shields.io/badge/Apple_Podcasts-Listen-black)](https://podcasts.apple.com/us/podcast/disertaciones-tecnol%C3%B3gicas/id1794910022)

## Sobre el Podcast

**Disertaciones Tecnológicas** es un espacio para explorar el lado humano, técnico y estratégico de la tecnología. En cada episodio, conversamos sobre temas que realmente importan para quienes construyen el futuro digital.

### Temas que exploramos

- 🚀 **Liderazgo Técnico**: Cómo liderar equipos de tecnología de manera efectiva
- 🧠 **Sistemas Complejos**: Arquitectura, escalabilidad y diseño de sistemas
- 🤖 **Machine Learning e IA**: Aplicaciones prácticas y reflexiones sobre el futuro
- 🏢 **Diseño Organizacional**: Cómo estructurar equipos y organizaciones tecnológicas
- 💡 **Innovación**: Estrategias para impulsar la innovación en tu organización

### El Host

**Andy Aragon** - Consultor en innovación y tecnología, con más de una década como CTO en startups, banca y logística. Experiencia práctica en construir y liderar equipos técnicos de alto rendimiento.

## Escucha el Podcast

Puedes escuchar **Disertaciones Tecnológicas** en las siguientes plataformas:

- 🍎 [Apple Podcasts](https://podcasts.apple.com/us/podcast/disertaciones-tecnol%C3%B3gicas/id1794910022)
- 🎵 [Spotify](https://open.spotify.com/show/7F1w1lRwF8Og2IAUVxC9DX)
- 📡 [RSS Feed](https://anchor.fm/s/f018bdd4/podcast/rss)

Visita nuestro sitio web: **[www.disertacionestecnologicas.com](https://www.disertacionestecnologicas.com/)**

## Desarrollo Local

Este proyecto utiliza HTML estático con Tailwind CSS. Para desarrollo local:

### Requisitos

- Node.js y npm instalados ([descargar aquí](https://nodejs.org/en/download/package-manager/))

### Instalación

```bash
# Instalar dependencias
npm install

# Compilar CSS
npm run build

# Modo desarrollo (recompila CSS automáticamente)
npm run dev
```

## Despliegue

Este sitio web está configurado para desplegarse automáticamente a AWS S3 usando GitHub Actions. Cada vez que se hace push a la rama `main` o `master`, el sitio se actualiza automáticamente.

### Configuración de GitHub Secrets

Para que el despliegue automático funcione, configura los siguientes secrets en GitHub:

1. Ve a **Settings** → **Secrets and variables** → **Actions** en tu repositorio
2. Agrega los siguientes secrets:

   - `AWS_ACCESS_KEY_ID`: Tu Access Key ID de AWS
   - `AWS_SECRET_ACCESS_KEY`: Tu Secret Access Key de AWS
   - `AWS_S3_BUCKET`: El nombre de tu bucket S3
   - `AWS_REGION`: La región de tu bucket S3 (opcional, por defecto `us-east-1`)

### Configuración del Bucket S3

Asegúrate de que tu bucket S3 tenga:

- **Static website hosting** habilitado con `index.html` como documento índice
- **Permisos públicos** para lectura de archivos estáticos
- **CORS** configurado según tus necesidades

El workflow de despliegue está en `.github/workflows/deploy.yml` y optimiza automáticamente los headers de cache para diferentes tipos de archivos.

---

## Contribuir

¿Tienes sugerencias o quieres colaborar? ¡Estamos abiertos a contribuciones! Puedes abrir un issue o enviar un pull request.

## Licencia

Este proyecto es propiedad de Disertaciones Tecnológicas.
