---
description: Visualizes how a file connects to the rest of the project — what it talks to, what talks to it, and why.
agent: sage
subtask: true
---

**IMPORTANT: You must respond entirely in the language specified by the `language` field in `sage.md`. If `language: es`, write everything in Spanish — section headers, content, observations, and closing. Do not use English regardless of the language this prompt is written in. Use Markdown headers (# , ## ) for each section title. This is mandatory for terminal rendering.**

Analyze the relationships of `$ARGUMENTS` with the rest of the project.
The goal is NOT a technical graph — it is a plain-language explanation of how information flows.

## Before responding

1. Check if `.opencode/sage/sources.json` exists. If it does, read it to understand the project's structure and locate documentation that may explain architectural decisions behind these connections.
2. Read the full file `$ARGUMENTS`.
3. Use **@explore** to map imports, exports, and cross-references — both outgoing (what this file imports) and incoming (who imports this file). Search broadly: grep for the filename, the main exports, and class/function names across the project.
4. If a relevant skill exists for the file's language or framework (per `sage.md` rules), load it before responding.

## Output format

Output must fit comfortably in a terminal. Follow the exact structure below.

### 1. Header and context

```
# Flow: <filename>
<one sentence: is this file at the center of the flow, at the edge, a shared utility, an entry point, a leaf node?>
```

### 2. Diagram

Draw an ASCII box representing the file. Show the most important inputs on the left and outputs on the right. Maximum 4 inputs and 4 outputs — prioritize the most significant ones.

Use this template strictly — do not improvise the box style:

```
                    ┌───────────────────────┐
  <input label> ──→ │                       │ ──→ <output label>
  <input label> ──→ │    <module name>      │ ──→ <output label>
  <input label> ──→ │                       │ ──→ <output label>
                    └───────────────────────┘
```

Rules for the diagram:

- The box width is fixed at 25 characters inside the borders.
- The module name goes centered in the middle row.
- Input labels go left-aligned, output labels go right of the box.
- Use short labels (max ~20 chars). If a label is too long, abbreviate.
- If there are fewer inputs than outputs (or vice versa), leave the corresponding side of that row empty.

### 3. Connection table

Below the diagram, show the full detail in a table. Two sections:

```
# Depends on →
| Module               | What it takes                     |
| <file/module name>   | <specific import or functionality> |

# Talked to by ←
| Module               | What it uses                      |
| <file/module name>   | <specific export or functionality> |
```

If no incoming references are detectable, replace the "Talked to by" table with:
_"No incoming references detected — this may be a leaf node or entry point."_

### 4. Data journey

```
# Data journey
<3-6 sentences. Where does the information come from? What does this file transform or decide? Where does the result go? Write for someone who has never seen the project — no variable names, just the concept of what happens.>
```

### 5. Observations (optional)

Only include this section if you detect something worth noting:

- Tight coupling (depends on internal details, not public API)
- Circular dependencies (A → B → A)
- Mixed responsibilities (file does two unrelated things)
- Dead connections (imports something but never uses it)
- God module (everything talks to this one file)

```
⚠ Note
<observation framed as educational context, not criticism>
```

If nothing notable is detected, omit this section entirely.

## Closing

End with a single line offering the natural next step, specific to what you found:

- If the file has interesting design patterns or history: _"Curious about why these connections are structured this way? Run `/why $ARGUMENTS`."_
- If a connected module looks complex: _"The dependency on `<module>` is heavy — want me to inspect it with `/exp-file @<path>`?"_
  If nothing notable suggests a follow-up, end without a question.
