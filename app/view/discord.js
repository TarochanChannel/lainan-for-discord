const Discord = require('discord.js');
const client = new Discord.Client();
const request = require("request");

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    setInterval(() => {
        client.user.setPresence({
            activity: {
                name: `I using lainan.one | ${document.getElementById("stamsg").value} | ${document.getElementById("prefix").value}help | ${client.guilds.cache.size}servers`
            },
            status: document.getElementById("status")
        });
    }, 1000);
    localStorage.setItem("config", JSON.stringify({
        "token": client.token,
        "status": document.getElementById("status").value,
        "prefix": document.getElementById("prefix").value,
        "stamsg": document.getElementById("stamsg").value,
        "reac": document.getElementById("reac").value,
        "refo": document.getElementById("refo").value
    }));
});

client.on('message', async message => {
    if (message.author.id == client.user.id) return;
    if (document.getElementById("refo").value == "usr") {
        if (message.author.bot) return;
    };
    if (message.content == "") return;
    if (message.content.startsWith(document.getElementById("prefix").value)) {
        if (message.content == document.getElementById("prefix").value + "ping") {
            message.channel.send("NowPing is " + client.ws.ping + "ms");
        } else if (message.content == document.getElementById("prefix").value + "help") {
            message.channel.send("**Lainan for Discord Commands**\n\n- ping => view now ping\n- help => view this help\n- test => LainanAPI test");
        } else if (message.content == document.getElementById("prefix").value + "test") {
            var msg = await message.channel.send({
                "embed": {
                    "title": "LainanServer Test",
                    "color": 0x03a9f4,
                    "timestamp": new Date(),
                    "fields": [
                        {
                            "name": "Lainan Reaction",
                            "value": "Testing now..."
                        },
                        {
                            "name": "Lainan Search",
                            "value": "Testing now..."
                        }
                    ]
                }
            });
            var temp = [{
                "name": "Lainan Reaction",
                "value": "Testing now..."
            },
            {
                "name": "Lainan Search",
                "value": "Testing now..."
            }];
            request({ url: "https://api.lainan.one/?msg=" + encodeURI("こんにちは"), method: 'GET', json: true }, async function (error, response, body) {
                if (error || !body) {
                    temp[0].value = "Test is bad.";
                    msg = await msg.edit({
                        "embed": {
                            "title": "LainanServer Test",
                            "color": 0x03a9f4,
                            "timestamp": new Date(),
                            "fields": temp
                        }
                    });
                    return;
                }
                try {
                    if (!body.ips && body.ips != 0) {
                        temp[0].value = "Test is bad.";
                        msg = await msg.edit({
                            "embed": {
                                "title": "LainanServer Test",
                                "color": 0x03a9f4,
                                "timestamp": new Date(),
                                "fields": temp
                            }
                        });
                        return;
                    }
                } catch (error) {
                    temp[0].value = "Test is bad.";
                    msg = await msg.edit({
                        "embed": {
                            "title": "LainanServer Test",
                            "color": 0x03a9f4,
                            "timestamp": new Date(),
                            "fields": temp
                        }
                    });
                    return;
                }
                temp[0].value = "Test is good.\nPing(ips): " + body.ips + "ms";
                msg = await msg.edit({
                    "embed": {
                        "title": "LainanServer Test",
                        "color": 0x03a9f4,
                        "timestamp": new Date(),
                        "fields": temp
                    }
                });
            });
            request({ url: "https://api.lainan.one/?msg=" + encodeURI("ソビエト社会主義共和国連邦"), method: 'GET', json: true }, async function (error, response, body) {
                if (error || !body) {
                    temp[1].value = "Test is Bad.";
                    msg = await msg.edit({
                        "embed": {
                            "title": "LainanServer Test",
                            "color": 0x03a9f4,
                            "timestamp": new Date(),
                            "fields": temp
                        }
                    });
                    return;
                }
                try {
                    if (!body.ips && body.ips != 0) {
                        temp[1].value = "Test is bad.";
                        msg = await msg.edit({
                            "embed": {
                                "title": "LainanServer Test",
                                "color": 0x03a9f4,
                                "timestamp": new Date(),
                                "fields": temp
                            }
                        });
                        return;
                    }
                } catch (error) {
                    temp[1].value = "Test is bad.";
                    msg = await msg.edit({
                        "embed": {
                            "title": "LainanServer Test",
                            "color": 0x03a9f4,
                            "timestamp": new Date(),
                            "fields": temp
                        }
                    });
                    return;
                }
                temp[1].value = "Test is good.\nPing(ips): " + body.ips + "ms";
                msg = await msg.edit({
                    "embed": {
                        "title": "LainanServer Test",
                        "color": 0x03a9f4,
                        "timestamp": new Date(),
                        "fields": temp
                    }
                });
            });
        }
        return;
    };
    request({ url: "https://api.lainan.one/?msg=" + encodeURI(message.content), method: 'GET', json: true }, function (error, response, body) {
        if (error) {
            return;
        }
        if (document.getElementById("reac").value == "bal") {
            if (!body.responder_bool.IsAuto_search) {
                message.channel.send(body.reaction, { "split": true });
            };
        } else if (document.getElementById("reac").value == "all") {
            message.channel.send(body.reaction, { "split": true });
        } else if (document.getElementById("reac").value == "lao") {
            if (body.responder_bool.IsLainan) {
                message.channel.send(body.reaction, { "split": true });
            }
        } else if (document.getElementById("reac").value == "wmo") {
            if (body.responder_bool.IsWiki) {
                message.channel.send(body.reaction, { "split": true });
            }
        };
    });
});