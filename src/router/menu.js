// 菜单数据，用于 router 和 menu 显示
// daily
import Listing from '@views/daily/Listing';
import Board from '@views/daily/Board';

// datasecurity
import MD5 from '@views/datasecurity/MD5';
import Base64 from '@views/datasecurity/Base64';
import Sha1 from '@views/datasecurity/Sha1';
import Url from '@views/datasecurity/Url';

// practical
import Qrcode from '@views/practical/Qrcode';
import ReadQrcode from '@views/practical/ReadQrcode';
import Color from '@views/practical/Color';
import Scale from '@views/practical/Scale';
import Regular from '@views/practical/Regular';

// text
import TextCompare from '@views/text/TextCompare';
import ChineseToPinyin from '@views/text/ChineseToPinyin';
import ChineseAddPinyin from '@views/text/ChineseAddPinyin';

// code
import Json from '@views/code/Json';

// wechat
import WechatJsSignature from '@views/wechat/WechatJsSignature';
import WechatCardSignature from '@views/wechat/WechatCardSignature';
import WechatOpen from '@views/wechat/WechatOpen';

// other

// empty
import { Empty } from '@components';

export default [{
    groupName: '日常工具', // 分组名称
    menuList: [{
        icon: 'ios-list-box-outline', // 图标
        name: '清单', // 菜单名称
        router: 'daily-listing', // 菜单路由
    }, {
        icon: 'ios-desktop-outline', // 图标
        name: '看板', // 菜单名称
        router: 'daily-board', // 菜单路由
    }],
}, {
    groupName: '实用工具', // 分组名称
    menuList: [{
        icon: 'ios-qr-scanner', // 图标
        name: '生成二维码', // 菜单名称
        router: 'practical-qrcode', // 菜单路由
    }, {
        icon: 'ios-color-palette-outline', // 图标
        name: '颜色转换', // 菜单名称
        router: 'practical-color', // 菜单路由
    }, {
        icon: 'ios-repeat', // 图标
        name: '进制转换', // 菜单名称
        router: 'practical-scale', // 菜单路由
    }, {
        icon: 'ios-bookmark-outline', // 图标
        name: '正则表达式', // 菜单名称
        router: 'practical-reg', // 菜单路由
    }],
}, {
    groupName: '代码工具', // 分组名称
    menuList: [{
        icon: 'ios-paper-outline', // 图标
        name: 'JSON格式化', // 菜单名称
        router: 'code-json', // 菜单路由
    }],
}, {
    groupName: '文本工具', // 分组名称
    menuList: [{
        icon: 'ios-browsers-outline', // 图标
        name: '文本比较', // 菜单名称
        router: 'text-compare', // 菜单路由
    }, {
        icon: 'ios-shuffle', // 图标
        name: '汉字转拼音', // 菜单名称
        router: 'chinese-to-spell', // 菜单路由
    }, {
        icon: 'ios-shuffle', // 图标
        name: '汉字添加拼音', // 菜单名称
        router: 'chinese-add-spell', // 菜单路由
    }],
}, {
    groupName: '微信工具', // 分组名称
    menuList: [{
        icon: 'ios-checkbox-outline', // 图标
        name: 'JS接口签名校验工具', // 菜单名称
        router: 'wechat-js', // 菜单路由
    }, {
        icon: 'ios-card-outline', // 图标
        name: '卡劵JSAPI校验工具', // 菜单名称
        router: 'wechat-card', // 菜单路由
    }, {
        icon: 'ios-chatbubbles-outline', // 图标
        name: '公众平台接口调试', // 菜单名称
        router: 'wechat-open', // 菜单路由
    }],
}, {
    groupName: '数据安全', // 分组名称
    menuList: [{
        icon: 'ios-lock-outline', // 图标
        name: 'MD5', // 菜单名称
        router: 'encrypt-md5', // 菜单路由
    }, {
        icon: 'ios-lock-outline', // 图标
        name: 'Base64加密 / 解密', // 菜单名称
        router: 'encrypt-decrypt-base64', // 菜单路由
    }, {
        icon: 'ios-lock-outline', // 图标
        name: 'Sha1加密', // 菜单名称
        router: 'encrypt-sha1', // 菜单路由
    }, {
        icon: 'ios-lock-outline', // 图标
        name: 'Url加密 / 解密', // 菜单名称
        router: 'encrypt-decrypt-url', // 菜单路由
    }],
}, {
    groupName: '其他',
    menuList: [{
    //     icon: 'ios-help-circle-outline',
    //     name: '使用帮助',
    //     router: 'other-help',
    // }, {
    //     icon: 'ios-bug-outline',
    //     name: 'Bug反馈',
    //     router: 'other-bug',
    // }, {
        icon: 'ios-contact-outline',
        name: '联系作者',
        router: 'other-bug',
    // }, {
    //     icon: 'ios-leaf-outline',
    //     name: '推荐功能',
    //     router: 'other-recommend',
    }],
}];

export const menuArray = [{
    name: 'daily-listing',
    router: 'daily-listing',
    path: '/daily-listing',
    component: Listing,
}, {
    name: 'daily-board',
    router: 'daily-board',
    path: '/daily-board',
    component: Board,
}, {
    name: 'practical-qrcode',
    router: 'practical-qrcode',
    path: '/practical-qrcode',
    component: Qrcode,
}, {
    name: 'practical-color',
    router: 'practical-color',
    path: '/practical-color',
    component: Color,
}, {
    name: 'practical-scale',
    router: 'practical-scale',
    path: '/practical-scale',
    component: Scale,
}, {
    name: 'practical-reg',
    router: 'practical-reg',
    path: '/practical-reg',
    component: Regular,
}, {
    name: 'text-compare',
    router: 'text-compare',
    path: '/text-compare',
    component: TextCompare,
}, {
    name: 'chinese-to-spell',
    router: 'chinese-to-spell',
    path: '/chinese-to-spell',
    component: ChineseToPinyin,
}, {
    name: 'chinese-add-spell',
    router: 'chinese-add-spell',
    path: '/chinese-add-spell',
    component: ChineseAddPinyin,
}, {
    name: 'wechat-js',
    router: 'wechat-js',
    path: '/wechat-js',
    component: WechatJsSignature,
}, {
    name: 'wechat-card',
    router: 'wechat-card',
    path: '/wechat-card',
    component: WechatCardSignature,
}, {
    name: 'wechat-open',
    router: 'wechat-open',
    path: '/wechat-open',
    component: Empty,
}, {
    name: 'code-json',
    router: 'code-json',
    path: '/code-json',
    component: Json,
}, {
    name: 'encrypt-md5',
    router: 'encrypt-md5',
    path: '/encrypt-md5',
    component: MD5,
}, {
    name: 'encrypt-decrypt-base64',
    router: 'encrypt-decrypt-base64',
    path: '/encrypt-decrypt-base64',
    component: Base64,
}, {
    name: 'encrypt-sha1',
    router: 'encrypt-sha1',
    path: '/encrypt-sha1',
    component: Sha1,
}, {
    name: 'encrypt-decrypt-url',
    router: 'encrypt-decrypt-url',
    path: '/encrypt-decrypt-url',
    component: Url,
}, {
    name: 'encrypt-super',
    router: 'encrypt-super',
    path: '/encrypt-super',
    component: Empty,
}, {
    name: 'other-help',
    router: 'other-help',
    path: '/other-help',
    component: Empty,
}, {
    name: 'other-bug',
    router: 'other-bug',
    path: '/other-bug',
    component: Empty,
}, {
    name: 'other-recommend',
    router: 'other-recommend',
    path: '/other-recommend',
    component: Empty,
}];
