'use strict';

const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const path = require('path');

const outputPath = path.join(__dirname, './dist');

const isProd = (process.env.NODE_ENV !== 'development');

module.exports = {
	entry: {
		app: './src/main.ts',
		vendor: [
			's-js',
			's-array',
			'surplus',
			'classnames',
			'surplus-mixin-data',
			'surplus-mixin-onkey',
			'surplus-mixin-focus'
		]
	},
	// devtool: 'inline-source-map',
	// devtool: isProd ? 'source-map' : 'eval',
	devtool: 'source-map',
	// devtool: isProd ? 'source-map' : false,
	// devtool: 'source-map',
	// devtool: false,
	output: {
		path: outputPath,
		filename: '[name].js'
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js']
	},
	module: {
		rules: [
			{ test: /\.tsx?$/, loader: 'surplus-loader!ts-loader' },
		]
	},
	plugins: isProd ? [
		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor",
			filename: "vendor.bundle.js",
			// children: true,
			asunc: true
		}),
		new UglifyJsPlugin({
			sourceMap: true,
			uglifyOptions: {
				ie8: false,
				ecma: 6,
				warnings: false,
				mangle: false,
				// mangle: false, // debug false
				compress: {
					passes: 3,
					unsafe: true,
					unsafe_comps: true,
					dead_code: true,
					unsafe_Func: true,
					unsafe_math: true,
					unsafe_methods: true,
					unsafe_proto: true,
					unsafe_regexp: true,
					comparisons: true,
					// evaluate: true,
					unsafe_arrows: true,
					pure_getters: true,
					//
					keep_fargs: false,
					// pure_funcs: ['Math.floor'],
					// // pure_funcs: ['_user$project$Components_IncDec$Model'],
					//
					// // confilted with pass > 1
					hoist_funs: true,
					// hoist_vars: true,
					//
					// // For production?
					drop_console: true,
					drop_debugger: true,
					// pure_funcs: ['console.log'],

				},

				output: {
					comments: false,
					beautify: true,  // debug true
				}
			}
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new HtmlWebpackPlugin({
			template: './index.html',
			inject: 'body',
			filename: 'index.html'
		}),
		// new CompressionPlugin({
    //   asset: "[path].gz[query]",
    //   algorithm: "gzip",
    //   test: /\.js$|\.html$/,
    //   threshold: 10240,
    //   minRatio: 0.8
    // })
	] : [
		new HtmlWebpackPlugin({
			template: './index.html',
			inject: 'body',
			filename: 'index.html'
		}),
	]
};
