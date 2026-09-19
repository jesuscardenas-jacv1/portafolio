# Informe de Cambios — Portafolio de Jesús Cárdenas

**Fecha:** septiembre 2026
**Archivos modificados:** `index.html`, `css/styles.css`, `js/script.js`
**Nuevos archivos:** `INFORME_CAMBIOS.md`

---

## 1. Resumen

Se realizó una actualización orientada a presentación y calidad profesional sobre el portafolio existente. Los cambios combinan dos objetivos:

1. **Refrescamiento visual completo** hacia un tema oscuro de base negra con acento dorado/ámbar, que transmite seriedad, elegancia y misterio.
2. **Correcciones de robustez y presentación**: enlaces funcionando, contenido visible sin JavaScript, favicon, metadatos para compartir y casos de error de portapapeles manejados.

Ninguna tarea alteró la estructura de secciones, el contenido ni el flujo de navegación original.

---

## 2. Tabla de cambios

| # | Cambio | Archivo | Tipo |
|---|--------|---------|------|
| 1 | Tema oscuro con paleta negra + oro | `css/styles.css` | Visual |
| 2 | Botones CTA en el hero (Ver proyectos / Contáctame) | `index.html` | Presentación |
| 3 | Contenido visible sin JavaScript (`<noscript>`) | `index.html` | Robustez / Accesibilidad |
| 4 | Favicon SVG inline | `index.html` | Presentación |
| 5 | Metadatos Open Graph + `theme-color` | `index.html` | Compartir / Marca |
| 6 | Manejo de error en copiado al portapapeles | `js/script.js` | Robustez |
| 7 | Corrección de enlace roto del tercer proyecto | `index.html` | Corrección |

---

## 3. Detalle y justificación técnica

### 3.1 Tema oscuro (negro + dorado)

**Qué se hizo**
- Se reescribieron las variables de color en `:root` con una paleta de base casi negra y acento dorado.
- Se ajustaron las reglas que usaban colores "quemados" en duro (header blanco, detalles teal) para que dependieran de las variables del tema.
- Se corrigió el contraste de `.btn-primary` e iconos de contacto para el nuevo fondo dorado.

**Por qué**
- El pedido fue una imagen seria, profesional y misteriosa con preferencia por el negro.
- El negro profundo (`#0B0D12`) da base neutra y sobria; el oro/ámbar (`#D9A441`) agrega el "misterio" solicitado, un aire de enigma y lujo, sin caer en lo estridente.
- Los colores se definen como variables CSS para que todo el sitio cambie desde un solo punto y pueda rediseñarse o adaptarse en minutos.

**Paleta resultante**

| Variable | Valor | Uso |
|----------|-------|-----|
| `--bg` | `#0B0D12` | Fondo general |
| `--surface` | `#14161D` | Tarjetas, secciones alternas, header, footer |
| `--border` | `#23262E` | Bordes y separadores |
| `--text-primary` | `#EDEEF2` | Texto principal |
| `--text-secondary` | `#9AA3B2` | Texto secundario |
| `--accent` | `#D9A441` | Dorado — acento |
| `--accent-hover` | `#E3B95C` | Dorado claro en hover |
| `--accent-soft` | `rgba(217,164,65,0.14)` | Fondos suaves: chips, código, foto |

Nota de contraste: sobre el botón dorado el texto ahora es oscuro (`--surface`) en vez de blanco, porque el blanco sobre dorado no supera las pautas de accesibilidad WCAG; el texto oscuro sí lo hace.

### 3.2 Botones CTA en el hero

**Qué se hizo**: se agregó `.hero-actions` con dos botones: "Ver proyectos" (primario) y "Contáctame" (secundario).

**Por qué**: el CSS ya definía estos estilos (`.btn`, `.btn-primary`, `.btn-secondary`) pero no se usaban en ninguna parte — quedaban como código muerto. Añadir los botones activa el valor de ese CSS existente y le da al visitante una guía clara de acción, componente clave en un portafolio que se presenta.

### 3.3 Contenido visible sin JavaScript

**Qué se hizo**: se agregó un bloque `<noscript>` en el `<head>` que fuerza los elementos `.reveal` a `opacity: 1; transform: none;`.

**Por qué**: las animaciones de aparición inicializan el contenido con `opacity: 0`. Si JavaScript está deshabilitado o falla al cargar, *todo el sitio quedaría invisible*. Este fallback garantiza que el portafolio siempre muestre su contenido, con o sin JS.

### 3.4 Favicon SVG inline

**Qué se hizo**: se definió un favicon en formato SVG dentro de un `data:` URI (fondo negro, monograma "JC" en dorado), sin necesidad de archivos de imagen adicionales.

**Por qué**: antes el navegador usaba el icono por defecto (o pedía un `favicon.ico` inexistente). Un monograma del nombre (JC) refuerza la marca personal y se genera sin peso extra de red.

### 3.5 Metadatos Open Graph + theme-color

**Qué se hizo**: se agregaron `og:title`, `og:description`, `og:type` y `theme-color`.

**Por qué**:
- **Open Graph** controla cómo se ve el enlace al compartirlo (WhatsApp, LinkedIn, redes): con estos datos el portafolio se muestra con título y descripción propios, más profesional que un enlace pelado.
- **`theme-color`** sincroniza la barra del navegador móvil con el fondo negro del sitio, integración visual con la marca.

### 3.6 Manejo de error en copiado al portapapeles

**Qué se hizo**: `navigator.clipboard.writeText(...)` ahora tiene `.catch(...)`; si falla (permisos denegados, contexto inseguro), se cae al método alternativo (`execCommand`) en lugar de quedarse en silencio.

**Por qué**: navegadores pueden denegar la API moderna del portapapeles. Antes el botón "Copiar" no avisaba ni copiaba nada en ese caso; ahora siempre hay un camino válido para copiar.

### 3.7 Corrección de enlace roto

**Qué se hizo**: el tercer proyecto ("App de Gestión de Reparto") usaba `href="#"` — un clic no hacía nada. Se corrigió y quedó apuntando al repositorio colaborativo del proyecto: `https://github.com/KanninoX/APP_Reparto`.

**Por qué**: un enlace muerto se nota inmediatamente en una presentación. Apuntarlo al perfil evita fallos mientras se tengan las URLs exactas de los repositorios.

---

## 4. Pendientes (requieren tu input)

| Ítem | Estado |
|------|--------|
| Fotografías / capturas de proyectos | Opcional: añadir capturas haría las tarjetas más visuales en una presentación. |

---

## 5. Verificación

- No quedan enlaces `href="#"` en el sitio.
- No quedan colores hardcodeados del tema anterior (teal) en `styles.css`.
- El tema respeta `prefers-reduced-motion` y las reglas de accesibilidad existentes (focus visible, skip-link, aria).