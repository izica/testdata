const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry:   [
        './src/js/app.js',
        './src/scss/app.scss'
    ],
    output:  {
        filename: './assets/js/bundle.js'
    },
    resolve: {
        extensions: [".jsx", ".js", ".json", "*"],
    },
    module:  {
        rules: [
            {
                exclude: /node_modules/,
                test:    /\.js|jsx$/,
                loader:  'babel-loader',
                query:   {
                    presets: [
                        ["es2015", {"modules": false}],
                        'stage-1'
                    ],
                    plugins: [
                        'transform-decorators-legacy',
                        'transform-class-properties',
                    ]
                }
            }, {
                test: /\.scss|sass$/,
                use:  ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use:      [
                        'css-raw-loader',
                        'postcss-loader',
                        'sass-loader'
                    ]
                })
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            comments: false,
            mangle:   {
                except: ['$super', '$', 'exports', 'require']
            }
        }),
        new webpack.LoaderOptionsPlugin({
            test:     /\.scss|sass$/,
            minimize: true,
            comments: false,
            options:  {
                postcss: [require('precss'), require('autoprefixer')]
            }
        }),

        new ExtractTextPlugin({
            filename:  './assets/css/styles.css',
            allChunks: true
        })
    ],

};
