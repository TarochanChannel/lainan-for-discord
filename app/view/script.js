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
    document.getElementById("setup_content").innerHTML = document.getElementsByClassName("welcome_screens")[0].innerHTML;//0ページ目を表示
    M.FormSelect.init(document.querySelectorAll('select'), {});

    
};
//URL開くやつ
function urlopen(url) {
    const { shell } = require('electron');
    shell.openExternal(url);
};