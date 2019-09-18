// electron 入口文件
import { app, BrowserWindow } from 'electron';
import { AddDataBase, AddOpenFile, CustomerMenu } from './electron';
import dbName from './constants/db';
const { port, host } = require('../electron/config');

if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}

let mainWindow;
const isDev = process.env.ENV === 'dev';
const winURL = isDev ? `http://${host}:${port}` : `file://${__dirname}/index.html`;

console.log('地址：', winURL);

// 定义图标地址
// const logo = path.resolve(__dirname, '../build/icons/icon.png');

function createWindow() {
    mainWindow = new BrowserWindow({
        title: 'iTools',
        height: 700,
        width: 900,
        center: true, // 窗口默认居中
        resizable: false, // 不可修改窗口大小
        maximizable: false, // 不存在最大化
        skipTaskbar: true, // 任务栏显示
        useContentSize: false, // 不允许修改大小
        transparent: true, // 透明
        frame: false, // 不使用框架
        // show: false, // 禁止显示
        fullscreenable: false,
        titleBarStyle: 'hidden',
        backgroundColor: 'none',
        webPreferences: {
            scrollBounce: false,
            nodeIntegration: true,
        },
    });

    mainWindow.loadURL(winURL);

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    AddDataBase(dbName.list);
    AddDataBase(dbName.qrcode);
    AddDataBase(dbName.color);
    AddDataBase(dbName.board);

    AddOpenFile();
    // 自定义菜单
    CustomerMenu();
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
