module.exports = {
    // entry: ['./src/App.jsx'],
    entry: {
        app: ['./src/App.jsx']
    },
    output: {
        // path: './static',
        path: __dirname + './static',
        filename: 'app.bundle.js'
    },
    plugins: [],
    module: {
        rules: [
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            },
        ]
    },
    devtool: 'source-map',
    mode: "development",
    devServer: {
        port: 8000,
        contentBase: 'static',
        proxy: {
            '/api/*': {
                target: 'http://localhost:3000'
            }
        }
    }
};