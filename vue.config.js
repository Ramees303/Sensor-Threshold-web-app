// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5001/trigger_simulation',  // Your backend URL
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''  // Removes /api from the request
        }
      }
    }
  }
});

