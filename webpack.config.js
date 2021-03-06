const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'iBand.js'
    },
    devServer: {
        contentBase: './dist'
    },
    module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'eslint-loader',
			},
			{
				test: /\.js$/,
                exclude: /node_modules(?!\/webpack-dev-server)/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				}
			},
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
				test: /\.html$/,
                exclude: path.resolve(__dirname, './src/index.html'),
                use: [
                    {
                        loader: 'ngtemplate-loader?relativeTo=' + (path.resolve(__dirname, './src/'))
                    },
                    {
                        loader: 'html-loader'
                    }
                ]
			},
            {
                test: /\.js$/,
                exclude: [
                    /node_modules/,
                    /\.test\.js$/
                ],
                use: {
                    loader: 'istanbul-instrumenter-loader',
                    options: { esModules: true }
                },
                enforce: 'post',
            }
		]
    },
	plugins: [
        new CleanWebpackPlugin(['dist']),
		new ExtractTextPlugin("iBand.css"),
		new HtmlWebpackPlugin({
			template: './src/index.html',
			inject: 'body'
		}),
		new webpack.NoEmitOnErrorsPlugin(),
	]
};
