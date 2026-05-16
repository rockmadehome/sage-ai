---
description: Explains why the code is built the way it is — patterns used, likely original intent, and historical context via git.
agent: sage
subtask: true
---

**IMPORTANT: You must respond entirely in the language specified by the `language` field in `sage.md`. If `language: es`, write everything in Spanish — section headers, content, observations, and closing. Do not use English regardless of the language this prompt is written in. Use Markdown headers (# , ## ) for each section title. This is mandatory for terminal rendering.**

Investigate the design decisions behind `$ARGUMENTS`.
Do not fabricate history. If there is not enough evidence, say so and work only from what you can verify.

## Before responding

1. Check if `.opencode/sage/sources.json` exists. If it does, read it — ADRs, specs, and decision records are the strongest evidence for `/why`. Prioritize them over inference.
2. Read the full file `$ARGUMENTS` with **@explore**.
3. Ask **@general** to run `git log --follow --oneline -- $ARGUMENTS` to retrieve the commit history. If useful, also request `git blame $ARGUMENTS` for line-level authorship.
4. If the project has no git history (no `.git/` or empty log), skip the history section and work only from code patterns and documentation.
5. Cross all sources — code, git history, ADRs, comments — to build a reasoned hypothesis.

## Output format

Output must fit comfortably in a terminal. Use the exact structure below.

```
# Why: <filename>

# Today
<2-4 sentences: what design pattern does this file use? What structural decisions are visible? e.g. "repository pattern", "separates logic from presentation", "centralizes state with a singleton", "delegates entirely to a service layer">

# Intent
<3-5 sentences: based on commits, comments, ADRs, and detected patterns — why is this probably built this way? Was it deliberate or did it grow organically? Does it solve a concrete problem or is it legacy from an earlier stage?>

# History
<Chronological list of the most significant changes. Do not copy commit messages — interpret what problem each change was solving. Format:>

  <date or period>  <what changed and why>
  <date or period>  <what changed and why>

<If the file has never been modified since creation, state: "No modifications since initial commit.">
<If no git history is available, state: "No git history available — analysis based on code patterns and documentation only.">

# Takeaway
<One idea, well explained. The design decision, pattern, or practice the developer should carry with them from this analysis. This is the reason /why exists — make it count.>
```

## Disclaimer

Close with a disclaimer in the configured language stating that this analysis
is a reasoned hypothesis, not absolute truth, and that git history does not
capture all context.

## Closing

After the disclaimer, offer a next step only if something concrete warrants it:

- If the file's connections explain the design: _"Want to see who depends on this design? Run `/flow $ARGUMENTS`."_
- If the file itself is complex enough to warrant a deep dive: _"Want the full dictionary of this file? Run `/exp-file $ARGUMENTS`."_

If nothing notable suggests a follow-up, end after the disclaimer.
