module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
  ? '/vue-suthub-desafiofrontend/'
  : '/',
  chainWebpack: config => {
      config
          .plugin('html')
          .tap(args => {
              args[0].title = "Vue - Suthub";
              return args;
          })
  }
}