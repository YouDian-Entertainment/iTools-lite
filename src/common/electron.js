// 渲染测需要的 electron 相关方法封装
import { ipcRenderer } from 'electron';
import { ALL_EXT_FILTER } from '@constants/fileext';
/**
 * 打开文件
 * @param {Object} extFilter 文件后缀扩展，取值见 fileext 中的枚举
 */
export const openFile = (extFilter) => {
    ipcRenderer.send('open-file', extFilter || ALL_EXT_FILTER);
    return new Promise((reslove, reject) => {
        ipcRenderer.once('open-file-result', (event, result) => {
            if (result) {
                reslove(result);
            } else {
                reject();
            }
        });
    });
};

export const saveFile = () => {};
