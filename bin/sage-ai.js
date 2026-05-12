#!/usr/bin/env node
import { createInterface } from "readline";
import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import { homedir } from "os";
import kleur from "kleur";

const REPO = "m01x/sage-ai";
const BRANCH = "main";
const BASE_URL = `https://raw.githubusercontent.com/${REPO}/${BRANCH}`;

const FILES = [
    { src: "sage/sage.md", dest: "agents/sage.md" },
    { src: "sage/commands/exp.md", dest: "commands/exp.md" },
    { src: "sage/commands/exp-file.md", dest: "commands/exp-file.md" },
    { src: "sage/commands/flow.md", dest: "commands/flow.md" },
    { src: "sage/commands/why.md", dest: "commands/why.md" },
];

// ─── helpers ────────────────────────────────────────────────────────────────

function ask(question) {
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            rl.close();
            resolve(answer.trim().toLowerCase());
        });
    });
}

async function fetchFile(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${url} (${res.status})`);
    return res.text();
}

function writeFile(filePath, content) {
    const dir = filePath.substring(0, filePath.lastIndexOf("/"));
    if (dir) mkdirSync(dir, { recursive: true });
    writeFileSync(filePath, content, "utf8");
}

// ─── main ───────────────────────────────────────────────────────────────────

console.log("");
console.log(kleur.cyan().bold("  sage-ai"));
console.log(kleur.gray("  Your Scholar for OpenCode\n"));

const answer = await ask(
    kleur.white("  Install Sage ") +
    kleur.gray("[g]") + kleur.white("lobally or in ") +
    kleur.gray("[p]") + kleur.white("roject? (g/p): ")
);

if (!["g", "p"].includes(answer)) {
    console.log(kleur.red("\n  Invalid option. Run sage-ai again and choose g or p.\n"));
    process.exit(1);
}

const isGlobal = answer === "g";

const baseDir = isGlobal
    ? join(homedir(), ".config", "opencode")
    : join(process.cwd(), ".opencode");

console.log("");
console.log(kleur.gray(`  Destination: ${baseDir}\n`));
console.log(kleur.gray("  Fetching latest version from GitHub..."));

let failed = [];

for (const file of FILES) {
    const url = `${BASE_URL}/${file.src}`;
    const destPath = join(baseDir, file.dest);

    process.stdout.write(kleur.gray(`  • ${file.dest} ... `));

    try {
        const content = await fetchFile(url);
        writeFile(destPath, content);
        console.log(kleur.green("done"));
    } catch (err) {
        console.log(kleur.red("failed"));
        failed.push({ file: file.dest, reason: err.message });
    }
}

console.log("");

if (failed.length > 0) {
    console.log(kleur.yellow("  Some files could not be downloaded:"));
    for (const f of failed) {
        console.log(kleur.yellow(`  • ${f.file}: ${f.reason}`));
    }
    console.log(kleur.gray(`\n  Check your connection or visit: https://github.com/${REPO}\n`));
    process.exit(1);
}

console.log(kleur.green().bold("  Sage installed successfully!\n"));

if (isGlobal) {
    console.log(kleur.white("  Available in every project. Switch to Sage with") + kleur.cyan(" Tab") + kleur.white(" inside OpenCode."));
} else {
    console.log(kleur.white("  Available in this project. Switch to Sage with") + kleur.cyan(" Tab") + kleur.white(" inside OpenCode."));
}

console.log("");
console.log(kleur.gray("  Commands:"));
console.log(kleur.gray("  /exp          — explain the project"));
console.log(kleur.gray("  /exp-file     — explain a specific file"));
console.log(kleur.gray("  /flow         — visualize module relationships"));
console.log(kleur.gray("  /why          — archaeology of design decisions"));
console.log("");