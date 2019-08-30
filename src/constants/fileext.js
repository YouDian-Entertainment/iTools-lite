// 文件扩展卡枚举

// 所有文件
export const ALL_EXT_FILTER = {
    name: 'All Files',
    extensions: ['*'],
};
// 图片文件
export const IMAGE_EXT_FILTER = {
    name: 'Images',
    extensions: ['jpg', 'png', 'gif'],
};
// 视频文件
export const MOBVIE_EXT_FILTER = {
    name: 'Movies',
    extensions: ['mkv', 'avi', 'mp4'],
};
// Word 文件
export const WORD_EXT_FILTER = {
    name: 'Word',
    extensions: ['doc', 'docx', 'docm', 'dotx', 'dotm'],
};
// Excel 文件
export const EXCEL_EXT_FILTER = {
    name: 'Excel',
    extensions: ['xls', 'xlsx', 'xlsm', 'xltx', 'xltm', 'xlsb', 'xlam'],
};
// PPT 文件
export const PPT_EXT_FILTER = {
    name: 'PowerPoint',
    extensions: ['ppt', 'pptx', 'pptm', 'ppsx', 'ppsx', 'potx', 'potm', 'ppam'],
};
// Office 文件
export const OFFICE_EXT_FILTER = {
    name: 'Office',
    extensions: WORD_EXT_FILTER.extensions.concat(EXCEL_EXT_FILTER.extensions, PPT_EXT_FILTER.extensions),
};
// 用户自定义文件后缀
export const CUSTOME_EXT_FILTER = {
    name: 'Custom File Type',
    extensions: ['as'],
};

export const fileExtIcon = {
    image: 'ios-image-outline',
    file: 'ios-document-outline',
    md: 'logo-markdown',
    apk: 'logo-android',
};
