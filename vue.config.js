// vue.config.js
module.exports = {
	// 选项...
	publicPath: './',
	outputDir: 'dist',
	lintOnSave: 'error',
	productionSourceMap: false,
	chainWebpack: config => {
		config.externals({
			vue: "Vue",
			'vue-router': 'VueRouter',
			'vuex': 'Vuex',
			axios: 'axios'
		})
	},
	css: {
		// 是否使用css分离插件 ExtractTextPlugin
		extract: true,
		// 开启 CSS source maps?
		sourceMap: false,
		// css预设器配置项
		loaderOptions: {
			less: {
				// http://lesscss.org/usage/#less-options-strict-units `Global Variables`
				// `primary` is global variables fields name
				globalVars: {
					primary: '#fff'
				}
			}
		},
		// 启用 CSS modules for all css / pre-processor files.
		requireModuleExtension: true,
	},
	devServer: {
		proxy: {
			'/api': {
				target: 'http://www.imaijia.com',
				changeOrigin: true
			}
		}
	}
}