---
description: Visualizes how a file connects to the rest of the project — what it talks to, what talks to it, and why.
agent: sage
subtask: true
---

Analyze the relationships of `$ARGUMENTS` with the rest of the project.
Use @explore to map imports, exports, and cross-references.
The goal is NOT a technical graph — it is a plain-language explanation of how information flows.

---

## This file in context

One sentence situating the file: is it at the center of the flow, at the edge, a shared utility, an entry point?

## Who it talks to

List the files or modules this file has a direct relationship with, in two groups:

**Depends on →** (what this file imports or consumes)
For each: module name and what specifically it takes from it.

**Talked to by →** (who imports or calls this file)
For each: module name and what specifically it uses from it.
If no incoming references are detectable, state it explicitly.

## The flow in plain words

In 3 to 6 sentences, describe the journey of data or events through this file:
Where does the information come from? What does this file transform or decide? Where does the result go?

Write it as you would explain it to someone who has never seen the project — no variable names, just the concept of what happens.

## Observations

If you detect tight coupling, circular dependencies, mixed responsibilities, or other situations worth understanding, mention them here under "⚠ Note" — as educational context, not as criticism.
