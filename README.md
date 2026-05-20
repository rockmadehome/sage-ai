<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./assets/sage-logo-dark.svg">
    <img alt="SAGE AI" src="./assets/sage-logo-light.svg" width="620">
  </picture>
</p>

<p align="center"><em>First learn, then vibe~</em></p>

<p align="center">
  <strong>Sage</strong> es un agente de comprensión de código para <a href="https://opencode.ai">OpenCode</a>.<br>
  Explica proyectos, archivos y decisiones de diseño — sin tocar una sola línea.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/sage-ai"><img src="https://img.shields.io/npm/v/sage-ai?color=0891B2&label=npm" alt="npm"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-A21CAF" alt="MIT License"></a>
  <img src="https://img.shields.io/badge/node-%E2%89%A518-22D3EE" alt="Node 18+">
</p>

---

> **Nota:** Sage está pensado para [OpenCode](https://opencode.ai). Si no usas OpenCode, esto no es para ti — todavía. Próximamente soportaremos otros agentes (ver [Roadmap](#roadmap)).

---

## ¿Qué hace Sage?

La mayoría de los agentes de IA están hechos para *escribir código*. Sage está hecho para *enseñarlo*.

En vez de generar código, Sage lee tu proyecto y te lo explica con claridad — el stack, el flujo de datos, las decisiones de diseño, y el *por qué* detrás de cada cosa. Útil cuando heredas un codebase, te incorporas a un proyecto nuevo, o simplemente quieres entender antes de actuar.

## Filosofía

> *La automatización nos abstrae del conocimiento real.*

Sage existe para que sigas aprendiendo desde tu propia consola. No reemplaza tu intuición — la entrena.

## Instalación

```bash
npx sage-ai
```

Se te preguntará si quieres instalar Sage globalmente (todos los proyectos) o localmente (solo este):

```
  🏠  Local   · solo este proyecto    (.opencode/)
  🌍  Global  · todos tus proyectos  (~/.config/opencode/)
```

Luego eliges el idioma por defecto para los reportes estructurados. Puedes seguir conversando con Sage en cualquier idioma; solo los reportes (`/exp`, `/exp-file`, `/flow`, `/why`, `/wish`) usan el idioma configurado.

Sage descarga la última versión directamente desde GitHub. Sin configuración adicional.

## Uso

Abre OpenCode dentro de tu proyecto y cambia a Sage con `Tab`.

```bash
opencode
# luego presiona Tab hasta ver Sage en la barra de estado
```

### Comandos

| Comando            | Descripción                                                                              |
| ------------------ | ---------------------------------------------------------------------------------------- |
| `/exp`             | Explica el proyecto — stack, propósito, inputs/outputs, módulos principales              |
| `/exp-file @path`  | Explica un archivo específico — qué hace, sus inputs/outputs y su diccionario interno    |
| `/flow @path`      | Visualiza cómo un archivo se conecta con el resto del proyecto                           |
| `/why @path`       | Arqueología de decisiones — ¿por qué el código está hecho así?                           |
| `/wish`            | Tu mentor guiado — planes de aprendizaje con memoria persistente                         |

## Cómo funciona

Sage es un **agente primario** de OpenCode con permisos de solo lectura. Delega tareas de exploración a los subagentes integrados:

- **@explore** — navega el sistema de archivos y busca en el código
- **@scout** — investiga dependencias externas y documentación de librerías
- **@general** — ejecuta `git log` y `git blame` para la arqueología de decisiones

También detecta y carga cualquier **skill** instalada en tu proyecto (`.opencode/skills/`, `.agents/skills/`, `.claude/skills/`) para darte respuestas específicas a tu stack.

Sage **nunca escribe, edita ni crea archivos** en tu código. La única excepción es su propia memoria en `.opencode/sage/`, donde guarda un índice de fuentes de verdad (`sources.json`) y la bitácora de wishes. Para actuar sobre lo que aprendiste, vuelve al agente Build con `Tab`.

### Archivos ignorados

`.env`, `.env.*`, `node_modules/`, `.git/`, `dist/`, `build/`, `coverage/` y cualquier archivo con credenciales.

## Modelo

Sage hereda el modelo que tengas activo en OpenCode.
¿No tienes uno configurado? Usa `minimax/minimax-m1` — es gratuito y siempre está disponible. Para reportes más detallados (`/exp`, `/wish` en modo senior), conviene un modelo más capaz dentro de los disponibles en OpenCode.

## Requisitos

- [OpenCode](https://opencode.ai) instalado
- Node.js ≥ 18

## Roadmap

Sage v0.1 es solo el comienzo. En el horizonte:

- Soporte para [Claude Code](https://claude.com/claude-code) y otros agentes
- Skills nativas para Python, Go y Rust
- Servidor MCP propio para detección de archivos más confiable
- Modo offline con modelos locales

¿Tienes sugerencias? [Abre un issue](https://github.com/m01x/sage-ai/issues).

## Licencia

MIT — por [m01x](https://github.com/m01x)
