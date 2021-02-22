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



rules: [
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: "babel-loader",
          options: {
            "presets": [["es2015", {"modules": false}], "react"]
          }
        }
      ]
    }
  ]

  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) },
    }),
  ],


  externals: [
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
      },
    },
    {
      'react-router-dom': {
        root: 'ReactRouterDOM',
        commonjs2: 'react-router-dom',
        commonjs: 'react-router-dom',
        amd: 'react-router-dom',
      },
    },
  ],


  {
    "presets" : ["@babel/preset-env", "@babel/preset-react"],
    "plugins" : ["transform-class-properties", "@babel/plugin-proposal-object-rest-spread"]
  }
  