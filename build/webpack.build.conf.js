const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const webpack = require('webpack');

const buildWebpackConfig = merge(baseWebpackConfig, {

    mode: 'production',
    plugins: [
        new webpack.DefinePlugin({
            'IS_DEVELOPMENT': JSON.stringify( false ),
            'IS_PRODUCTION': JSON.stringify( true ),
        }),
    ] 
});

module.exports = new Promise( ( resolve, reject ) => {
    resolve( buildWebpackConfig )
});