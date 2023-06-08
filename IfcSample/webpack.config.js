const path = require('path');
module.exports = {
    entry: {
        'bundle/main': './main.ts',
    }, 
    output: {
        path: __dirname,
        filename: '[name].bundle.js'
    },
    resolve: {
        extensions:['.ts','.js']
    },
    module: {
        rules: [
            {
                test:/\.ts$/,loader:'ts-loader'
            }
        ]
    }
}