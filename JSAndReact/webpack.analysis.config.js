const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = smp.wrap({
	mode: 'production',
	optimization: {
		nodeEnv: 'production',
		minimizer: [
			new UglifyJsPlugin({
				cache: true,
				parallel: true,
			}),
			new OptimizeCSSAssetsPlugin({}),
		]
	},
	entry: [
		'./components/App.jsx',
		'./styles/main.scss'
	],
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							'cacheDirectory': true,
                        },
					}
				]
			},
			{
				test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192,
							fallback: 'file-loader',
							relativePathName: true,
							publicPath: '/dist/'
						}
					}
				]
			},
			{
				test: /\.(scss|sass|css|)$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"sass-loader"
				]
			}
		]
	},
	resolve: {
		extensions: ['*', '.js', '.jsx',  '.png', '.woff', '.woff2', ".json"],
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
		filename: '[name].bundle.js'
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new MiniCssExtractPlugin({
			filename: 'bundle.css'
		}),
		new DuplicatePackageCheckerPlugin(),
		new BundleAnalyzerPlugin(),
	]
});