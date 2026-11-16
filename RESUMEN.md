# Resumen del proyecto: Boda Mongalo-Anderson

Pega este archivo al inicio de una conversación nueva para continuar donde quedamos.

## Qué es

Página web de boda de una sola página, en español, hecha con **Angular 21** (componentes
standalone, signals, sin zone.js, sin SSR). Diseño inspirado en dos referencias:

- Portada con la foto de los novios frente a la iglesia (`catedral.jpg`), los nombres
  "JUSTIN & MELANIE" y las dos fechas ("US Wedding 02/27/2027" y "NIC Wedding 27/11/2027").
- Debajo, **dos cuentas regresivas**: US Wedding (Texas) y NIC Wedding (Nicaragua).
- Una sección verde "Reserva la fecha" con los nombres en cursiva, las dos fechas y el botón "Confirma antes del…".

Tipografías (Google Fonts): Cormorant Garamond (títulos), Pinyon Script (cursiva), Great Vibes
("Wedding" en los títulos de cada boda), Montserrat (texto). Paleta (la novia pidió "no negro, más verde,
verde crema ivory"): blanco, marfil, crema `#ece4d2`, verde oliva profundo `#3f4b35` para los fondos
oscuros, oliva `#5c6b4a` en botones, dorado `#b08d57` / `#c9a76a`.

Fechas: la de EE. UU. se escribe MM/DD/AAAA (02/27/2027) y la de Nicaragua DD/MM/AAAA (27/11/2027).

## Repositorio

- GitHub: `AngelGaleanoMendoza/boda-mongalo-anderson` (antes AngularExamples).
- Rama de trabajo y principal: **`main`**. `dev` tiene el proyecto viejo de Angular Examples.
- Publicada en **https://angelgaleanomendoza.github.io/boda-mongalo-anderson/** (se actualiza sola en cada push a main).
- También existe `claude/affectionate-ritchie-71zmtw`, con el mismo contenido que `main`.

## Estructura

```
src/app/wedding.config.ts   <- TODOS los datos de la boda (editar aquí)
src/app/app.ts / app.html   <- arma la página con las secciones en orden
src/app/sections/*          <- una carpeta por sección (ts + html + css):
  navbar, hero, countdown, welcome, save-the-date, story, schedule,
  venues (ubicación + código de vestimenta),
  gallery (cuadrícula + visor con flechas/Esc), gifts, rsvp, footer
src/app/shared/             <- reveal.directive (aparecer al hacer scroll),
                               format.ts (fechas: MM/DD/AAAA para EE. UU., DD/MM/AAAA para Nicaragua), icon.ts
src/styles.css              <- variables de color/tipografía, botones, utilidades
public/images/              <- fotos (de la carpeta de Drive "Boda Anderson-Mongalo")
  catedral.jpg (portada), hero.jpg (bienvenida), hero-movil.jpg (sin usar), atardecer.jpg, historia.jpg, og.jpg (imagen al compartir),
  gallery/01-24.jpg + gallery/thumbs/01-24.jpg
.github/workflows/deploy-pages.yml  <- publica en GitHub Pages en cada push a main
scripts/configurar.ps1 / .sh        <- configuración en la computadora local (ver abajo)
```

## Pendiente

### Configuración de GitHub: hecha (rama principal main, repo renombrado, Pages con GitHub Actions).

### Datos reales que faltan (en `src/app/wedding.config.ts`, marcados `POR CONFIRMAR`)

- Hora de cada boda: las dos están a las 4:00 p. m. de ejemplo (las fechas sí son reales:
  27 feb 2027 en Texas y 27 nov 2027 en Nicaragua).
- Fecha límite del RSVP: hoy es 27 de enero de 2027, inventada.
- Lugar y dirección de la ceremonia y de la recepción, con enlace de Google Maps.
- Horarios del itinerario (son de ejemplo).
- Texto de "Nuestra historia" (es de ejemplo).
- Datos para regalos (transferencia bancaria / mesa de regalos).
- RSVP: `rsvp.email` es `correo@ejemplo.com`; `rsvp.endpoint` está vacío.

### Formulario RSVP

Sin `endpoint`, el formulario muestra la respuesta lista para copiar y un botón que abre el
correo del invitado. Falta conectarlo a algo que guarde las respuestas, por ejemplo un Google
Apps Script que escriba en una hoja de cálculo, o Formspree. El componente ya hace `POST` JSON a
`rsvp.endpoint` con: `nombre, contacto, asistira, personas, alimentacion, mensaje`.

## Comandos

```bash
npm ci                              # instalar (usa el package-lock)
npm start                           # http://localhost:4200
npx ng test --watch=false           # 3 pruebas (Vitest)
npx ng build --base-href ./         # versión para publicar -> dist/boda-anderson-mongalo/browser
```

## Notas técnicas

- `--base-href ./` hace que la página funcione en cualquier subcarpeta (GitHub Pages).
- Las fechas se muestran siempre en hora de Nicaragua (`WEDDING.timeZone`).
- La galería asume 12 fotos verticales + 12 horizontales para llenar la cuadrícula de 4 columnas
  sin huecos. Si se cambian fotos, actualizar el set `portrait` en `wedding.config.ts`.
- Con npm 10 en una instalación nueva **sin** lockfile, `npm install` puede fallar con
  "Cannot read properties of null (reading 'edgesOut')"; con lockfile (`npm ci`) funciona.
- Hubo una vista previa privada en claude.ai (https://claude.ai/artifact/8huC8gAzqd7wr23Ndi3aLN)
  que no se actualiza sola con los cambios del repositorio.

## Carrusel y música (agregado después)

- **Carrusel en "Nuestra historia"** (`sections/story`): tira de fotos que se desliza sola,
  con el monograma de las iniciales encima. Las fotos y cuáles van en blanco y negro se
  eligen en `WEDDING.story.carousel` (números de `images/gallery/NN.jpg`).
- **Canción de fondo** (`sections/music`): al entrar aparece una portada con
  "Abrir invitación". Ese toque arranca la canción, porque los navegadores no dejan sonar
  una página sin que la persona toque algo. Luego queda un botón flotante para pausar o
  reanudar. Usa el reproductor oficial de Spotify (`WEDDING.music.spotifyTrackId`):
  - Con sesión de Spotify en el navegador se escucha completa.
  - Sin sesión, Spotify solo da 30 segundos de vista previa, que se repiten.
  - Si el navegador bloquea el arranque, se abre el reproductor para tocar ▶ ahí.

## Idioma

- La página está **toda en inglés**: textos, botones, avisos para lectores de pantalla y
  fechas (formato de EE. UU.: "January 27, 2027").
- Los comentarios del código siguen en español.
- Los enlaces internos también pasaron a inglés:
  `#home`, `#countdown`, `#story`, `#schedule`, `#location`, `#gallery`, `#gifts`, `#rsvp`.
- El formulario RSVP envía estos campos:
  `name, contact, attending, guests, dietary, message`.

## Contenido de Melanie, animación y música por YouTube (16 nov)

- Nuevas secciones con los textos de Melanie:
  - "Our Love Story — A Love Beyond Distance", con su frase.
  - "Two Countries, One Love Story", que explica por qué hay dos bodas.
  - "Wedding Details": el lugar y el código de vestimenta de cada boda.
  - "Travel & Accommodations": Nicaragua y Texas.
  - "Frequently Asked Questions": 14 preguntas.
  Todo el texto está en `wedding.config.ts`.
- La portada de entrada muestra la frase "Not even distance could separate what God had
  destined to unite."
- **Animación de entrada:** está hecha con Remotion, en la carpeta `video/`, y se ve al
  tocar "Open invitation":
  - Texas y Managua se unen con un arco dorado y un corazón.
  - Luego J y M se juntan y aparece la frase.
  - Hay dos versiones: `public/video/intro-landscape.mp4` y `public/video/intro-portrait.mp4`.
  - Para cambiarla: `cd video && npm install && npm run studio` (vista previa) y luego
    `npm run render`.
- **Canción:** "Just the Two of Us" (Grover Washington, Jr. feat. Bill Withers) suena
  completa con el reproductor de YouTube, video 6IO74QV6wHY.
  - El reproductor se ve en el panel ♫, porque YouTube pide que sea visible.
  - Si YouTube no permite insertar ese video, se usa Spotify de respaldo.

## Botón de idioma EN | ES (16 nov)

- El botón **EN | ES** está en el menú y en la portada de entrada. Cambia toda la página
  al instante y el navegador recuerda la elección. Por defecto la página abre en inglés.
- Archivos:
  - `src/app/i18n/ui.ts`: textos fijos (botones, títulos, avisos) en los dos idiomas.
  - `src/app/i18n/content-es.ts`: la versión en español de los textos de
    `wedding.config.ts`. **Si cambias un texto en inglés, cambia también su traducción.**
  - `src/app/i18n/i18n.ts`: el servicio que guarda el idioma elegido.
- En español la etiqueta de cada boda dice "Boda US" / "Boda NIC".
- La animación también tiene versión en español: `public/video/intro-*-es.mp4`.

## Canción de fondo desde archivo propio (16 nov)

- La música ya no usa YouTube ni Spotify. Suena el archivo `public/audio/just-the-two-of-us.mp3`:
  - Viene del MP3 que mandó Sebastián, recortado sin los silencios del inicio y del final y
    convertido a 128 kbps.
  - Arranca al tocar "Open invitation" y se repite sin parar.
  - El botón flotante de abajo a la derecha la pausa y la reanuda.
  - Si el navegador bloquea el arranque, el botón parpadea y aparece "Tap ▶ to play our song".
- Para cambiar la canción, reemplaza ese archivo o cambia `music.src` en `wedding.config.ts`.
