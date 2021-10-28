module.exports = {
  devServer: {
      open: true, //是否自动弹出浏览器页面，默认未开启
      proxy: {
          '/api': {
            target: 'http://lily.since88.cn', //API服务器的地址
            changeOrigin: true, // 是否跨域
            pathRewrite: {
            
            }
          },
      },
  }
}