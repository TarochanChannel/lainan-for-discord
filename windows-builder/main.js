const request = require('request');
const fs = require("fs");
const mkdirp = require('mkdirp');
const { execSync } = require('child_process');

var git = "https://raw.githubusercontent.com/TarochanChannel/lainan-for-discord/main/";
var files;
request(git + "app-files.json", async function (error, response, body) {
    if (error || !body) return;
    files = JSON.parse(body);
    await Object.keys(files.windows).forEach(function (folder) {
        files.windows[folder].forEach(function (file) {
            request(`${git}${folder}/${file}`, function (error, response, body) {
                if (error || !body) return;
                mkdirp.sync(`${folder}`);
                fs.writeFileSync(`${folder}/${file}`, body);
            });
        });
    });

    execSync("cd app&&npm install");
    execSync("npx electron-builder -w --projectDir app");
});