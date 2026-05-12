#!/usr/bin/env node
import { createInterface } from "readline";
import { mkdirSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { homedir } from "os";
import kleur from "kleur";
import figlet from "figlet";
import { select } from "@inquirer/prompts";

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

async function fetchFile(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${url} (${res.status})`);
    return res.text();
}

function writeFile(filePath, content) {
    const dir = dirname(filePath);
    mkdirSync(dir, { recursive: true });
    writeFileSync(filePath, content, "utf8");
}

function printBanner() {
    const sage = figlet.textSync("Sage", { font: "ANSI Shadow" });
    const ai = figlet.textSync("AI", { font: "ANSI Shadow" });

    const sageLines = sage.split("\n");
    const aiLines = ai.split("\n");
    const maxLen = Math.max(...sageLines.map(l => l.length));

    const merged = sageLines.map((line, i) =>
        kleur.cyan().bold(line.padEnd(maxLen)) + "  " + kleur.magenta().bold(aiLines[i] ?? "")
    );

    console.log("");
    merged.forEach(line => console.log(line));
    console.log("");
    console.log(kleur.gray("  First learn, then ") + kleur.magenta("v") + kleur.green("i") + kleur.yellow("b") + kleur.blue("e") + kleur.red("~"));
    console.log(kleur.gray("  ─────────────────────────────────────────────────"));
    console.log(kleur.magenta("  Your Scholar for OpenCode~"));
    console.log("");
    console.log(kleur.gray("                              ~ by ") + kleur.magenta().bold("m01x"));
    console.log("");
}

function printStep(label) {
    console.log(kleur.gray(`\n  ${label}`));
}

function printFileStatus(dest, ok, reason) {
    if (ok) {
        console.log(kleur.green(`  ✓ ${dest}`));
    } else {
        console.log(kleur.red(`  ✗ ${dest}`) + kleur.gray(` — ${reason}`));
    }
}

// ─── main ───────────────────────────────────────────────────────────────────

printBanner();

process.on("uncaughtException", (err) => {
    if (err.name === "ExitPromptError") {
        console.log(kleur.gray("\n  Cancelled. See you later~\n"));
        process.exit(0);
    }
    throw err;
});

const choice = await select({
    message: kleur.white("  Where do you want to install Sage?"),
    choices: [
        {
            name: kleur.cyan().bold("🏠  Local") + kleur.gray("   · only this project  (.opencode/)"),
            value: "local",
            short: "Local",
        },
        {
            name: kleur.magenta().bold("🌍  Global") + kleur.gray("  · all your projects  (~/.config/opencode/)"),
            value: "global",
            short: "Global",
        },
    ],
    theme: {
        prefix: "",
        style: {
            highlight: (text) => kleur.cyan(text),
            selectedChoice: (text) => kleur.cyan().bold(text),
        },
    },
});

const isGlobal = choice === "global";

const baseDir = isGlobal
    ? join(homedir(), ".config", "opencode")
    : join(process.cwd(), ".opencode");

console.log("");
console.log(
    kleur.gray("  Destination: ") +
    (isGlobal ? kleur.magenta(baseDir) : kleur.cyan(baseDir))
);

printStep("Fetching latest version from GitHub...\n");

const failed = [];

for (const file of FILES) {
    const url = `${BASE_URL}/${file.src}`;
    const destPath = join(baseDir, file.dest);

    try {
        const content = await fetchFile(url);
        writeFile(destPath, content);
        printFileStatus(file.dest, true);
    } catch (err) {
        printFileStatus(file.dest, false, err.message);
        failed.push({ file: file.dest, reason: err.message });
    }
}

console.log("");

if (failed.length > 0) {
    console.log(kleur.yellow("  Some files could not be downloaded."));
    console.log(kleur.gray(`  Visit: https://github.com/${REPO}\n`));
    process.exit(1);
}

console.log(kleur.green().bold("  ✦ Sage installed successfully!"));
console.log("");

if (isGlobal) {
    console.log(kleur.gray("  Available in") + kleur.white(" every project") + kleur.gray("."));
} else {
    console.log(kleur.gray("  Available in") + kleur.white(" this project") + kleur.gray("."));
}

console.log(
    kleur.gray("  Switch to Sage with ") +
    kleur.cyan("Tab") +
    kleur.gray(" inside OpenCode.")
);

console.log("");
console.log(kleur.gray("  ─────────────────────────────────────────────────"));
console.log(kleur.gray("  Commands:"));
console.log("");
console.log(kleur.cyan("  /exp       ") + kleur.white("  explain the project"));
console.log(kleur.cyan("  /exp-file  ") + kleur.white("  explain a specific file"));
console.log(kleur.cyan("  /flow      ") + kleur.white("  visualize module relationships"));
console.log(kleur.cyan("  /why       ") + kleur.white("  archaeology of design decisions"));
console.log("");
console.log(kleur.gray("  ─────────────────────────────────────────────────"));
console.log(kleur.magenta("  Your Scholar for OpenCode~"));
console.log("");