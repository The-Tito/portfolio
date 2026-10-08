# Antonio Selvas — Portafolio

Portafolio personal. Desarrollador backend con enfoque en IA aplicada.

## Stack

- [Next.js 16](https://nextjs.org) (App Router) · React 19 · TypeScript
- Tailwind CSS v4 con tokens de diseño en CSS variables (modo claro y oscuro)
- i18n nativo de Next (`app/[locale]` + `proxy.ts`): ES / EN según el idioma del navegador
- Tema claro/oscuro sin flash (script en línea) · Lenis (smooth scroll) · animaciones CSS ligadas al scroll (`animation-timeline`) con respaldo por IntersectionObserver

## Desarrollo

```bash
npm install
cp .env.example .env.local   # completar valores locales; nunca se suben al repo
npm run dev
```

| Script               | Descripción                                   |
| -------------------- | --------------------------------------------- |
| `npm run dev`        | Servidor de desarrollo                        |
| `npm run build`      | Build de producción                           |
| `npm run lint`       | ESLint                                        |
| `npm run typecheck`  | Verificación de tipos                         |
| `npm run format`     | Prettier                                      |
| `npm run i18n:check` | Verifica que ES y EN tengan las mismas claves |

## Estructura

```
src/
  app/[locale]/    rutas por idioma (layout, page, metadata)
  components/      layout/ · sections/ · ui/
  content/         datos tipados de proyectos y experiencia
  i18n/            idiomas soportados, diccionarios y messages/{es,en}.json
  lib/             utilidades
  styles/          globals.css (tokens, keyframes)
  proxy.ts         redirección por idioma
public/            imágenes optimizadas y CV
```

## Flujo de trabajo

Gitflow: `main` (producción) · `develop` (integración) · `feature/*` (una rama por fase) · `release/*`.
Commits con [Conventional Commits](https://www.conventionalcommits.org).

## Variables de entorno

Ver [`.env.example`](.env.example). Los secretos solo viven en `.env.local` y en las variables de entorno del proyecto en Vercel.
