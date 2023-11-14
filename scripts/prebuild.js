const fs = require("fs");

const packageJson = JSON.parse(fs.readFileSync("./package.json"));

const version = packageJson.version;

const versionFilePath = "./src/version.ts";

const src = `export const version = '${version}';`;

fs.writeFileSync(versionFilePath, src, { flag: "w" });
console.log(`wrote version.ts with version ${version}`);
