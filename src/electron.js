// electron 相关的原生方法封装
import { app, Notification, globalShortcut, Menu, ipcMain, dialog } from 'electron';
import path from 'path';
import Datastore from 'nedb';

// 主进程中的通知，只能在主进程中使用
const Notic = (title, body) => {
    const _n = new Notification({
        title, // 标题
        subtitle: '', // 副标题
        body, // 内容
        silent: true, // 是否发出提示音
        icon: '', // 提示图标
        hasReply: false, // 是否存在回复框
        replyPlaceholder: '', // 回复框中的提示信息
        closeButtonText: '关闭', // 关闭按钮文案
    });
    _n.show();
};

/**
 * 添加系统快捷键，建议使用 constants 中的枚举值
 * @param {String} key 快捷键组合
 * @param {Function} action 快捷键的操作函数
 */
const AddShortcuts = (key, action) => {
    globalShortcut.register(key, action);
};

/**
 * 添加菜单
 * @param {Array} menuList 菜单数组对象
 */
const AddMenuList = (menuList=[]) => {
    const template = [{
        label: app.getName(),
        submenu: [
            { label: `关于${app.getName()}`, role: 'about', accelerator: 'Command+I', },
            { label: '隐藏', role: 'hide' },
            { type: 'separator' },
            { label: '退出', role: 'quit', accelerator: 'Command+Q' }
        ]
    }];
    const _t = template.concat(menuList);
    const menu = Menu.buildFromTemplate(_t);
    Menu.setApplicationMenu(menu);
};

/**
 * 添加本地数据库
 * @param {String} name 数据库名称
 */
const AddDataBase = (name) => {
    const db = new Datastore({
        filename: path.join(app.getPath('userData'), `${name}.db`), // 数据文件
        autoload: true, // 自动加载
    });
    // 添加数据库的增删改查基本方法监听，监听方式 ‘name-type’
    ipcMain.on(`${name}-add`, (event, item) => {
        db.insert(item, (err, newDoc) => {
            if (err) {
                event.sender.send(`${name}-add-result`, false);
            }
            event.sender.send(`${name}-add-result`, newDoc);
        });
    });
    ipcMain.on(`${name}-del`, (event, id) => {
        db.remove({ _id: id }, {}, (err, numRemoved) => {
            if (err) {
                event.sender.send(`${name}-del-result`, false);
            }
            event.sender.send(`${name}-del-result`, true);
        });
    });
    ipcMain.on(`${name}-update`, (event, condition, value) => {
        db.update(condition, { $set: value }, (err, newDoc) => {
            if (err) {
                event.sender.send(`${name}-update-result`, false);
            }
            event.sender.send(`${name}-update-result`, true);
        });
    });
    ipcMain.on(`${name}-find-all`, (event) => {
        db.find({}, (err, docs) => {
            if (err) {
                event.sender.send(`${name}-find-all-result`, false);
            }
            event.sender.send(`${name}-find-all-result`, docs);
        });
    });
    ipcMain.on(`${name}-find`, (event, item, condition) => {
        db.find(item, condition, (err, docs) => {
            if (err) {
                event.sender.send(`${name}-find-all-result`, false);
            }
            event.sender.send(`${name}-find-all-result`, docs);
        });
    });
};

/**
 * 添加打开文件支持
 */
const AddOpenFile = () => {
    ipcMain.on('open-file', (event, extFilter) => {
        dialog.showOpenDialog({
            title: '选择文件',
            buttonLabel: '确认选择',
            filters: [extFilter],
            properties: ['openFile'],
        }, (filePaths) => {
            event.sender.send('open-file-result', filePaths[0]);
            console.log('打开文件成功：', filePaths[0]);
        });
    });
};

/**
 * 添加保存文件支持
 */
const AddSaveFile = () => {
    ipcMain.on('save-file', (event) => {
        dialog.showSaveDialog();
    });
};
const AddOpenFolder = () => {};

// const AddQiniuUploadFile = () => {
//     ipcMain.on('qiniu-upload', async (event, bucket, file) => {
//         const res = await qiniuUpload(bucket, file);
//         event.sender.send('qiniu-upload-result', res);
//     });
// };

module.exports = {
    Notic,
    AddShortcuts,
    AddMenuList,
    AddDataBase,
    AddOpenFile,
};
