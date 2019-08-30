// package.json中通过 --ENV 指定当前执行的配置文件
const env = process.env.ENV.trim();
module.exports = require(`./build/webpack.${env}.js`);
