'use strict';

const request = require('request');
const fs = require("fs");
const mkdirp = require('mkdirp');
const { execSync,exec,execFileSync } = require('child_process');

const Reset = '\x1b[0m';
const Bright = '\x1b[1m';
const Dim = '\x1b[2m';
const Underscore = '\x1b[4m';
const Blink = '\x1b[5m';
const Reverse = '\x1b[7m';
const Hidden = '\x1b[8m';

const FgBlack = '\x1b[30m';
const FgRed = '\x1b[31m';
const FgGreen = '\x1b[32m';
const FgYellow = '\x1b[33m';
const FgBlue = '\x1b[34m';
const FgMagenta = '\x1b[35m';
const FgCyan = '\x1b[36m';
const FgWhite = '\x1b[37m';

const BgBlack = '\x1b[40m';
const BgRed = '\x1b[41m';
const BgGreen = '\x1b[42m';
const BgYellow = '\x1b[43m';
const BgBlue = '\x1b[44m';
const BgMagenta = '\x1b[45m';
const BgCyan = '\x1b[46m';
const BgWhite = '\x1b[47m';

var git = "https://raw.githubusercontent.com/TarochanChannel/lainan-for-discord/main/";
var files;
console.clear();
console.log(`${BgWhite}Lainan for Discord - Downloader\n${Reset}`);
console.log(BgCyan + "Lainan for Discordのソースコードをダウンロードします。" + Reset);
request(git + "app-files.json", async function (error, response, body) {
    if (error || !body) {
        console.log(BgRed + "Lainan for Discordのソースコードのダウンロードにエラーが発生しました。" + Reset);
        return;
    }
    console.log(BgGreen + "Lainan for Discordのソースコードのファイルリストがダウンロード完了しました。" + Reset);
    files = JSON.parse(body);
    console.log(BgCyan + "Lainan for Discordのソースコードをダウンロードします。" + Reset);
    var dl_promise = [];
    Object.keys(files.windows).forEach(function (folder) {
        files.windows[folder].forEach(function (file) {
            dl_promise.push(new Promise((resolve, reject) => {
                console.log(`${BgCyan}Lainan for Discordのソースコードの${folder}/${file}をダウンロードします。${Reset}`);
                request({url:`${git}${folder}/${file}`,encoding: null}, function (error, response, body) {
                    if (error || !body)
                        return;
                    mkdirp.sync(`${folder}`);
                    fs.writeFileSync(`${folder}/${file}`, body, 'binary');
                    console.log(`${BgGreen}Lainan for Discordのソースコードの${folder}/${file}のダウンロードが完了しました。${Reset}`);
                    resolve();
                });
            }));
        });
    });
    Promise.all(dl_promise).then(() => {
        console.log(BgGreen + "Lainan for Discordのソースコードのダウンロードがすべて終わりました。" + Reset);
        var Isknownode = true;
        try {
            console.log(BgCyan + "Node.jsが入っているかチェックします。" + Reset);
            execSync("node -v");
        } catch (error) {
            Isknownode = false;
            console.log(BgRed + "Node.jsが入っていないため、ビルド・インストールに失敗しました。" + Reset);
            console.log(`${BgMagenta}${FgBlue}https://nodejs.org/${Reset}${BgMagenta} からNode.jsをダウンロードし、インストールしてください。\nその後に、もう一度この実行ファイルを実行してください。${Reset}`);
        } finally {
            if (Isknownode) {
                console.log(BgCyan + "Lainan for Discordをダウンロードしたソースコードからビルドしています。" + Reset);
                execSync("npm install", { cwd: 'app' });
                exec("npx electron-builder -w --projectDir app",{},function(error, stdout, stderr) {
                    if (error) {
                    console.log(BgRed + "ビルドに失敗しました。" + Reset);
                    return;
                    }
                    console.log(BgGreen + "ビルドが完了しました。" + Reset);
                });
            }
        }
    });
});