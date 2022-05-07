const { merge } = require('webpack-merge');
const webpack = require('webpack');
const common = require('../webpack.config.js');

module.exports = merge(common, {
	mode: 'development',
	watch: true,
	devtool: 'eval-cheap-module-source-map',
	optimization: {
		usedExports: true,
	},
	// module: {
	// 	rules: [
	// 		{
	// 			test: /\.(js|tsx)$/,
	// 			loader: 'string-replace-loader',
	// 			options: {
	// 				multiple: [
	// 					{
	// 						search: 'https://services.alteacare.com/',
	// 						replace: 'https://staging-services.alteacare.com/'
	// 					},
	// 				]
	// 			}
	// 		}
	// 	]
	// },
	plugins: [
		new webpack.DefinePlugin({
			'process.env.ENDPOINT': JSON.stringify('development')
		}),
	],
});
