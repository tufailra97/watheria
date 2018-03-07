const path = require('path');

module.exports = {
    entry : './src/main.js',
    output: {
        path : path.resolve(__dirname,'./public/js'),
        filename : 'bundle.js'
    },
    module: {
        rules :[
            {
                test: /\.js$/,
                exclude : /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    devServer : {
        port : 3000,
        contentBase : './public',
        inline : true
    },
}