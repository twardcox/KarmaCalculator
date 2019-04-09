module.exports = {
    mode: "development",
    entry: {
        home: __dirname + "/index.jsx",
        checkin: __dirname + "/check-in/index.jsx",
        login: __dirname + "/login/index.jsx",
    },
    output: {
        filename: "[id]-bundle.js",
        path: __dirname
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        extensions: [".js", ".jsx", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ["@babel/preset-env",
                            {
                                "targets": {
                                    "browsers": ["last 2 chrome versions"]
                                  }
                            }
                            ],
                            "@babel/preset-react",
                        ],
                        plugins: [
                            [
                                "@babel/plugin-transform-runtime",
                                {
                                  "corejs": false,
                                  "helpers": false,
                                  "regenerator": true,
                                  "useESModules": false
                                }
                              ]
                              ]
                    }
                }
            }
        ]
    }
};
