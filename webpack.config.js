const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'iBand.js'
    },
    module: {
		rules: [
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader', {
						loader: 'postcss-loader',
						options: {
							sourceMap: 'inline',
							plugins: function () {
								return [
									require('autoprefixer')({
										browsers: ['last 2 version']
									}),
								]
							}
						}
					}]
				})
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				}
			},
			{
				test: /\.html$/,
				loader: 'html-loader',
			}
		]
    },
	plugins: [
		new ExtractTextPlugin("iBand.css"),
		new HtmlWebpackPlugin({
			template: './src/index.html',
			inject: 'body'
		}),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.optimize.UglifyJsPlugin()
	]
};
