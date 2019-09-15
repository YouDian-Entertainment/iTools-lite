// 复制文本到剪贴板插件
const copy = require('copy-text-to-clipboard');
const { readMarkdownFile, readQrcodeImage } = require('../node');
import { shell } from 'electron';


const hljs = require('highlight.js');
import { TipError, TipSuccess } from './tip';

// 引入代码高亮样式文件
import 'highlight.js/styles/atom-one-dark';

const md = require('markdown-it')({
    html:         true,        // Enable HTML tags in source
    xhtmlOut:     true,        // Use '/' to close single tags (<br />).
    breaks:       true,        // Convert '\n' in paragraphs into <br>
    langPrefix:   '',          // CSS language prefix for fenced blocks. Can be
    linkify:      false,       // Autoconvert URL-like text to links
    typographer:  false,
    quotes: '“”‘’',
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(lang, str).value;
            } catch (__) {
                return '';
            }
        }
        return ''; // use external default escaping
    }
});

/**
 * 保存文本到粘贴板
 * @param {String} text 保存的文本
 */
export const copyText = (text) => {
    try {
        copy(text);
        TipSuccess('复制成功');
    } catch (error) {
        TipError('复制失败');
    }
};

/**
 * 根据搜索值匹配菜单
 * @param {Array} menuArray 菜单数据
 * @param {String} searchValue 搜索值
 */
export const dealMenuBySearchValue = (menuArray, searchValue) => {
    if (!searchValue) {
        return menuArray;
    }
    let menuData = [];
    menuArray.forEach(item => menuData = [...menuData, ...item.menuList]);
    return [{
        groupName: '搜索结果', // 分组名称
        menuList: menuData.filter(item => item.name.indexOf(searchValue) > -1),
    }];
};

export const loadMarkdownFile = (filename) => {
    // return markdown.toHTML(readMarkdownFile(filename));
    return md.render(readMarkdownFile(filename));
};

export const readQrcodeImageValue = (filePath) => {
    return readQrcodeImage(filePath);
};

/**
 * 获取文件的类型
 */
const getFileType = (filePath) => {
    const arr = filePath.split('.');
    return arr[arr.length - 1];
};
/**
 * 获取文件的类型
 */
const getFileName = (filePath) => {
    const arr = filePath.split('/');
    return arr[arr.length - 1];
};

export const createFileObject = (filePath) => {
    return {
        filePath,
        fileName: getFileName(filePath),
        fileType: getFileType(filePath),
    };
};

export const openLink = async (link) => {
    await shell.openExternal(link);
};
