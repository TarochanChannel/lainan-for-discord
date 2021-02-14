const { app, BrowserWindow, Notification } = require('electron');

function createWindow() {
    const win = new BrowserWindow({
        title: "Lainan for Desktop",
        width: 460,
        minWidth: 360,
        height: 800,
        minHeight: 640,
        backgroundColor: "#e3f2fd",
        webPreferences: {
            nodeIntegration: true
        }
    });
    var allow_close = false;
    const close_notification = new Notification({
        title: '注意',
        body: "あなたのDiscordBotの停止を抑制するため、このアプリは閉じていません。\n今すぐ閉じる場合は、この通知をクリックしてください。"
    });
    close_notification.on("click", function() {
        allow_close = true;
        win.close();
    });

    win.setTitle("Lainan for Discord");
    win.removeMenu();
    win.loadFile('view/index.html');
    //win.openDevTools();
    win.on('close', (event) => {
        if (allow_close) return;
        event.preventDefault();
        close_notification.show();
    });
};

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    };
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    };
});
