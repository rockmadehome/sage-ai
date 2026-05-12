---
description: Explains a specific file — what it does, what it receives, what it returns, and a dictionary of its elements.
agent: sage
subtask: true
---

Analyze the file `$ARGUMENTS` and produce a structured explanation following this exact pattern.
Read the full file before responding. Do not assume anything that is not in the code.
If the file imports other project modules, use @explore to understand its context.

---

## 1. Brief description

In 2 to 3 sentences: what responsibility does this file have within the project?
Is it a logic module, a UI component, a controller, a utility, a configuration file?

## 2. Inputs and outputs

**Inputs:** What does it receive? (function parameters, props, environment variables, events, streams)
**Outputs:** What does it return or produce? (return values, side effects, emitted events, renders)

## 3. Dictionary

List all relevant elements of the file organized by type:

**Constants and global variables** — name, inferred type, purpose.
**Functions and methods** — name, parameters, what it does, what it returns.
**Classes or types** — name, purpose, main properties.
**Key imports** — what is imported and how it is used in this file.

Only include sections that apply. If the file has no classes, omit that section.

---

When done, ask the user:
"Want to visualize how this file connects to the rest of the project? I can run `/flow $ARGUMENTS`."
