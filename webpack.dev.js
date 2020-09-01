/* global require module */

const sourceDir = 'web';

const WebpackMerge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const commonConfig = require('./webpack.common.js');
const config = require('./web/config');

const copy = new CopyWebpackPlugin([
    {
        from: `${sourceDir}/manifest.json`,
        transform: (content, path) =>
            content.toString()
            .replace(/#manifest-origin#/g, '/')
    }
]);

const html = new HtmlWebpackPlugin({
    template: `${sourceDir}/index.ejs`,
    templateParameters: {
        titlePrefix: '[DEBUG] ',
        baseUrl: `${config.domain}/${config.staticPath}/`
    },
    filename: 'index.html',
    chunks: ['app']
});

module.exports = WebpackMerge(
    commonConfig,
    {
        devtool: 'inline-source-map',
        plugins: [
            copy,
            html
        ]
    }
);
