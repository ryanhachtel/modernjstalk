const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
	entry: [
		'./components/App.tsx',
		'./styles/main.scss'
	],
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.(scss|sass|css|)$/,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader'
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
							publicPath: 'http://localhost:8080/'
						}
					}
				]
			}
		]
	},
	resolve: {
		extensions: ['*', '.js', '.jsx', '.ts', '.tsx', '.png', '.woff', '.woff2'],
	},
	output: {
		path: path.resolve(__dirname, '/'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	devtool: 'eval-source-map',
	devServer: {
		port: 8080,
		publicPath: '/',
		hot: true,
		open: true,
		historyApiFallback: true
	},
	plugins: [
		new ForkTsCheckerWebpackPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new HtmlWebpackPlugin()
	],
};
