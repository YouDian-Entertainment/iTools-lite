import logger from './logger';

const pinyin = require('pinyin-no-jieba');

export const textToSpell = (text) => {
    return pinyin(text, {
        heteronym: false,              // 启用多音字模式
        segment: true,                // 启用分词，以解决多音字问题。
    });
};

export const splitSectionAndTrans = (section) => {
    const arr = section.split('');
    // 中文标点符号，  。 ？ ！ ， 、 ； ： “ ” ‘ ' （ ） 《 》 〈 〉 【 】 『 』 「 」 ﹃ ﹄ 〔 〕 … — ～ ﹏ ￥
    const reg = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/;
    let sentence = '';
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if (reg.test(item)) {
            result.push(textToSpell(sentence));
            sentence = '';
            result.push(item);
        } else {
            sentence += item;
            if (i === arr.length - 1) {
                result.push(textToSpell(sentence));
                break;
            }
        }
    }
    return arrayPlan(arrayPlan(result));
};

const arrayPlan = (array) => {
    let result = [];
    for (let i = 0; i < array.length; i++) {
        result = result.concat([...array[i]]);
    }
    return result;
};

const arrayMerage = (textArray, spellArray) => {
    const len = textArray.length;
    const _len = spellArray.length;
    let result = [];
    if (len !== _len) {
        return result;
    }
    for (let i = 0; i < len; i++) {
        result.push({
            chinese: textArray[i], // 汉字
            spell: spellArray[i], // 拼音
            isEmpty: textArray[i] === spellArray[i], // 是否是标点符号，是的话拼写做特殊处理
        });
    }
    return result;
};

export const chineseToPinyin = (string) => {
    return splitSectionAndTrans(string).join(' ');
};
export const chineseAddPinyin = (string) => {
    const textArr = string.split('');
    const spellArr = splitSectionAndTrans(string);
    return arrayMerage(textArr, spellArr);
};
