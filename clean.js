const fs = require("fs");
const path = require("path");



const distDir = "dist";

// Creates /tmp/a/apple, regardless of whether `/tmp` and /tmp/a exist.
fs.mkdir('dist', { recursive: true }, (err) => {
    if (err) throw err;
});

fs.readdir(distDir, (err, files) => {
    if (err) throw err;

    for (const file of files) {
        fs.unlink(path.join(distDir, file), err => {
            if (err) throw err;
        });
    }
});