module.exports={

    entry: ['babel-polyfill', './index.js'],

    module :{
        rules : [
            {
                test: /\.js|\.jsx$/,
                exclude : /node_modules/,
                use :{
                    loader: "babel-loader"
                }
            }
        ]
    }
}