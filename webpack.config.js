//import webpack from 'webpack';
//import yargs from 'yargs';
/*
                options: {
                    presets: ["env", "react"],
                    plugins : ["proposal-class-properties",  "transform-object-rest-spread"]
                }
*/

//const { optimizeMinimize } = yargs.alias('p', 'optimize-minimize').argv;
//const nodeEnv = optimizeMinimize ? 'production' : 'development';

module.exports= {
  entry: ['babel-polyfill', './index.js'],

  module: {
    rules : [
        {
            test: /\.js|\.jsx$/,
            exclude : /node_modules/,
            use :{
                loader: "babel-loader",
            }
        }
    ]
  },

  

};