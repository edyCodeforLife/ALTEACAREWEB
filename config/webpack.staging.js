const { merge } = require('webpack-merge');
const webpack = require('webpack');
const common = require('../webpack.config.js');
const BrotliPlugin = require('brotli-webpack-plugin');

module.exports = merge(common, {
	mode: 'production',
	devtool: 'eval-cheap-module-source-map',
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
			'process.env.ENDPOINT': JSON.stringify('staging')
		}),
		new BrotliPlugin({
			asset: '[path].br[query]',
			test: /\.(js|css|html|svg)$/,
			threshold: 10240,
			minRatio: 0.8
		}),
	],
});
