const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './src/js/app.js',
        './src/scss/app.scss',
    ],
    output: {
        filename: './assets/js/bundle.js'
    },
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.js|jsx$/,
                loader: 'babel-loader',
                query: {
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
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-raw-loader',
                    'postcss-loader',
                    'sass-loader',
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.LoaderOptionsPlugin({
            test: /\.scss|sass$/,
            options: {
                postcss: [
                    require('precss'),
                    require('autoprefixer')
                ],
                context: './',
            }
        })
    ],
    resolve: {
        extensions: [".jsx", ".js", ".json", "*"],
    },
    devtool: "inline-source-map",
    devServer: {
        hot: true,
        historyApiFallback: true,
        inline: true,
    }
};
