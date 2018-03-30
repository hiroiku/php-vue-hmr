const autoprefixer = require('autoprefixer');
const notifier = require('node-notifier');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = require('./config');

function resolve($) {
    return path.join(__dirname, '..', $);
}

module.exports = {
    context: resolve('.'),
    devtool: 'cheap-module-eval-source-map',
    entry: [
        resolve('src/ts/index.ts')
    ],
    output: {
        path: resolve('public'),
        publicPath: 'http://localhost:8080/',
        filename: 'app.js'
    },
    resolve: {
        extensions: ['.ts', '.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src')
        }
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    css: 'vue-style-loader!css-loader!sass-loader',
                    scss: 'vue-style-loader!css-loader!sass-loader',
                    sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
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
        new webpack.HotModuleReplacementPlugin,
        new webpack.NamedModulesPlugin,
        new webpack.NoEmitOnErrorsPlugin,
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            inject: true
        }),
        new FriendlyErrorsPlugin({
            compilationSuccessInfo: {
                messages: [`Your application is running here: http://${config.host}:${config.port}`],
            },
            onErrors: () => (severity, errors) => {
                if (severity !== 'error') {
                    return;
                }
                const error = errors[0];
                const filename = error.file && error.file.split('!').pop();
                notifier.notify({
                    title: packageConfig.name,
                    message: severity + ': ' + error.name,
                    subtitle: filename || '',
                    icon: resolve('./assets/logo.png')
                })
            }
        })
    ],
    devServer: {
        clientLogLevel: 'warning',
        compress: true,
        contentBase: resolve('static'),
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        historyApiFallback: {
            rewrites: [{
                from: /.*/,
                to: path.posix.join('/', 'index.html')
            }],
        },
        host: config.host,
        hot: true,
        inline: true,
        open: false,
        overlay: {
            warnings: false,
            errors: true
        },
        port: config.port,
        publicPath: '/',
        quiet: true,
        stats: {
            colors: true
        },
        watchContentBase: true,
        watchOptions: {
            poll: false,
        }
    }
};
