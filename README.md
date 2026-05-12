```
███████╗ █████╗  ██████╗ ███████╗   █████╗ ██╗
██╔════╝██╔══██╗██╔════╝ ██╔════╝  ██╔══██╗██║
███████╗███████║██║  ███╗█████╗    ███████║██║
╚════██║██╔══██║██║   ██║██╔══╝    ██╔══██║██║
███████║██║  ██║╚██████╔╝███████╗  ██║  ██║██║
╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝  ╚═╝  ╚═╝╚═╝
```

> *First learn, then vibe~*

**Sage** is a code comprehension agent for [OpenCode](https://opencode.ai).  
It explains projects, files, and design decisions — without touching a single line of code.

---

## What Sage does

Most AI coding agents are built to *write*. Sage is built to *teach*.

Instead of generating code, Sage reads your project and explains it clearly —
the stack, the data flow, the design decisions, and the *why* behind them.
Useful when you inherit a codebase, onboard to a new project, or simply want to
understand before you act.

---

## Install

```bash
npx sage-ai
```

You'll be prompted to install globally (all projects) or locally (this project only):

```
  🏠  Local   · only this project  (.opencode/)
  🌍  Global  · all your projects  (~/.config/opencode/)
```

Sage downloads the latest version directly from GitHub. No config needed.

---

## Usage

Open OpenCode inside your project and switch to Sage with `Tab`.

```bash
opencode
# then press Tab until you see Sage in the status bar
```

### Commands

| Command | Description |
|---|---|
| `/exp` | Explain the current project — stack, purpose, inputs/outputs, main modules |
| `/exp-file @path` | Explain a specific file — what it does, its inputs/outputs, and a full dictionary of its elements |
| `/flow @path` | Visualize how a file connects to the rest of the project |
| `/why @path` | Archaeology of design decisions — why is the code built this way? |

---

## How it works

Sage is a **primary agent** in OpenCode with read-only permissions.  
It delegates exploration tasks to OpenCode's built-in subagents:

- **@explore** — navigates the file system and searches code
- **@scout** — researches external dependencies and library docs
- **@general** — runs `git log` and `git blame` for decision archaeology

It also detects and loads any **agent skills** installed in your project
(`.opencode/skills/`, `.agents/skills/`, `.claude/skills/`) to give
expert-level answers specific to your stack.

Sage **never writes, edits, or creates files**. If you want to act on what
you learned, switch back to the Build agent with `Tab`.

---

## Model

Sage inherits whatever model you have active in OpenCode.  
No model configured? Use `minimax/minimax-m1` — it's free and always available.

---

## Requirements

- [OpenCode](https://opencode.ai) installed
- Node.js ≥ 18

---

## License

MIT — by [m01x](https://github.com/m01x)