const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const zopfli = require("@gfx/zopfli");

module.exports = {
	entry: path.join(__dirname, "src", "index.tsx"),
	output: {
		path: path.join(__dirname, "build"),
		filename: "bundle.js",
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /.(css|scss)$/,
				use: [MiniCssExtractPlugin.loader, "css-loader", {
					loader: 'style-loader',
					loader: 'resolve-url-loader',
					loader: "sass-loader",
					options: {
						sourceMap: true,
						sassOptions: {
							includePaths: ['node_modules'],
						},
						implementation: require("sass"),
					},
				}]
			},
			{
				test: /.(jpg|jpeg|png|gif|mp3|svg)$/,
				use: [
					// {
					// 	loader: "file-loader",
					// 	options: {
					// 		name: "[path][name]-[hash:8].[ext]"
					// 	}
					// },
					{
						loader: 'url-loader',
					}
				]
			},
			{
				use: [
					{
						loader: 'babel-loader',
						options: {
							plugins: ['lodash'],
							presets: [['env', { 'modules': false, 'targets': { 'node': 4 } }]]
						}
					}
				],
				test: /\.js$/,
				exclude: /node_modules/,
			}
		]
	},
	resolve:
	{
		extensions: ['.tsx', '.ts', '.js'],
	},
	devServer: {
		contentBase: __dirname + '/build'
	},
	plugins: [
		new LodashModuleReplacementPlugin({
			'collections': true,
			'paths': true
		}),
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: path.join(__dirname, "src", "index.html")
		}),
		new MiniCssExtractPlugin({
			filename: "[name].css",
			chunkFilename: "[id].css"
		}),
		new CopyPlugin({
			patterns:
				[
					{ from: '**/*', to: 'assets/', context: 'src/assets/' }
				],
			options: {
				concurrency: 100,
			},
		}),
		new CompressionPlugin({
			filename: "[path][base].gz",
			test: /\.js$|\.css$|\.html$/,
			threshold: 10240,
			compressionOptions: {
				level: 1, numiterations: 15, algorithm(input, compressionOptions, callback) {
					return zopfli.gzip(input, compressionOptions, callback);
				},
			},
			minRatio: 0.8,
		}),
	],
	optimization: {
		minimize: false,
		removeAvailableModules: true,
		removeEmptyChunks: true,
		runtimeChunk: 'single',
		mergeDuplicateChunks: true,
		moduleIds: 'natural',
		flagIncludedChunks: true,
		minimizer: [new TerserPlugin({
			terserOptions: {
				format: {
					comments: false,
				},
			},
			extractComments: false,
			// enable parallel running
			parallel: true,
		})],
		splitChunks: {
			chunks: 'async',
			minSize: 20000,
			minChunks: 1,
			maxAsyncRequests: 30,
			maxInitialRequests: 30,
			enforceSizeThreshold: 50000,
			cacheGroups: {
				vendor: {
					name(module, chunks, cacheGroupKey) {
						const moduleFileName = module
							.identifier()
							.split('/')
							.reduceRight((item) => item);
						const allChunksNames = chunks.map((item) => item.name).join('~');
						return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
					},
					test: /[\\/]node_modules[\\/]/,
					chunks: "all",
					reuseExistingChunk: true,
					priority: -10,
				}
			}
		}
	},
	performance: {
		hints: false,
		maxEntrypointSize: 400000,
		maxAssetSize: 100000
	}
};