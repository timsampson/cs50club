const fs = require("fs");
const path = require("path");
const distDir = "dist";

// If app is cloned from git, it won't contain a dist folder and will have an error on build.
fs.mkdir('dist', { recursive: true }, (err) => {
    if (err) throw err;
});

// delete files in the build folder
fs.readdir(distDir, (err, files) => {
    if (err) throw err;

    for (const file of files) {
        fs.unlink(path.join(distDir, file), err => {
            if (err) throw err;
        });
    }
});