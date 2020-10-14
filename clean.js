const fs = require("fs");
const path = require("path");
const distDir = "dist";

fs.readdir(distDir, (err, files) => {
    if (err) throw err;

    for (const file of files) {
        fs.unlink(path.join(distDir, file), err => {
            if (err) throw err;
        });
    }
});