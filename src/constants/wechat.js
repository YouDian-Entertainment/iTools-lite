const baseApiList = [{
//     'url': 'https://api.weixin.qq.com/cgi-bin/token',
//     'method': 'get',
//     'value': 'token',
//     'text': '获取access_token接口 /token',
//     'args': [{
//         'name': 'grant_type',
//         'diabled': 'client_credential',
//         'required': true,
//         'tips': '获取access_token填写client_credential',
//         'method': 'get',
//         'type': 'string'
//     }, {
//         'name': 'appid',
//         'diabled': '',
//         'required': true,
//         'tips': '填写appid',
//         'method': 'get',
//         'type': 'string'
//     }, {
//         'name': 'secret',
//         'diabled': '',
//         'required': true,
//         'tips': '填写appsecret',
//         'method': 'get',
//         'type': 'string'
//     }]
// }, {
//     'name': 'http://file.api.weixin.qq.com/cgi-bin/media/upload',
//     'method': 'post',
//     'value': 'media_upload',
//     'text': '多媒体文件上传接口 /media/upload',
//     'args': [{
//         'name': 'access_token',
//         'diabled': '',
//         'required': true,
//         'tips': '调用接口凭证',
//         'method': 'get',
//         'type': 'string',
//         'sync': true
//     }, {
//         'name': 'type',
//         'diabled': 'image,voice,video,thumb',
//         'required': true,
//         'tips': '媒体文件类型，分别有图片（image）、语音（voice）、视频（video）和缩略图（thumb）',
//         'method': 'get',
//         'type': 'selector'
//     }, {
//         'name': 'media',
//         'diabled': '',
//         'required': true,
//         'tips': 'form-data中媒体文件标识，有filename、filelength、content-type等信息',
//         'method': 'post',
//         'type': 'file'
//     }]
// }, {
//     'name': 'http://file.api.weixin.qq.com/cgi-bin/media/get',
//     'method': 'get',
//     'value': 'media_get',
//     'text': '下载多媒体文件接口 /media/get',
//     'args': [{
//         'name': 'access_token',
//         'diabled': '',
//         'required': true,
//         'tips': '调用接口凭证',
//         'method': 'get',
//         'type': 'string',
//         'sync': true
//     }, {
//         'name': 'media_id',
//         'diabled': '',
//         'required': true,
//         'tips': '媒体文件id',
//         'method': 'get',
//         'type': 'string'
//     }]
// }, {
//     'name': 'http://api.weixin.qq.com/cgi-bin/media/uploadimg',
//     'method': 'post',
//     'value': 'media_uploadimg',
//     'text': '上传logo接口 /media/uploadimg',
//     'args': [{
//         'name': 'access_token',
//         'diabled': '',
//         'required': true,
//         'tips': '调用接口凭证',
//         'method': 'get',
//         'type': 'string',
//         'sync': true
//     }, {
//         'name': 'type',
//         'diabled': 'image',
//         'required': false,
//         'tips': '图片（image）',
//         'method': 'get',
//         'type': 'selector'
//     }, {
//         'name': 'buffer',
//         'diabled': '',
//         'required': true,
//         'tips': '大小限制1MB，推荐像素为300*300，支持JPG格式',
//         'method': 'post',
//         'type': 'file'
//     }]
}];

const wechatOpenInterfaceType = [
    {value: '0', text: '基础支持', apiList: baseApiList},
    {value: '1', text: '向用户发送消息'},
    {value: '2', text: '用户管理'},
    {value: '3', text: '自定义菜单'},
    {value: '4', text: '推广支持'},
    {value: '5', text: '消息接口调试'},
    {value: '6', text: '硬件接入api接口调试'},
    {value: '7', text: '硬件接入消息接口调试'},
    {value: '8', text: '卡劵接口'},
    {value: '9', text: '评论接口'},
];

export default wechatOpenInterfaceType;
