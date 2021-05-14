let proxyObj = {}
proxyObj['/ws'] = {
  ws: true,
  target: 'ws://localhost:8088'
};
proxyObj['/api'] = {
//websocket
  ws: false,
//目标地址
  target: 'http://localhost:8088/',
//发送请求头中host会设置成target
  changeOrigin: true,
//不重写请求地址
  pathRewrite: {
    '^/api': '/'
  }

};

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'views': '@/views',
        'network': '@/network',
        'common': '@/common',
        'store': '@/store',
        'utils': '@/utils',
        'router': '@/router',
      }
    }
  },

  devServer: {
    host: 'localhost',
    port: 9001,
    proxy: proxyObj
  },

  transpileDependencies: [
    'vuetify'
  ]
};
