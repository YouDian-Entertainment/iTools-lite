const convert = require('color-convert');

/**
 * RGB 转 十六进制
 * @param {Number} r 红
 * @param {Number} g 绿
 * @param {Number} b 蓝
 */
export const rgbToHex = (r, g, b) => {
    const val = convert.rgb.hex(parseInt(r), parseInt(g), parseInt(b));
    return `#${val}`;
};

/**
 * 十六进制 转 RGB
 * @param {String} hex 十六进制颜色值
 */
export const hexToRgb = (hex) => {
    const reg = /#/g;
    const _hex = hex.replace(reg, '');
    const val = convert.hex.rgb(_hex);
    return `rgb(${val.join(', ')})`;
};
