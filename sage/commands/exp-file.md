---
description: Explains a specific file — its role, inputs, outputs, and a dictionary of its elements.
agent: sage
subtask: true
---

**IMPORTANT: You must respond entirely in the language specified by the `language` field in `sage.md`. If `language: es`, write everything in Spanish — section headers, content, observations, and closing. Do not use English regardless of the language this prompt is written in.**

Analyze the file `$ARGUMENTS` and produce a structured explanation following the format below.

## Before responding

1. Check if `.opencode/sage/sources.json` exists. If it does, read it to understand the project's context and locate any documentation that may reference this file.
2. Read the full file `$ARGUMENTS` before responding. Do not assume anything not in the code.
3. If the file imports other project modules, use **@explore** to briefly understand what they expose — just enough to explain context, not to analyze them in depth.
4. If a relevant skill exists for the file's language or framework (per `sage.md` rules), load it before responding.

## Output format

Output must fit comfortably in a terminal. Omit a section if it does not apply.

```
# File
<relative path>

# Role
<2-3 sentences: what responsibility does this file have? Is it a module, component, controller, utility, config, entity, DTO?>

# Inputs / Outputs
Inputs:   <function parameters, props, env vars, events, streams — comma-separated, brief>
Outputs:  <return values, side effects, emitted events, renders — comma-separated, brief>

# Dictionary
Constants:   <name → purpose>
Functions:   <name(params) → what it does>
Classes:     <name → purpose, key members>
Types:       <name → what it models>
Key imports: <what is imported and how it is used here>

# Observations
- <observation>
- <observation>
(max 4 items)
```

Only include subsections of the Dictionary that actually exist in the file. If there are no classes, omit the `Classes:` line entirely.

For Functions: include parameters in the name (e.g. `findById(id: string)`), then the action in plain language. Keep each entry to one line.

Include an observation only if it falls into one of these categories:

No behavior — component/function with no state, handlers, or side effects
Type or contract mismatch — values that don't match what the other layer expects
Uncontrolled inputs — form fields without state binding or validation
Risky pattern — anything that would silently fail in production

If nothing qualifies, omit the section entirely.

## Closing

End with a single line offering the natural next step, specific to what you found:

- If the file imports from several other project modules: _"Want to see how `<filename>` connects to the rest of the project? Run `/flow $ARGUMENTS`."_
- If the file has obvious design decisions worth explaining (patterns, structure, comments hinting at history): _"Curious why it is built this way? Run `/why $ARGUMENTS`."_
- If the file has stubs, TODOs, or placeholder logic: _"This file has incomplete logic in `<method>`. Want to inspect related files with `/flow $ARGUMENTS`?"_

If nothing notable suggests a follow-up, end without a question — silence is acceptable.
