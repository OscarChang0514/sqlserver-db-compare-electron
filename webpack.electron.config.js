const path = require('path');
const { IgnorePlugin } = require('webpack');
const CopyPlugin = require("copy-webpack-plugin");

const optionalPlugins = [];
if (process.platform !== "darwin") { // don't ignore on OSX
    optionalPlugins.push(new IgnorePlugin({ resourceRegExp: /^fsevents$/ }));
}

module.exports = {
    // 如果未來遇到build後的結果與dev不一樣，可以先把這裡換成development，或比較dev的config與prod的config有何不同
    mode: 'production',
    entry: ['./electron/main.ts'],
    target: 'electron-main',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, './build/electron'),
    },
    module: {
        rules: [
            //loader編譯主程式碼
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: { presets: ['@babel/preset-env', '@babel/preset-typescript'] }
                }
            },
            //loader載入檔案
            {
                type: 'asset/resource',
                test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
                exclude: /node_modules/,
                generator: {
                    filename: 'assets/[name][ext]'
                }
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.ts'],
    },
    // 提高允許的bundle上限(原244kb)
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    plugins: [
        ...optionalPlugins,
        // 把public的內容複製到build中(除了index.html)
        new CopyPlugin({
            patterns: [{
                from: path.join(__dirname, './electron/assets'),
                to: path.join(__dirname, './build/electron/assets'),
            }],
        }),
    ]
};