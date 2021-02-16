// ウェルカムスクリーン関係
var welcome_screen = {
    "now": 0,//今表示してるやつ
    "next": function () {
        if (this.now + 1 > document.getElementsByClassName("welcome_screens").length) {
            document.getElementById("welcome").style.display = "none";
            return;
        };
        this.now += 1;//足す
        document.getElementById("setup_content").innerHTML = document.getElementsByClassName("welcome_screens")[this.now].innerHTML;//画面変える
    },
    "back": function () {
        if (this.now <= 0) return;//最初だったら止める
        this.now -= 1;//減らす
        document.getElementById("setup_content").innerHTML = document.getElementsByClassName("welcome_screens")[this.now].innerHTML;//画面変える
    }
};
//読み込まれたとき
window.onload = function () {
    if (localStorage.getItem("config")) {
        const config =JSON.parse(localStorage.getItem("config"));
        document.getElementById("token").value = config.token;
        document.getElementById("status").value = config.status;
        document.getElementById("prefix").value = config.prefix;
        document.getElementById("stamsg").value = config.stamsg;
        document.getElementById("reac").value = config.reac;
        document.getElementById("refo").value = config.refo;
        document.getElementById("welcome").style.display = "none";
    }else {
        document.getElementById("setup_content").innerHTML = document.getElementsByClassName("welcome_screens")[0].innerHTML;//0ページ目を表示
    };
};
//URL開くやつ
function urlopen(url) {
    const { shell } = require('electron');
    shell.openExternal(url);
};