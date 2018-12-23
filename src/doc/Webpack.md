## 1. 准备=======>https://webpack.js.org

```shell
mkdir webpack-demo && cd webpack-demo
npm init -y
npm install webpack webpack-cli --save-dev
```

## 项目结构

```
  demo0
  |- package.json
+ |- /src
+   |- index.js
+ |- /dist
+   |- index.html
```
## 打包构建

```shell
# 1. 找到 src/index.js 入口文件
# 2. 分析代码中的依赖（说白了就是 require）
# 3. 打包构建，将结果打包到 dist/main.js
npx webpack
```

执行完以上命令你会发现在项目的 `dist` 目录下产出了一个文件 `main.js`。

### 打开 `dist/index.html` 访问测试

---

## 2. 配置文件 `webpack.config.js`

```javascript
 webpack.config.js 是 webpack 打包构建的配置文件
 我们使用它的第一步就是导出一个对象
 1. 配置文件是给 webpack 打包用的
    如果有，就以配置文件的配置为准
    如果没有，则都走默认
 2. 该文件就是用来被 Node 执行的
     因为 webpack 打包构建需要操作文件，webpack 也是基于 Node 开发的
 3. webpack 打包的时候会自动加载当前模块，读取其中导出的对象，拿到对象中配置项去进行自定义打包构建
 4. 导出的配置对象中只能按照 webpack 给定的属性来配置，不能乱写
 5. webpack 打包的时候会自动来读取 webpack.config.js
    如果想要修改这个文件名，
    则需要在执行打包命令的时候加上 --config 配置文件名
   例如：npx webpack --config webpack.config.js
 6. 但是如果每一次加上这一堆的选项很难记住
    所以我们推荐把打包的命令配置到 package.json 文件的 scripts 选项中把该命令起个别名存起来
 7. 接下来我们就可以开心的 npm run build   
 8. 提示，当你把 npx webpack --config webpack.config.js 配置到 scripts 选项中之后，就不需要使用 npx
    也就是说我们可以："build": "webpack --config webpack.config.js"
    由于 webpack.config.js 就是默认文件名吗，所以我们可以：
    "build": "webpack"
    虽然简单，我们也这么做，因为接下来一步一步的扩展了
const path = require('path')

module.exports = {
  entry: './src/main.js', // 指定打包的入口
  output: { // 指定打包的出口
    path: path.join(__dirname, './dist/'), // 指定打包的结果文件存放的目录路径（注意：必须是绝对路径！）
    filename: 'bundle.js' // 指定打包的结果文件名
  }
}

```

## npm scripts

```json
{
  "name": "demo0",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "jquery": "^3.3.1"
  },
  "devDependencies": {
    "webpack": "^4.5.0",
    "webpack-cli": "^2.0.14"
  }
}

```
---

# 3. 打包 css 资源

## 装包

```shell
npm install --save-dev style-loader css-loader
```

## 修改配置文件

```json
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
+   module: {
+     rules: [
+       {
+         test: /\.css$/,
+         use: [
+           'style-loader',
+           'css-loader'
+         ]
+       }
+     ]
+   }
  };
```

## 在 js 中加载 css

```javascript
import './css/main.css'
```
---

##4. 打包图片资源

> 参考文档：https://webpack.js.org/guides/asset-management/#loading-images

---

##5. 使用 `html-webpack-plugin` 处理 index.html

> 参考文档：https://webpack.js.org/guides/output-management/#setting-up-htmlwebpackplugin

    注意:安装后需要更改index.html文件到dist目录下,并修改index.html文件中引入的JS
    1. 如果我们的打包的结果文件名或是路径变了？你的 index.html 引用的路径等都得修改
    2. 我们期望把 index.html 打包到 dist 目录中
       也就是说我们将来开发完毕，直接发布 dist 就可以了
    3. 打包之后，index.html 在根目录，图片路径也有问题了
       解决办法，就是把 index.html 放到 dist 目录   

---

##6.  使用 `clean-webpack-plugin` 清除 `dist` 目录

> 参考文档：https://webpack.js.org/guides/output-management/#cleaning-up-the-dist-folder

---

##7. 打包字体资源(font-awesome字体图标库)

> 参考文档：https://webpack.js.org/guides/asset-management/#loading-fonts

```html
// 1.bootstrap 4.0 移除了内置字体图标
// import 'bootstrap/dist/css/bootstrap.css'
// 安装 bootstrap 3.3.7 中内置了字体图标 
注:第三包会自动去node_moudels中寻找
import 'bootstrap/dist/css/bootstrap.css'
// 2.安装字体图标库
npm install font-awesome --save
```
---

##8. 打包 less 资源

> 参考文档：https://webpack.js.org/loaders/less-loader/
```
  {
    // 当加载到以 .less 结尾的资源的时候使用：
    //   less-loader 编译成 css
    //   css-loader 转换成 JavaScript 模块
    //   style-loader 创建 style 节点插入 head 节点中
    test: /\.less$/,
    use: [{
        loader: "style-loader" // creates style nodes from JS strings
    }, {
        loader: "css-loader" // translates CSS into CommonJS
    }, {
        // less-loader 依赖了 less(所以在安装的时候杨同时安装 less 和 less-loader)
        loader: "less-loader" // compiles Less to CSS
    }]
    }
```
---

##9. 使用 `url-loader` 优化图片打包

> 参考文档：https://webpack.js.org/loaders/url-loader/
 注意:原文档中图片格式少SVG格式,需要自行添加
```
{
// 当匹配到以这些后缀名结尾的资源的时候，使用 url-loader 来处理
// url-loader 会把小于 8192 字节大小的文件直接 base64 转码内置，大于它的则以独立文件来提供
test: /\.(png|jpg|gif|svg)$/,
use: [{
    loader: 'url-loader',
    options: {
    limit: 8192
    }
}]
},
```

---

##10. 使用 `babel-loader` 转码 ES6 -> ES5

> 参考文档：https://webpack.js.org/loaders/babel-loader/

>官方网站==>在线编译:http://babeljs.io/
```
注:应当安装最新版本
// yarn add --dev "babel-loader@^8.0.0-beta" @babel/core @babel/preset-env
// 当加载以 .js 结尾的资源的时候，使用 babel-loader 对 ES6 => ES5 处理
// exclude 表示排除第三方包转码
// 不仅做了转码处理，还有代码优化
```
---

##11. 切换 `mode` 打包模式 ===> `development`

> 参考文档：https://webpack.js.org/concepts/mode/
```
// 开发过程中建议使用 development，打包速度快
// 上线的时候使用 production 模式，打包速度慢，因为要做压缩等优化处理
//只需要添加下面这一句代码即可(去除警告)
   mode: 'development', // production(默认的)|development
```
---

##12. 加入 source maps

> 参考文档：https://webpack.js.org/guides/development/#using-source-maps

```
// 加入源代码地图，调试信息可以看到我们的源代码信息
//只需添加这条代码即可
devtool: 'inline-source-map',
```

---

##13. 使用监视模式

> 参考文档：https://webpack.js.org/guides/development/#using-watch-mode
```
方法:只需要在package.json的 "scripts"中加入代码==> "build-watch": "webpack --watch"
顾名思义:当保存之后,自动为你打包webpack,命令执行代码 yarn run build-watch
```
---

##14. 加入 `webpack-dev-server` 服务器

> 参考文档：https://webpack.js.org/guides/development/#using-webpack-dev-server
```
第一步:装包并修改配置文件
第二部:添加package.json中"scripts"的代码:"dev": "webpack-dev-server --open"
执行命令:yarn run dev
第三:打包加入进度条(直接在其后面加上)--progress(ps:没什么卵用)
// devServer 用来专门为 webpack-dev-server 配置的
// contentBase 用来设置我们开发服务器的 www 目录
```
---

##15. 加入热更新功能

> 参考文档：https://webpack.js.org/guides/hot-module-replacement/
```
1.首先加载webpack==>const webpack = require('webpack')
2.devServer: {
    contentBase: './dist',
    hot: true // 开启热更新
  }
3.plugins中添加代码
new webpack.NamedModulesPlugin(),
new webpack.HotModuleReplacementPlugin()   
```
