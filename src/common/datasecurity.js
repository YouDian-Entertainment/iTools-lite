// base64
import { Base64 } from 'js-base64';
const MD5 = require('md5');
import Sha1 from './sha1.js';

/**
 * base64 加密字符串
 * @param {String} str 需要加密的字符串
 */
export const base64Encode = (str) => {
    return Base64.encode(str);
};

/**
 * base64 解密字符串
 * @param {String} str 需要解密的字符串
 */
export const base64Decode = (str) => {
    return Base64.decode(str);
};

/**
 * 获取字符串的 MD5 值
 * @param {String} str 字符串
 */
export const md5Check = (str) => {
    return MD5(str);
};

/**
 * sha1 加密字符串
 * @param {String} str 字符串
 */
export const sha1Check = (str) => {
    return Sha1(str);
};
