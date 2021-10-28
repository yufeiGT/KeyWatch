const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;

module.exports = {
	resolve: {
		alias: {
			'keywatch': path.resolve(__dirname, 'src'),
		},
	},
	plugins: [
		new CleanWebpackPlugin(),
	],
	module: {
		rules: [{
			test: /\.scss$/,
			use: ['style-loader', 'css-loader', 'sass-loader'],
		}, {
			test: /\.css$/,
			use: ['style-loader', 'css-loader'],
		}, {
			test: /\.(jpg|jepg|png|gif)$/,
			use: 'file-loader',
		}, {
			test: /\.m?js$/,
			exclude: /(node_modules|bower_components)/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env'],
					plugins: [
						'@babel/plugin-proposal-class-properties',
						'@babel/plugin-proposal-private-methods',
					],
				}
			}
		}],
	},
};