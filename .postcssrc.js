module.exports = {
  plugins: {
    // 配置使用 autoprefixer 插件
    // 作用: 生成浏览器 css 样式规则前缀
    // vue cli 内部已经配置了 autoprefixer 插件
    // 所以这里有诶值了一次, 所以产生了冲突, 所以要注释
    // 'autoprefixer': {
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },
    'postcss-pxtorem': {
      rootValue ({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      propList: ['*'],
      // 配置不要转换的样式资源 exclude(排除)
      exclude: 'github-markdown'
    }
  }
}
