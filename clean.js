const fs = require("fs");
const path = require("path");
const distDir = "dist";
const gasDir = "appsscript";

// If app is cloned from git, it won't contain a dist folder and will have an error on build.
fs.mkdir('dist', { recursive: true }, (err) => {
    if (err) throw err;
});

// delete files in the build folder after the build
fs.readdir(distDir, (err, files) => {
    if (err) throw err;

    for (const file of files) {
        fs.unlink(path.join(distDir, file), err => {
            if (err) throw err;
        });
    }
});

// delete files after Clasp push in the AppsScript folder except the appsscript.json file
fs.readdir(gasDir, (err, files) => {
    if (err) throw err;

    for (const file of files) {
        if (file !== 'appsscript.json') {
            fs.unlink(path.join(gasDir, file), err => {
                if (err) throw err;
            });
        }
    }
});