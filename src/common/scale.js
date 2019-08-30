const reg = /\./g;
// 二进制字典
const binaryDict = ['0', '1'];
// 四进制字典
const quaternaryDict = ['0', '1', '2', '3'];
// 八进制字典
const octalDict = ['0', '1', '2', '3', '4', '5', '6', '7'];
// 十六进制字典
const hexDict = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
// 三十二进制字典
const thirtyBinaryDict = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v'];

/**
 * 把一个小数或整数处理为数组
 * @param {String|Number} str 需要处理的数组
 */
const dealStringToArray = (str) => {
    const val = str.toLocaleLowerCase();
    let prefix = [];
    let suffix = [];
    if (reg.test(val)) {
        const vals = val.split('.');
        prefix = vals[0].split('');
        suffix = vals[1];
    } else {
        prefix = val.split('');
    }
    return {
        prefix,
        suffix,
    };
};

/**
 * 转十进制，转换主要算法
 * @param {Number|String} value 需要转换的值
 * @param {Number} num 进制值：2，4，8，16，32
 * @param {Array} dict 进制相对应的字典
 */
const dealToIntegerValue = (value, num, dict) => {
    const { prefix, suffix } = dealStringToArray(value);
    let prefixPow = prefix.length - 1;
    let prefixValue = 0;
    let suffixValue = 0;
    for (let i = 0; i < prefix.length; i++) {
        const item = prefix[i];
        prefixValue += Math.pow(num, prefixPow) * dict.indexOf(item);
        prefixPow -= 1;
    }
    for (let i = 0; i < suffix.length; i++) {
        const item = suffix[i];
        suffixValue += Math.pow(num, -(i + 1)) * dict.indexOf(item);
    }
    return `${prefixValue + suffixValue}`;
};

/**
 * 返回两个数相除的整数部分和余数
 * @param {Number} val 除数
 * @param {Number} num 被除数
 */
const returnValueAndRemainder = (val, num) => {
    return {
        intValue: parseInt(`${(val / num)}`.split('.')[0]),
        remainder: val % num,
    };
};

/**
 * 获取一个小数的整数部分和小数部分
 * @param {Number} number 整数或小数
 */
const dealDotNumber = (number) => {
    const arr = `${number}`.split('.');
    return {
        integer: parseInt(arr[0] || 0),
        decimal: parseInt(arr[1] || 0)
    };
};

/**
 * 十进制转其他进制，转换主要算法
 * @param {Number|String} value 需要转换的值
 * @param {Number} num 进制值：2，4，8，16，32
 * @param {Array} dict 进制相对应的字典
 */
const dealIntegerToOtherValue = (value, num, dict) => {
    let result = '';
    const { integer, decimal } = dealDotNumber(value);
    const { intValue , remainder } = returnValueAndRemainder(integer, num);
    if (intValue > 0) {
        result = `${dealIntegerToOtherValue(intValue, num, dict)}${dict[remainder]}`;
    } else {
        result = `${dict[remainder]}${result}`;
    }
    if (decimal) {
        result = `${result}.${dealIntegerDotToOtherValue(`0.${decimal}`, num, dict)}`;
    }
    return result;
};

const tempValue = [];

/**
 * 十进制转其他进制，小数部分处理
 * @param {Number|String} value 需要转换的值
 * @param {Number} num 进制值：2，4，8，16，32
 * @param {Array} dict 进制相对应的字典
 */
const dealIntegerDotToOtherValue = (value, num, dict) => {
    const val = value * num;
    let result = '';
    const { integer, decimal } = dealDotNumber(val);
    if (tempValue.filter(item => item === decimal).length > 2) {
        // 可能是无限循环
        tempValue.length = 0; // 清空数据
        return '...';
    }
    tempValue.push(decimal);
    if (decimal > 0) {
        result = dict[integer] + dealIntegerDotToOtherValue(`0.${decimal}`, num, dict);
    } else {
        result += dict[integer];
    }
    return result;
};

/**
 * 二进制转十进制
 * @param {Number|String} binary 二进制值
 */
const binaryToInteger = (binary) => {
    return dealToIntegerValue(binary, 2, binaryDict);
};

/**
 * 十进制转二进制
 * @param {Number|String} integer 十进制值
 */
const integerToBinary = (integer) => {
    return dealIntegerToOtherValue(integer, 2, binaryDict);
};

/**
 * 四进制转十进制
 * @param {Number|String} quaternary 四进制值
 */
const quaternaryToInteger = (quaternary) => {
    return dealToIntegerValue(quaternary, 4, quaternaryDict);
};

/**
 * 十进制转四进制
 * @param {Number|String} integer 十进制值
 */
const integerToQuaternary = (integer) => {
    return dealIntegerToOtherValue(integer, 4, quaternaryDict);
};

/**
 * 八进制转十进制
 * @param {Number|String} octal 八进制值
 */
const octalToInteger = (octal) => {
    return dealToIntegerValue(octal, 8, octalDict);
};

/**
 * 十进制转八进制
 * @param {Number|String} integer 十进制值
 */
const integerToOctal = (integer) => {
    return dealIntegerToOtherValue(integer, 8, octalDict);
};

/**
 * 十六进制转十进制
 * @param {Number|String} hex 十六进制值
 */
const hexToInteger = (hex) => {
    return dealToIntegerValue(hex, 16, hexDict);
};

/**
 * 十进制转十六进制
 * @param {Number|String} integer 十进制值
 */
const integerToHex = (integer) => {
    return dealIntegerToOtherValue(integer, 16, hexDict);
};

/**
 * 三十二进制转十进制
 * @param {Number|String} thirtyBinary 三十二进制值
 */
const thirtyBinaryToInteger = (thirtyBinary) => {
    return dealToIntegerValue(thirtyBinary, 32, thirtyBinaryDict);
};

/**
 * 十进制转三十二进制
 * @param {Number|String} integer 十进制值
 */
const integerToThirtyBinary = (integer) => {
    return dealIntegerToOtherValue(integer, 32, thirtyBinaryDict);
};

/**
 * 类型转换类型，方法对应
 */
const scaleTypeToFunction = [{
    type: 'binary=>quaternary', // 2 => 4
    func: (val) => {
        return integerToQuaternary(binaryToInteger(val));
    },
}, {
    type: 'binary=>octal', // 2 => 8
    func: (val) => {
        return integerToOctal(binaryToInteger(val));
    },
}, {
    type: 'binary=>integer', // 2 => 10
    func: binaryToInteger,
}, {
    type: 'binary=>hex', // 2 => 16
    func: (val) => {
        return integerToHex(binaryToInteger(val));
    },
}, {
    type: 'binary=>thirtyBinary', // 2 => 32
    func: (val) => {
        return integerToThirtyBinary(binaryToInteger(val));
    },
}, {
    type: 'quaternary=>binary', // 4 => 2
    func: (val) => {
        return integerToBinary(quaternaryToInteger(val));
    },
}, {
    type: 'quaternary=>octal', // 4 => 8
    func: (val) => {
        return integerToOctal(quaternaryToInteger(val));
    },
}, {
    type: 'quaternary=>integer', // 4 => 10
    func: quaternaryToInteger,
}, {
    type: 'quaternary=>hex', // 4 => 16
    func: (val) => {
        return integerToHex(quaternaryToInteger(val));
    },
}, {
    type: 'quaternary=>thirtyBinary', // 4 => 32
    func: (val) => {
        return integerToThirtyBinary(quaternaryToInteger(val));
    },
}, {
    type: 'octal=>binary', // 8 => 2
    func: (val) => {
        return integerToBinary(octalToInteger(val));
    },
}, {
    type: 'octal=>quaternary', // 8 => 4
    func: (val) => {
        return integerToQuaternary(octalToInteger(val));
    },
}, {
    type: 'octal=>integer', // 8 => 10
    func: octalToInteger,
}, {
    type: 'octal=>hex', // 8 => 16
    func: (val) => {
        return integerToHex(octalToInteger(val));
    },
}, {
    type: 'octal=>thirtyBinary', // 8 => 32
    func: (val) => {
        return integerToThirtyBinary(octalToInteger(val));
    },
}, {
    type: 'integer=>binary', // 10 => 2
    func: integerToBinary,
}, {
    type: 'integer=>quaternary', // 10 => 4
    func: integerToQuaternary,
}, {
    type: 'integer=>octal', // 10 => 8
    func: integerToOctal,
}, {
    type: 'integer=>hex', // 10 => 16
    func: integerToHex,
}, {
    type: 'integer=>thirtyBinary', // 10 => 32
    func: integerToThirtyBinary,
}, {
    type: 'hex=>binary', // 16 => 2
    func: (val) => {
        return integerToBinary(hexToInteger(val));
    },
}, {
    type: 'hex=>quaternary', // 16 => 4
    func: (val) => {
        return integerToQuaternary(hexToInteger(val));
    },
}, {
    type: 'hex=>octal', // 16 => 8
    func: (val) => {
        return integerToOctal(hexToInteger(val));
    },
}, {
    type: 'hex=>integer', // 16 => 10
    func: hexToInteger,
}, {
    type: 'hex=>thirtyBinary', // 16 => 32
    func: (val) => {
        return integerToThirtyBinary(hexToInteger(val));
    },
}, {
    type: 'thirtyBinary=>binary', // 32 => 2
    func: (val) => {
        return integerToBinary(thirtyBinaryToInteger(val));
    },
}, {
    type: 'thirtyBinary=>quaternary', // 32 => 4
    func: (val) => {
        return integerToQuaternary(thirtyBinaryToInteger(val));
    },
}, {
    type: 'thirtyBinary=>octal', // 32 => 8
    func: (val) => {
        return integerToOctal(thirtyBinaryToInteger(val));
    },
}, {
    type: 'thirtyBinary=>integer', // 32 => 10
    func: thirtyBinaryToInteger,
}, {
    type: 'thirtyBinary=>hex', // 32 => 16
    func: (val) => {
        return integerToHex(thirtyBinaryToInteger(val));
    },
}];

export default scaleTypeToFunction;
