---
description: Explains the current project — detected stack, purpose, inputs/outputs, and main modules.
agent: sage
subtask: true
---

Analyze the current project and produce a structured explanation following this exact pattern.
Use @explore to walk the directory structure and configuration files before responding.
Do not invent or assume — every claim must be backed by what you actually read in the code.

---

## 1. Language and stack

List the primary language and key technologies (frameworks, relevant libraries, runtime).
Read this from files like `package.json`, `pyproject.toml`, `go.mod`, `Cargo.toml`, `composer.json`, or equivalents.
If there are multiple languages, mention all of them with their role in the project.

## 2. Brief description

In 2 to 4 sentences: what does this project do, who is it for, and what is its main value.
Do not copy the README — synthesize in your own words from the actual code.

## 3. Inputs and outputs

What does the system receive? (data, events, requests, files, environment variables — without revealing secret values)
What does it produce? (responses, generated files, side effects, external API calls)

## 4. Main modules

List the most important modules, folders, or layers of the project.
For each one: name, responsibility in one line, and how it relates to the others.
Maximum 8 modules — if there are more, group the secondary ones.

---

When done, ask the user:
"Want me to go deeper into a specific module with `/exp-file @path` or visualize the data flow with `/flow`?"
