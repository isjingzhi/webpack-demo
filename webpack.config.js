const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
/*
 配置文件中加入
  1."private": true, ==> 用来说明私人打包
  2."build":"webpack", ==> 执行命令 npm run build 来代替 npx webpack 来打包
  3."build-watch":"webpack --watch" 执行命令 npm run build-watch 自动打包
*/
module.exports = {
  // 开发过程中建议使用 development，打包速度快
  // 上线的时候使用 production 模式，打包速度慢，因为要做压缩等优化处理
  mode: "development",
  devtool: 'inline-source-map', // 加入源代码地图，调试信息可以看到我们的源代码信息
  entry: "./src/main.js", // 打包指定的入口
  output: { // 打包指定的出口
    filename: "bundle.js", // 打包结果的文件名
    path: path.join(__dirname, './dist/') // 打包结果文件存放的目录路径(注:必须是绝对路径):首先引入的是 nodejs 中的path模块,用path.join方法来动态获取绝对路径
  },
  // devServer 用来专门为 webpack-dev-server 配置的
  // contentBase 用来设置我们开发服务器的 www 目录
  devServer: {
    contentBase: './dist',
    hot: true // 开启热更新
  },
  plugins: [
    // HtmlWebpackPlugin 插件会将你指定的 template 给打包到结果目录中
    // 它还能帮你实现 html 压缩处理
    new CleanWebpackPlugin(['./dist']), // 打包之前清除dist目录
    new HtmlWebpackPlugin({
      title: 'Output Management',
      template: './index.html'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      // 1.打包 css 模块(开发模式 ==> 顺序不能错)
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ]
      },
      // 2.打包图片(开发模式)
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      // 3.打包字体资源
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      // 4.打包less资源
      {
        // 当加载到以 .less 结尾的资源的时候使用：
        //   less-loader 编译成 css
        //   css-loader 转换成 JavaScript 模块
        //   style-loader 创建 style 节点插入 head 节点中
        test: /\.less$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }, {
          // less-loader 依赖了 less
          loader: "less-loader"
        }]
      },
      // {
      //   // ES6 转 ES5 [babel-loader](https://webpack.js.org/loaders/babel-loader/)
      //   // yarn add --dev "babel-loader@^8.0.0-beta" @babel/core @babel/preset-env
      //   // 当加载以 .js 结尾的资源的时候，使用 babel-loader 对 ES6 => ES5 处理
      //   // exclude 表示排除第三方包转码
      //   // 不仅做了转码处理，还有代码优化
      //   test: /\.js$/,
      //   exclude: /(node_modules|bower_components)/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: ['@babel/preset-env']
      //     }
      //   }
      // },
    ]
  }
}