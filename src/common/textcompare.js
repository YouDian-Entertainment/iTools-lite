// 文本比较工具类
const Diff = require('diff');

/**
 * 比较文本，根据类型比较文本
 * @param {String} one 第一段文本
 * @param {String} two 第二段文本
 * @param {String} type 类型，来自枚举的类型
 * @returns {Array} 返回比较的结果数组
 */
const compareText = (one, two, type) => {
    let result = [];
    switch (type) {
    case 'text':
        result = Diff.diffWordsWithSpace(one, two);
        break;
    case 'json':
        result = Diff.diffJson(one, two);
        break;
    case 'line':
        result = Diff.diffLines(one, two);
        break;
    case 'sentence':
        result = Diff.diffSentences(one, two);
        break;
    case 'array':
        result = Diff.diffArrays(one, two);
        break;
    default:
        result = Diff.diffWordsWithSpace(one, two);
        break;
    }
    return result;
};

/**
 * 把输入的文本转换成能在页面上展示的文本
 * @param {String} text 文本
 */
export const dealTextToHtmlText = (text) => {
    console.log(/\n\s*/.test(`${text}`));
    let result = `${text}`.replace(/ /g, '&nbsp;');
    result = result.replace(/\n\s*/g, '<br/>');
    // result = result.replace(/\n\s*\r/g, '<br />');
    return result;
};

export default compareText;
