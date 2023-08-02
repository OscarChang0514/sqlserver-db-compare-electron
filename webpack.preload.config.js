const path = require('path');

module.exports = {
    // 如果未來遇到build後的結果與dev不一樣，可以先把這裡換成development，或比較dev的config與prod的config有何不同
    mode: 'production',
    entry: ['./electron/preload.ts'],
    target: 'electron-preload',
    output: {
        filename: 'preload.js',
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
};