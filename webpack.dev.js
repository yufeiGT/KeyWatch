const path = require('path');
const {
	merge,
} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	mode: 'development',
	resolve: {
		alias: {
			'@example': path.resolve(__dirname, 'example'),
		},
	},
	devtool: 'inline-source-map',
	entry: {
		app: './example/index.js',
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './example/index.html',
		}),
	],
	output: {
		filename: '[name].[hash:8].js',
		path: path.resolve(__dirname, 'dist'),
	},
	devServer: {
		host: '0.0.0.0',
	},
});