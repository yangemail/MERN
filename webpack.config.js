const webpack = require('webpack');

module.exports = {
    // entry: {
    //     app: './src/App.jsx',
    //     vendor: ['react', 'react-dom', 'whatwg-fetch'],
    // },
    entry: {
        entry: './src/App.jsx',
    },
    output: {
        path: '/Users/yang.zhang/MERN/static',
        filename: "app.bundle.js"
    },
    // optimization: {
    //     splitChunks: {
    //         cacheGroups: {
    //             vendor: {
    //                 name: 'vendor',
    //                 filename: 'vendor.bundle.js'
    //             }
    //         }
    //     }
    // },
    // plugins: [
    //     new webpack.optimize.CommonsChunkPlugin({name:'vendor', filename:'vendor.bundle.js'})
    // ],
    module: {
        rules: [
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    }
}