const fs = require("fs");

const packageJson = JSON.parse(fs.readFileSync("./package.json"));

// VERSION is passed as a Docker build arg by the release workflow (e.g. v1.0.28)
const version = process.env.VERSION?.replace(/^v/, "") || packageJson.version;

const versionFilePath = "./src/version.ts";

const src = `export const version = '${version}';`;

fs.writeFileSync(versionFilePath, src, { flag: "w" });
console.log(`wrote version.ts with version ${version}`);
