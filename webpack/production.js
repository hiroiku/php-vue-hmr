const autoprefixer = require('autoprefixer');
const path = require('path');
const rimraf = require('rimraf')
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve($) {
    return path.join(__dirname, '..', $);
}

rimraf(resolve('public'), error => {});

module.exports = {
    context: resolve('.'),
    devtool: 'cheap-module-eval-source-map',
    entry: {
        app: resolve('src/ts/index.ts')
    },
    output: {
        path: resolve('public'),
        publicPath: '/',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.ts', '.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src')
        }
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'initial',
                    enforce: true
                }
            }
        }
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    css: ExtractTextPlugin.extract({
                        fallback: 'vue-style-loader',
                        use: [{
                            loader: 'css-loader',
                            options: {
                                minimize: true
                            }
                        }, {
                            loader: 'sass-loader',
                        }]
                    }),
                    scss: ExtractTextPlugin.extract({
                        fallback: 'vue-style-loader',
                        use: [{
                            loader: 'css-loader',
                            options: {
                                minimize: true
                            }
                        }, {
                            loader: 'sass-loader',
                        }]
                    }),
                    sass: ExtractTextPlugin.extract({
                        fallback: 'vue-style-loader',
                        use: [{
                            loader: 'css-loader',
                            options: {
                                minimize: true
                            }
                        }, {
                            loader: 'sass-loader',
                        }]
                    })
                },
                postcss: [autoprefixer]
            }
        }, {
            test: /\.ts$/,
            use: [{
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                }
            }]
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'file-loader',
            options: {
                name: 'img/[name].[ext]'
            }
        }, {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            loader: 'file-loader',
            options: {
                name: 'media/[name].[ext]'
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'file-loader',
            options: {
                name: 'fonts/[name].[ext]'
            }
        }]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'css/style.css',
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            inject: true,
            chunksSortMode: 'dependency',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        })
    ]
};
