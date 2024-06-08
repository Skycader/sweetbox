const readline = require("readline-sync");
const init = require("./replace.js");

console.log("🏗️ initializing project");
const projectName = readline.question("📝 Project name: ");
const appName = readline.question("📝 App name: ");
const projectManufacturer = readline.question("📝 Manufacturer name: ");

init(/project-name/g, projectName, "package.json");
init(/app-name/g, appName, "index.html");
init(/project-manufacturer/g, projectManufacturer, "src/config/app.config.ts");

console.log("✅ project has been successfuly initialized!");
