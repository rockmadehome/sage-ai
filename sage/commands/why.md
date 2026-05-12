---
description: Explains why the code is built the way it is — patterns used, likely original intent, and historical context via git.
agent: sage
subtask: true
---

Investigate the design decisions behind `$ARGUMENTS`.
Ask @general to run `git log --follow -p -- $ARGUMENTS` and `git blame $ARGUMENTS` to retrieve the history.
Also read the full file with @explore. Cross both sources to build a reasoned hypothesis.

Do not fabricate history. If there is not enough evidence, say so and work only from the current code patterns.

---

## The code today

Briefly describe the current state of the file: what design pattern does it use? What structural decisions are visible?
(e.g. "uses the repository pattern", "separates logic from presentation", "centralizes state with a singleton")

## Why it is probably this way

Based on the commit history, code comments, and detected patterns, propose a hypothesis about the original intent.

Answer implicitly: was it a deliberate decision or did it grow organically? Does it solve a concrete problem or is it legacy from an earlier stage of the project?

## What the history reveals

If there are relevant commits, mention the most significant changes in chronological order — do not copy commit messages literally, interpret what problem each one was solving.
If the file has never been modified since creation, state it.

## What to take away

The most important closing of this command: what design decision, pattern, or practice can the developer carry with them as a learning from this analysis?
One idea, well explained. This is the reason `/why` exists.

---

⚠ Reminder: this is a reasoned hypothesis, not absolute truth. The git history does not capture all context.
