const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    mode: "development",
    devtool: "source-map",
    devServer: {
        port: 3000,
        contentBase: path.join(__dirname, "dist")
    },
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist")
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			},
			{
				test: /\.(png|svg|jpe?g|gif)$/,
				use: ["file-loader"]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }]
            },
            {
                test: /\.js$/,
                enforce: "pre",
                exclude: /node_modules/,
                use: ["source-map-loader"]
            },
            {
                test: /\.html$/,
                use: ["html-loader"]
            }
		]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: "src/index.html",
        })
    ]
};
