const { defineConfig } = require("@vue/cli-service");
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");

module.exports = defineConfig({
  publicPath: "./",
  lintOnSave: false,
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
  //需要请求的域名为http://localhost:3000/api/home
  // devServer: {
  //   proxy: {
  //     '/': { //  /api表示拦截以/api开头的请求路径
  //       target: 'https://i.weread.qq.com', //跨域的域名
  //       changeOrigin: true,//是否开启跨域
  //     }
  //   }
  // }
});
