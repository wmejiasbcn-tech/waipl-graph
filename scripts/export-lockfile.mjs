import { copyFileSync, mkdirSync } from "node:fs";

mkdirSync("public", { recursive: true });
copyFileSync("package-lock.json", "public/lock-export.json");
