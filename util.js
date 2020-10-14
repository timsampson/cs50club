const fs = require("fs");
const path = require("path");

const servDir = "server";
const finalDir = "appsscript";
const distDir = "dist";
const htmlFile = "index.html";

// Creates /tmp/a/apple, regardless of whether `/tmp` and /tmp/a exist.
fs.mkdir('dist', { recursive: true }, (err) => {
    if (err) throw err;
});

fs.copyFileSync(path.resolve(__dirname, distDir, htmlFile), path.resolve(__dirname, finalDir, htmlFile));

const dir = fs.readdirSync(path.resolve(__dirname, servDir));

dir.forEach(f => {
    fs.copyFileSync(path.resolve(__dirname, servDir, f), path.resolve(__dirname, finalDir, f));

})