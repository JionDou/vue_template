# vue_template

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### VUE优化
1.productionSourceMap设置false，加速生产环境构建
2.sourceMap设置false
3.element按需引入
4.忽略打包第三方依赖包(详细情况可以在vue.config.js里的chainWebpack查看),通过CDN方式加载。
5.路由懒加载